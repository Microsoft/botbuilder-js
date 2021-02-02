/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import {
    ArrayExpression,
    ArrayExpressionConverter,
    BoolExpression,
    BoolExpressionConverter,
    Expression,
    StringExpression,
    StringExpressionConverter,
} from 'adaptive-expressions';

import { Activity, RecognizerResult } from 'botbuilder-core';
import { Converter, ConverterFactory, DialogContext, Recognizer, RecognizerConfiguration } from 'botbuilder-dialogs';
import { DynamicList } from './dynamicList';
import {
    LuisAdaptivePredictionOptions,
    LuisAdaptivePredictionOptionsConfiguration,
    LuisAdaptivePredictionOptionsConverter,
} from './luisAdaptivePredictionOptions';
import { LuisApplication, LuisRecognizer, LuisRecognizerOptionsV3 } from './luisRecognizer';
import { LuisTelemetryConstants } from './luisTelemetryConstants';

export interface LuisAdaptiveRecognizerConfiguration extends RecognizerConfiguration {
    applicationId?: string | Expression | StringExpression;
    version?: string | Expression | StringExpression;
    endpoint?: string | Expression | StringExpression;
    endpointKey?: string | Expression | StringExpression;
    externalEntityRecognizer?: Recognizer;
    dynamicLists?: unknown[] | string | Expression | ArrayExpression<unknown>;
    predictionOptions?: LuisAdaptivePredictionOptionsConfiguration | LuisAdaptivePredictionOptions;
    logPersonalInformation?: boolean | string | Expression | BoolExpression;
}

/**
 * Class that represents an adaptive LUIS recognizer.
 */
export class LuisAdaptiveRecognizer extends Recognizer implements LuisAdaptiveRecognizerConfiguration {
    public static $kind = 'Microsoft.LuisRecognizer';

    /**
     * LUIS application ID.
     */
    public applicationId: StringExpression;

    /**
     * LUIS application version.
     */
    public version: StringExpression;

    /**
     * LUIS endpoint to query.
     *
     * @summary
     * For example: "https://westus.api.cognitive.microsoft.com"
     */
    public endpoint: StringExpression;

    /**
     * Key used to talk to a LUIS endpoint.
     */
    public endpointKey: StringExpression;

    /**
     * External entity recognizer.
     *
     * @summary
     * This recognizer is run before calling LUIS and the results are passed to LUIS.
     */
    public externalEntityRecognizer: Recognizer;

    /**
     * LUIS dynamic list.
     */
    public dynamicLists: ArrayExpression<DynamicList>;

    /**
     * LUIS prediction options.
     */
    public predictionOptions: LuisAdaptivePredictionOptions;

    /**
     * The flag to indicate in personal information should be logged in telemetry.
     */
    public logPersonalInformation: BoolExpression = new BoolExpression('=settings.telemetry.logPersonalInformation');

    public getConverter(property: keyof LuisAdaptiveRecognizerConfiguration): Converter | ConverterFactory {
        switch (property) {
            case 'applicationId':
            case 'version':
            case 'endpoint':
            case 'endpointKey':
                return new StringExpressionConverter();
            case 'dynamicLists':
                return new ArrayExpressionConverter();
            case 'predictionOptions':
                return new LuisAdaptivePredictionOptionsConverter();
            case 'logPersonalInformation':
                return new BoolExpressionConverter();
            default:
                return super.getConverter(property);
        }
    }

    /**
     * To recognize intents and entities in a users utterance.
     *
     * @param {DialogContext} dialogContext The [DialogContext](xref:botbuilder-dialogs.DialogContext).
     * @param {Activity} activity The [Activity](xref:botbuilder-core.Activity).
     * @param {object} telemetryProperties Optional. Additional properties to be logged to telemetry with event.
     * @param {object} telemetryMetrics Optional. Additional metrics to be logged to telemetry with event.
     * @returns {Promise<RecognizerResult>} A promise resolving to the recognizer result.
     */
    public async recognize(
        dialogContext: DialogContext,
        activity: Activity,
        telemetryProperties?: { [key: string]: string },
        telemetryMetrics?: { [key: string]: number }
    ): Promise<RecognizerResult> {
        // Validate passed in activity matches turn activity
        const context = dialogContext.context;
        const utteranceMatches: boolean =
            !activity || (context.activity.type === activity.type && context.activity.text === activity.text);

        if (!utteranceMatches) {
            throw new Error(`TurnContext is different than text`);
        }

        // Initialize application info
        const dcState = dialogContext.state;
        const application: LuisApplication = {
            applicationId: this.applicationId.getValue(dcState),
            endpoint: this.endpoint.getValue(dcState),
            endpointKey: this.endpointKey.getValue(dcState),
        };

        // Create and call wrapper
        const recognizer = new LuisRecognizer(application, this.recognizerOptions(dialogContext));

        const result = await recognizer.recognize(context);
        this.trackRecognizerResult(
            dialogContext,
            'LuisResult',
            this.fillRecognizerResultTelemetryProperties(result, telemetryProperties, dialogContext),
            telemetryMetrics
        );

        return result;
    }

    /**
     * Construct V3 recognizer options from the current dialog context.
     *
     * @param {DialogContext} dialogContext Current dialog context.
     * @returns {LuisRecognizerOptionsV3} luis recognizer options
     */
    public recognizerOptions(dialogContext: DialogContext): LuisRecognizerOptionsV3 {
        const dcState = dialogContext.state;
        return {
            apiVersion: 'v3',
            externalEntityRecognizer: this.externalEntityRecognizer,
            datetimeReference: this.predictionOptions?.dateTimeReference?.getValue(dcState),
            externalEntities: this.predictionOptions?.externalEntities?.getValue(dcState),
            includeAllIntents: this.predictionOptions?.includeAllIntents?.getValue(dcState) ?? false,
            includeInstanceData: this.predictionOptions.includeInstanceData?.getValue(dcState) ?? true,
            includeAPIResults: this.predictionOptions?.includeAPIResults?.getValue(dcState) ?? false,
            log: this.predictionOptions?.log?.getValue(dcState) ?? true,
            preferExternalEntities: this.predictionOptions?.preferExternalEntities?.getValue(dcState) ?? true,
            slot: this.predictionOptions?.slot?.getValue(dcState) === 'staging' ? 'staging' : 'production',
            version: this.version?.getValue(dcState),
            telemetryClient: this.telemetryClient,
            dynamicLists: this.dynamicLists?.getValue(dcState),
        };
    }

    /**
     * Fills the event properties for LuisResult event for telemetry.
     * These properties are logged when the recognizer is called.
     *
     * @param {RecognizerResult} recognizerResult Last activity sent from user.
     * @param {object} telemetryProperties Additional properties to be logged to telemetry with the LuisResult event.
     * @param {DialogContext} dialogContext Dialog context.
     * @returns {object} A dictionary that is sent as properties to BotTelemetryClient.trackEvent method for the LuisResult event.
     */
    protected fillRecognizerResultTelemetryProperties(
        recognizerResult: RecognizerResult,
        telemetryProperties: { [key: string]: string },
        dialogContext: DialogContext
    ): { [key: string]: string } {
        const logPersonalInfo = this.logPersonalInformation.tryGetValue(dialogContext.state);
        const applicationId = this.applicationId.tryGetValue(dialogContext.state);

        const [firstIntent, secondIntent] = LuisRecognizer.sortedIntents(recognizerResult);

        // Add the intent score and conversation id properties
        const properties: { [key: string]: string } = {};

        properties[LuisTelemetryConstants.applicationIdProperty] = applicationId.value;

        properties[LuisTelemetryConstants.intentProperty] = firstIntent?.intent ?? '';
        properties[LuisTelemetryConstants.intentScoreProperty] = (firstIntent?.score ?? 0).toString();
        properties[LuisTelemetryConstants.intent2Property] = secondIntent?.intent ?? '';
        properties[LuisTelemetryConstants.intentScore2Property] = (secondIntent?.score ?? 0).toString();

        properties[LuisTelemetryConstants.fromIdProperty] = dialogContext.context.activity.from.id;

        if (recognizerResult.sentiment) {
            if (recognizerResult.sentiment.label) {
                properties[LuisTelemetryConstants.sentimentLabelProperty] = recognizerResult.sentiment.label;
            }

            if (recognizerResult.sentiment.score) {
                properties[LuisTelemetryConstants.sentimentScoreProperty] = recognizerResult.sentiment.score.toString();
            }
        }

        // Log entity names
        if (recognizerResult.entities) {
            properties[LuisTelemetryConstants.entitiesProperty] = JSON.stringify(recognizerResult.entities);
        }

        // Use the logPersonalInfo flag to toggle logging PII data, text is a common example
        if (logPersonalInfo.value && dialogContext.context.activity.text) {
            properties[LuisTelemetryConstants.questionProperty] = dialogContext.context.activity.text;
        }

        // Additional Properties can override "stock" properties.
        if (telemetryProperties) {
            return Object.assign({}, properties, telemetryProperties);
        }

        return properties;
    }
}
