/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { BotContext, Middleware } from 'botbuilder';
export interface QnAMakerResult {
    answer: string;
    score: number;
}
export interface QnAMakerSettings {
    /** ID of your knowledge base. */
    knowledgeBaseId: string;
    /** Your subscription keys. */
    subscriptionKey: string;
    /** (Optional) minimum score accepted. Defaults to "0.3". */
    scoreThreshold?: number;
    /** (Optional) service endpoint. Defaults to "https://westus.api.cognitive.microsoft.com/" */
    serviceEndpoint?: string;
    /** (Optional) number of results to return. Defaults to "1". */
    top?: number;
    /**
     * (Optional) and only applied when a QnAMaker instance has been added to ths adapter as
     * middleware. Defaults to a value of `false`.
     *
     * Setting this to `true` will cause the QnA Maker service to be called BEFORE any other
     * middleware or the bots logic is run. Should the service return an answer the user will be
     * automatically sent the answer and the turn completed such that no other middleware or the
     * bots logic will be run.
     *
     * The default behavior is to only call the service AFTER all other middleware and the bots logic
     * has run, and only under the condition that no other replies have been sent by the bot yet
     * for this turn.
     */
    answerBeforeNext?: boolean;
}
export declare class QnAMaker implements Middleware {
    private readonly settings;
    constructor(settings: QnAMakerSettings);
    onProcessRequest(context: BotContext, next: () => Promise<void>): Promise<void>;
    answer(context: BotContext): Promise<boolean>;
    generateAnswer(question: string, top?: number, scoreThreshold?: number): Promise<QnAMakerResult[]>;
    protected callService(serviceEndpoint: string, question: string, top: number): Promise<QnAMakerResult[]>;
}
