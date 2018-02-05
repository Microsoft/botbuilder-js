"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module botbuilder
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const botbuilder_schema_1 = require("botbuilder-schema");
const bot_1 = require("./bot");
/**
 * Creates a new BotContext instance.
 *
 * @param bot Bot the context is for.
 * @param request (Optional) request to initialize the context with.
 */
function createBotContext(bot, request) {
    const context = {};
    context.bot = bot;
    context.request = request || {};
    context.responses = [];
    context.conversationReference = {};
    context.state = {};
    context.templateEngines = [];
    // Populate conversation reference
    if (request) {
        context.conversationReference = getConversationReference(request);
    }
    // Generate null logger
    context.logger = {};
    context.logger.flush = () => {
        return new Promise((resolve) => {
            resolve();
        });
    };
    ['logRequest', 'startRequest', 'logDependency', 'startDependency', 'logAvailability',
        'logEvent', 'logException', 'logException', 'logMetric', 'log'].forEach((method) => {
        context.logger[method] = () => { };
    });
    // Add methods
    // !!!!!!! Be sure to use "this." when accessing members of the context object because
    // !!!!!!! you could be working with a clone.
    function throwIfDisposed(method) {
        if (disposed) {
            throw new Error(`BotContext.${method}(): error calling method after context has been disposed.`);
        }
    }
    let disposed = false;
    context.begin = function begin(dialog) {
        throwIfDisposed('begin');
        return dialog.begin(this);
    };
    context.clone = function clone() {
        throwIfDisposed('clone');
        const clone = Object.assign({}, this);
        if (clone.state) {
            clone.state = Object.assign({}, clone.state);
        }
        return clone;
    };
    context.delay = function delay(duration) {
        throwIfDisposed('delay');
        this.responses.push({ type: 'delay', value: duration });
        return this;
    };
    context.dispose = function dispose() {
        disposed = true;
    };
    context.endOfConversation = function endOfConversation(code) {
        throwIfDisposed('endOfConversation');
        const activity = {
            type: botbuilder_schema_1.ActivityTypes.EndOfConversation,
            code: code || botbuilder_schema_1.EndOfConversationCodes.CompletedSuccessfully
        };
        this.responses.push(activity);
        return this;
    };
    context.findEntities = function findEntities(intent, type) {
        throwIfDisposed('findEntities');
        if (!type && (typeof intent !== 'object' || !intent.hasOwnProperty('name'))) {
            type = intent;
            intent = undefined;
        }
        // Find entities to search over
        let entities = this.request.entities || [];
        const topIntent = intent || this.topIntent;
        if (topIntent && topIntent.entities) {
            entities = entities.concat(topIntent.entities);
        }
        // Search over entities
        const matched = [];
        if (type) {
            entities.forEach((entity) => {
                let matches = typeof type === 'string' ? (entity.type === type) : type.test(entity.type);
                if (matches) {
                    matched.push(entity);
                }
            });
        }
        return matched;
    };
    context.getEntity = function getEntity(intent, type, occurrence) {
        throwIfDisposed('getEntity');
        if (!occurrence && (typeof intent !== 'object' || !intent.hasOwnProperty('name'))) {
            occurrence = type;
            type = intent;
            intent = undefined;
        }
        if (typeof occurrence !== 'number') {
            occurrence = 0;
        }
        const entities = this.findEntities(intent, type);
        if (occurrence < entities.length) {
            const entity = entities[occurrence];
            return entity.hasOwnProperty('value') ? entity.value : entity;
        }
        return undefined;
    };
    context.ifIntent = function ifIntent(filter) {
        if (this.topIntent) {
            return typeof filter === 'string' ? this.topIntent.name === filter : filter.test(this.topIntent.name);
        }
        return false;
    };
    context.ifRegExp = function ifRegExp(filter) {
        const utterance = (this.request.text || '').trim();
        return filter.test(utterance);
    };
    context.reply = function reply(textOrActivity, speak, additional) {
        throwIfDisposed('reply');
        // Check other parameters
        if (!additional && typeof speak === 'object') {
            additional = speak;
            speak = undefined;
        }
        if (typeof textOrActivity === 'object') {
            if (!textOrActivity.type) {
                textOrActivity.type = botbuilder_schema_1.ActivityTypes.Message;
            }
            this.responses.push(textOrActivity);
        }
        else {
            const activity = Object.assign({
                type: botbuilder_schema_1.ActivityTypes.Message,
                text: textOrActivity || '',
            }, additional || {});
            if (typeof speak === 'string') {
                activity.speak = speak;
            }
            this.responses.push(activity);
        }
        return this;
    };
    context.replyWith = function replyWith(templateId, data) {
        throwIfDisposed('replyTemplate');
        // push internal template record
        const activity = {
            type: "template",
        };
        activity.text = templateId;
        activity.value = data;
        this.responses.push(activity);
        return this;
    };
    let responded = false;
    context.sendResponses = function sendResponses() {
        throwIfDisposed('sendResponses');
        const args = this.responses.slice(0);
        const cnt = args.length;
        args.unshift(this);
        return bot_1.Bot.prototype.post.apply(this.bot, args)
            .then((results) => {
            if (cnt > 0) {
                this.responses.splice(0, cnt);
                responded = true;
            }
            return results;
        });
    };
    context.showTyping = function showTyping() {
        throwIfDisposed('showTyping');
        this.responses.push({ type: botbuilder_schema_1.ActivityTypes.Typing });
        return this;
    };
    Object.defineProperty(context, 'responded', {
        get: function () {
            return this.responses.length > 0 || responded;
        }
    });
    return context;
}
exports.createBotContext = createBotContext;
function getConversationReference(activity) {
    return {
        activityId: activity.id,
        user: activity.from,
        bot: activity.recipient,
        conversation: activity.conversation,
        channelId: activity.channelId,
        serviceUrl: activity.serviceUrl
    };
}
exports.getConversationReference = getConversationReference;
function applyConversationReference(activity, reference) {
    activity.channelId = reference.channelId;
    activity.serviceUrl = reference.serviceUrl;
    activity.conversation = reference.conversation;
    activity.from = reference.bot;
    activity.recipient = reference.user;
    activity.replyToId = reference.activityId;
}
exports.applyConversationReference = applyConversationReference;
//# sourceMappingURL=botContext.js.map