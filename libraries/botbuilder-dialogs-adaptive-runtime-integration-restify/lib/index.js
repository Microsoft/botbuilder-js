"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeServer = exports.start = void 0;
const t = __importStar(require("runtypes"));
const path_1 = __importDefault(require("path"));
const restify_1 = __importDefault(require("restify"));
const botbuilder_dialogs_adaptive_runtime_1 = require("botbuilder-dialogs-adaptive-runtime");
// Explicitly fails checks for `""`
const NonEmptyString = t.String.withConstraint((str) => str.length > 0 || 'must be non-empty string');
const TypedOptions = t.Record({
    /**
     * Path that the server will listen to for [Activities](xref:botframework-schema.Activity)
     */
    messagingEndpointPath: NonEmptyString,
    /**
     * Path that the server will listen to for skills requests
     */
    skillsEndpointPrefix: NonEmptyString,
    /**
     * Port that server should listen on
     */
    port: t.Union(NonEmptyString, t.Number),
    /**
     * Log errors to stderr
     */
    logErrors: t.Boolean,
    /**
     * Path inside applicationRoot that should be served as static files
     */
    staticDirectory: NonEmptyString,
});
const defaultOptions = {
    logErrors: true,
    messagingEndpointPath: '/api/messages',
    skillsEndpointPrefix: '/api/skills',
    port: 3978,
    staticDirectory: 'wwwroot',
};
function resolveOptions(options, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const configOverrides = {};
        const port = ['port', 'PORT'].map((key) => configuration.string([key])).find((port) => port !== undefined);
        if (port !== undefined) {
            configOverrides.port = port;
        }
        return TypedOptions.check(Object.assign({}, defaultOptions, configOverrides, options));
    });
}
/**
 * Start a bot using the runtime restify integration.
 *
 * @param applicationRoot application root directory
 * @param settingsDirectory settings directory
 * @param options options bag
 */
function start(applicationRoot, settingsDirectory, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const [services, configuration] = yield botbuilder_dialogs_adaptive_runtime_1.getRuntimeServices(applicationRoot, settingsDirectory);
        const resolvedOptions = yield resolveOptions(options, configuration);
        const server = yield makeServer(services, configuration, applicationRoot, resolvedOptions);
        server.listen(resolvedOptions.port, () => console.log(`server listening on port ${resolvedOptions.port}`));
    });
}
exports.start = start;
// Content type overrides for specific file extensions
const extensionContentTypes = {
    '.lu': 'vnd.application/lu',
    '.qna': 'vnd.application/qna',
};
/**
 * Create a server using the runtime restify integration.
 *
 * @param services runtime service collection
 * @param configuration runtime configuration
 * @param applicationRoot application root directory
 * @param options options bag for configuring restify Server
 * @param server optional predefined restify server, useful to register middleware
 * @returns a restify Server ready to listen for connections
 */
function makeServer(services, configuration, applicationRoot, options = {}, server = restify_1.default.createServer()) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { adapter, bot, channelServiceRoutes, customAdapters } = services.mustMakeInstances('adapter', 'bot', 'channelServiceRoutes', 'customAdapters');
        const resolvedOptions = yield resolveOptions(options, configuration);
        const errorHandler = (err, res) => {
            if (options.logErrors) {
                console.error(err);
            }
            if (res && !res.headersSent) {
                res.status(500);
                res.json({ message: 'Internal server error' });
            }
        };
        server.post(resolvedOptions.messagingEndpointPath, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield adapter.processActivity(req, res, (turnContext) => __awaiter(this, void 0, void 0, function* () {
                    yield bot.run(turnContext);
                }));
            }
            catch (err) {
                return errorHandler(err, res);
            }
        }));
        channelServiceRoutes.register(server, resolvedOptions.skillsEndpointPrefix);
        const adapters = (_a = configuration.type(['runtimeSettings', 'adapters'], t.Array(t.Record({
            name: t.String,
            enabled: t.Union(t.Boolean, t.Undefined),
            route: t.String,
        })))) !== null && _a !== void 0 ? _a : [];
        adapters
            .filter((settings) => settings.enabled)
            .forEach((settings) => {
            const adapter = customAdapters.get(settings.name);
            if (adapter) {
                server.post(`/api/${settings.route}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield adapter.processActivity(req, res, (turnContext) => __awaiter(this, void 0, void 0, function* () {
                            yield bot.run(turnContext);
                        }));
                    }
                    catch (err) {
                        return errorHandler(err, res);
                    }
                }));
            }
            else {
                console.warn(`Custom Adapter for \`${settings.name}\` not registered.`);
            }
        });
        server.get('*', restify_1.default.plugins.serveStaticFiles(path_1.default.join(applicationRoot, resolvedOptions.staticDirectory), {
            setHeaders: (res, filePath) => {
                const contentType = extensionContentTypes[path_1.default.extname(filePath)];
                if (contentType) {
                    res.setHeader('Content-Type', contentType);
                }
            },
        }));
        server.on('upgrade', (req, socket, head) => __awaiter(this, void 0, void 0, function* () {
            const adapter = services.mustMakeInstance('adapter');
            try {
                yield adapter.useWebSocket(req, socket, head, (context) => __awaiter(this, void 0, void 0, function* () {
                    yield bot.run(context);
                }));
            }
            catch (err) {
                return errorHandler(err);
            }
        }));
        return server;
    });
}
exports.makeServer = makeServer;
//# sourceMappingURL=index.js.map