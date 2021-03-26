// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as t from 'runtypes';
import fs from 'fs';
import path from 'path';
import { Configuration } from './configuration';

import { DialogsBotComponent, MemoryScope, PathResolver } from 'botbuilder-dialogs';
import { AdaptiveBotComponent, LanguageGenerationBotComponent } from 'botbuilder-dialogs-adaptive';
import { ApplicationInsightsTelemetryClient, TelemetryInitializerMiddleware } from 'botbuilder-applicationinsights';
import { BlobsStorage, BlobsTranscriptStore } from 'botbuilder-azure-blobs';
import { ConfigurationResourceExporer } from './configurationResourceExplorer';
import { CoreBot } from './coreBot';
import { CoreBotAdapter } from './coreBotAdapter';
import { CosmosDbPartitionedStorage } from 'botbuilder-azure';
import { ComponentDeclarativeTypes, ResourceExplorer } from 'botbuilder-dialogs-declarative';
import { LuisBotComponent, QnAMakerBotComponent } from 'botbuilder-ai';
import { ServiceCollection } from 'botbuilder-runtime-core';

import {
    AuthenticationConfiguration,
    ICredentialProvider,
    SimpleCredentialProvider,
    allowedCallersClaimsValidator,
} from 'botframework-connector';

import {
    ActivityHandlerBase,
    BotAdapter,
    BotComponent,
    isBotComponent,
    BotFrameworkAdapter,
    BotTelemetryClient,
    ChannelServiceHandler,
    ConsoleTranscriptLogger,
    ConversationState,
    InspectionMiddleware,
    InspectionState,
    MemoryStorage,
    Middleware,
    MiddlewareSet,
    NullTelemetryClient,
    SetSpeakMiddleware,
    ShowTypingMiddleware,
    SkillConversationIdFactory,
    SkillConversationIdFactoryBase,
    SkillHandler,
    SkillHttpClient,
    Storage,
    TelemetryLoggerMiddleware,
    TranscriptLoggerMiddleware,
    UserState,
} from 'botbuilder';

function addFeatures(services: ServiceCollection, configuration: Configuration): void {
    services.composeFactory<
        MiddlewareSet,
        { conversationState: ConversationState; storage: Storage; userState: UserState }
    >(
        'middlewares',
        ['storage', 'conversationState', 'userState'],
        ({ conversationState, storage, userState }, middlewareSet) => {
            if (configuration.bool(['showTyping'])) {
                middlewareSet.use(new ShowTypingMiddleware());
            }

            const setSpeak = configuration.type(
                ['setSpeak'],
                t.Record({
                    voiceFontName: t.String.Or(t.Undefined),
                    lang: t.String,
                    fallbackToTextForSpeechIfEmpty: t.Boolean,
                })
            );

            if (setSpeak) {
                middlewareSet.use(
                    new SetSpeakMiddleware(
                        setSpeak.voiceFontName ?? null,
                        setSpeak.lang,
                        setSpeak.fallbackToTextForSpeechIfEmpty
                    )
                );
            }

            if (configuration.bool(['traceTranscript'])) {
                const blobsTranscript = configuration.type(
                    ['blobTranscript'],
                    t.Record({
                        connectionString: t.String,
                        containerName: t.String,
                    })
                );

                middlewareSet.use(
                    new TranscriptLoggerMiddleware(
                        blobsTranscript
                            ? new BlobsTranscriptStore(blobsTranscript.connectionString, blobsTranscript.containerName)
                            : new ConsoleTranscriptLogger()
                    )
                );
            }

            if (configuration.bool(['useInspection'])) {
                const inspectionState = new InspectionState(storage);
                middlewareSet.use(new InspectionMiddleware(inspectionState, userState, conversationState));
            }

            return middlewareSet;
        }
    );
}

function addTelemetry(services: ServiceCollection, configuration: Configuration): void {
    services.addFactory('botTelemetryClient', () => {
        const instrumentationKey = configuration.string(['instrumentationKey']);

        return instrumentationKey
            ? new ApplicationInsightsTelemetryClient(instrumentationKey)
            : new NullTelemetryClient();
    });

    services.addFactory(
        'telemetryMiddleware',
        ['botTelemetryClient'],
        ({ botTelemetryClient }) =>
            new TelemetryInitializerMiddleware(
                new TelemetryLoggerMiddleware(botTelemetryClient, configuration.bool(['logPersonalInformation'])),
                configuration.bool(['logActivities'])
            )
    );
}

function addStorage(services: ServiceCollection, configuration: Configuration): void {
    services.addFactory('conversationState', ['storage'], ({ storage }) => new ConversationState(storage));
    services.addFactory('userState', ['storage'], ({ storage }) => new UserState(storage));

    services.addFactory('storage', () => {
        const storage = configuration.string(['runtimeSettings', 'storage']);

        switch (storage) {
            case 'BlobsStorage': {
                const blobsStorage = configuration.type(
                    ['BlobsStorage'],
                    t.Record({
                        connectionString: t.String,
                        containerName: t.String,
                    })
                );

                if (!blobsStorage) {
                    throw new TypeError('`BlobsStorage` missing in configuration');
                }

                return new BlobsStorage(blobsStorage.connectionString, blobsStorage.containerName);
            }

            case 'CosmosDbPartitionedStorage': {
                const cosmosOptions = configuration.type(
                    ['CosmosDbPartitionedStorage'],
                    t.Record({
                        authKey: t.String.Or(t.Undefined),
                        compatibilityMode: t.Boolean.Or(t.Undefined),
                        containerId: t.String,
                        containerThroughput: t.Number.Or(t.Undefined),
                        cosmosDbEndpoint: t.String.Or(t.Undefined),
                        databaseId: t.String,
                        keySuffix: t.String.Or(t.Undefined),
                    })
                );

                if (!cosmosOptions) {
                    throw new TypeError('`CosmosDbPartitionedStorage` missing in configuration');
                }

                return new CosmosDbPartitionedStorage(cosmosOptions);
            }

            default:
                return new MemoryStorage();
        }
    });
}

function addSkills(services: ServiceCollection, configuration: Configuration): void {
    services.addInstance('credentialProvider', new SimpleCredentialProvider('appId', 'appPassword'));

    services.addFactory(
        'skillConversationIdFactory',
        ['storage'],
        ({ storage }) => new SkillConversationIdFactory(storage)
    );

    services.addFactory(
        'skillClient',
        ['credentialProvider', 'skillConversationIdFactory'],
        ({ credentialProvider, skillConversationIdFactory }) =>
            new SkillHttpClient(credentialProvider, skillConversationIdFactory)
    );

    services.addFactory('authenticationConfiguration', () => {
        const allowedCallers = configuration.type(['allowedCallers'], t.Array(t.String)) ?? [];

        return new AuthenticationConfiguration(
            undefined,
            allowedCallers.length ? allowedCallersClaimsValidator(allowedCallers) : undefined
        );
    });

    services.addFactory<
        ChannelServiceHandler,
        {
            adapter: BotAdapter;
            authenticationConfiguration: AuthenticationConfiguration;
            bot: ActivityHandlerBase;
            credentialProvider: ICredentialProvider;
            skillConversationIdFactory: SkillConversationIdFactoryBase;
        }
    >(
        'channelServiceHandler',
        ['adapter', 'bot', 'skillConversationIdFactory', 'credentialProvider', 'authenticationConfiguration'],
        (dependencies) =>
            new SkillHandler(
                dependencies.adapter,
                dependencies.bot,
                dependencies.skillConversationIdFactory,
                dependencies.credentialProvider,
                dependencies.authenticationConfiguration
            )
    );
}

function addCoreBot(services: ServiceCollection, configuration: Configuration): void {
    services.addFactory<
        ActivityHandlerBase,
        {
            botTelemetryClient: BotTelemetryClient;
            conversationState: ConversationState;
            memoryScopes: MemoryScope[];
            pathResolvers: PathResolver[];
            resourceExplorer: ResourceExplorer;
            skillClient: SkillHttpClient;
            skillConversationIdFactory: SkillConversationIdFactoryBase;
            userState: UserState;
        }
    >(
        'bot',
        [
            'botTelemetryClient',
            'conversationState',
            'memoryScopes',
            'pathResolvers',
            'resourceExplorer',
            'skillClient',
            'skillConversationIdFactory',
            'userState',
        ],
        (dependencies) =>
            new CoreBot(
                dependencies.resourceExplorer,
                dependencies.userState,
                dependencies.conversationState,
                dependencies.skillClient,
                dependencies.skillConversationIdFactory,
                dependencies.botTelemetryClient,
                configuration.string(['defaultLocale']) ?? 'en-US',
                configuration.string(['defaultRootDialog']) ?? 'main.dialog',
                dependencies.memoryScopes,
                dependencies.pathResolvers
            )
    );

    services.addFactory<
        BotFrameworkAdapter,
        {
            authenticationConfiguration: AuthenticationConfiguration;
            conversationState: ConversationState;
            userState: UserState;
            middlewares: MiddlewareSet;
            telemetryMiddleware: Middleware;
        }
    >(
        'adapter',
        ['authenticationConfiguration', 'conversationState', 'userState', 'middlewares', 'telemetryMiddleware'],
        (dependencies) => {
            const adapter = new CoreBotAdapter(
                dependencies.authenticationConfiguration,
                dependencies.conversationState,
                dependencies.userState
            );

            adapter.use(dependencies.middlewares);
            adapter.use(dependencies.telemetryMiddleware);

            return adapter;
        }
    );
}

async function addSettingsBotComponents(services: ServiceCollection, configuration: Configuration): Promise<void> {
    const loadBotComponent = async (name: string): Promise<BotComponent | undefined> => {
        try {
            const DefaultExport = (await import(name))?.default;
            if (DefaultExport) {
                const instance = new DefaultExport();
                if (isBotComponent(instance)) {
                    return instance;
                }
            }
        } catch (_err) {
            // no-op
        }

        return undefined;
    };

    const components =
        configuration.type(
            ['runtimeSettings', 'components'],
            t.Array(
                t.Record({
                    name: t.String,
                    settingsPrefix: t.String.Or(t.Undefined),
                })
            )
        ) ?? [];

    for (const { name, settingsPrefix } of components) {
        const botComponent = await loadBotComponent(name);
        if (!botComponent) {
            throw new TypeError(`Unable to load ${botComponent} component`);
        }

        botComponent.configureServices(services, configuration.bind([settingsPrefix ?? name]));
    }
}

async function normalizeConfiguration(configuration: Configuration, applicationRoot: string): Promise<void> {
    // Override applicationRoot setting
    configuration.set(['applicationRoot'], applicationRoot);

    // Override root dialog setting
    configuration.set(
        ['defaultRootDialog'],
        await new Promise<string | undefined>((resolve, reject) =>
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.readdir(applicationRoot, (err, files) =>
                err ? reject(err) : resolve(files.find((file) => file.endsWith('.dialog')))
            )
        )
    );
}

function registerAdaptiveComponents(services: ServiceCollection, configuration: Configuration): void {
    new AdaptiveBotComponent().configureServices(services, configuration);
    new LanguageGenerationBotComponent().configureServices(services, configuration);
}

function registerDialogsComponents(services: ServiceCollection, configuration: Configuration): void {
    new DialogsBotComponent().configureServices(services, configuration);
}

function registerLuisComponents(services: ServiceCollection, configuration: Configuration): void {
    new LuisBotComponent().configureServices(services, configuration);
}

function registerQnAComponents(services: ServiceCollection, configuration: Configuration): void {
    new QnAMakerBotComponent().configureServices(services, configuration);
}

/**
 * Construct all runtime services.
 *
 * @param applicationRoot absolute path to root of application
 * @param configuration a fully initialized configuration instance to use
 * @returns service collection and configuration
 */
export async function getRuntimeServices(
    applicationRoot: string,
    configuration: Configuration
): Promise<[ServiceCollection, Configuration]>;

/**
 * Construct all runtime services.
 *
 * @param applicationRoot absolute path to root of application
 * @param settingsDirectory directory where settings files are located
 * @returns service collection and configuration
 */
export async function getRuntimeServices(
    applicationRoot: string,
    settingsDirectory: string
): Promise<[ServiceCollection, Configuration]>;

/**
 * @internal
 */
export async function getRuntimeServices(
    applicationRoot: string,
    configurationOrSettingsDirectory: Configuration | string
): Promise<[ServiceCollection, Configuration]> {
    // Resolve configuration
    let configuration: Configuration;
    if (typeof configurationOrSettingsDirectory === 'string') {
        configuration = new Configuration()
            .argv()
            .env()
            .file(path.join(configurationOrSettingsDirectory, 'appsettings.Development.json'))
            .file(path.join(configurationOrSettingsDirectory, 'appsettings.json'));
    } else {
        configuration = configurationOrSettingsDirectory;
    }

    await normalizeConfiguration(configuration, applicationRoot);

    const services = new ServiceCollection({
        customAdapters: new Map(),
        declarativeTypes: [],
        memoryScopes: [],
        middlewares: new MiddlewareSet(),
        pathResolvers: [],
    });

    services.addFactory<ResourceExplorer, { declarativeTypes: ComponentDeclarativeTypes[] }>(
        'resourceExplorer',
        ['declarativeTypes'],
        ({ declarativeTypes }) => new ConfigurationResourceExporer(configuration, declarativeTypes)
    );

    registerAdaptiveComponents(services, configuration);
    registerDialogsComponents(services, configuration);
    registerLuisComponents(services, configuration);
    registerQnAComponents(services, configuration);

    const runtimeSettings = configuration.bind(['runtimeSettings']);

    addCoreBot(services, configuration);
    addFeatures(services, runtimeSettings.bind(['features']));
    addSkills(services, runtimeSettings.bind(['skills']));
    addStorage(services, configuration);
    addTelemetry(services, runtimeSettings.bind(['telemetry']));
    await addSettingsBotComponents(services, configuration);

    return [services, configuration];
}

export { Configuration };
