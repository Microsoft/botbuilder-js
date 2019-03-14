/**
 * @module botbuilder-planning
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Dialog, DialogSet, DialogState, DialogTurnResult, Configurable, StateMap, DialogContext, DialogTurnStatus } from 'botbuilder-dialogs';
import { Storage, Activity, TurnContext, ActivityTypes, StoreItems } from 'botbuilder-core';
import { BotRunAdapter } from './internal/botRunAdapter';

export interface StoredBotState {
    userState: { 
        eTag?: string; 
    };
    conversationState: {
        eTag?: string;
        _dialogs?: DialogState;
        _lastAccess?: string;
    };
}

export interface BotTurnResult {
    turnResult: DialogTurnResult;
    activities?: Partial<Activity>[];
    newState?: StoredBotState;
}

export interface BotStateStorageKeys {
    userState: string;
    conversationState: string;
}

export interface BotConfiguration {
    /**
     * Root dialog to start from [onTurn()](#onturn) or [run()](#run) method.
     */
    rootDialog?: Dialog;

    /**
     * (Optional) number of milliseconds to expire the bots state after. 
     */
    expireAfter?: number;

    /**
     * (Optional) storage provider that will be used to read and write the bots state..
     */
    storage?: Storage;
}

export class Bot extends Configurable  {
    private main: DialogSet;
    private mainId: string;

    constructor(rootDialog?: Dialog, storage?: Storage) {
        super();
        if (rootDialog) { this.rootDialog = rootDialog }
        if (storage) { this.storage = storage }
    }

    /**
     * Root dialog to start from [onTurn()](#onturn) or [run()](#run) method.
     */
    public set rootDialog(dialog: Dialog) {
        this.mainId = dialog.id;
        this.main = new DialogSet();
        this.main.add(dialog);
    }

    public get rootDialog(): Dialog {
        return this.mainId ? this.main.find(this.mainId) : undefined;
    }

    /**
     * (Optional) number of milliseconds to expire the bots state after. 
     */
    public expireAfter?: number;

    /**
     * (Optional) storage provider that will be used to read and write the bots state..
     */
    public storage?: Storage;

    public configure(config: BotConfiguration): this {
        return super.configure(config);
    }

    public async onTurn(context: TurnContext, state?: StoredBotState): Promise<BotTurnResult> {
        // Log start of turn
        console.log('------------:');

        // Load state from storage if needed
        let saveState = false;
        const keys = Bot.getStorageKeys(context);
        if (!state) {
            if (!this.storage) { throw new Error(`Bot: unable to load the bots state. Bot.storage not assigned.`) }
            state = await Bot.loadBotState(this.storage, keys);
            saveState = true;
        }

        // Clone state to preserve original state
        const newState = JSON.parse(JSON.stringify(state));

        // Check for expired conversation
        const now  = new Date();
        if (typeof this.expireAfter == 'number' && newState.conversationState._lastAccess) {
            const lastAccess = new Date(newState.conversationState._lastAccess);
            if (now.getTime() - lastAccess.getTime() >= this.expireAfter) {
                // Clear conversation state
                state.conversationState = { eTag: newState.conversationState.eTag }
            }
        }
        newState.conversationState._lastAccess = now.toISOString();

        // Ensure dialog stack populated
        if (!newState.conversationState._dialogs) { 
            newState.conversationState._dialogs = { dialogStack: [] }
        }

        // Create DialogContext
        const userState = new StateMap(newState.userState);
        const conversationState = new StateMap(newState.conversationState);
        const dc = new DialogContext(this.main, context, newState.conversationState._dialogs, userState, conversationState);

        // Execute component
        let result = await dc.continueDialog();
        if (result.status == DialogTurnStatus.empty) {
            result = await dc.beginDialog(this.mainId);
        }

        // Save state if loaded from storage
        if (saveState) {
            await Bot.saveBotState(this.storage, keys, newState, state, '*');
            return { turnResult: result };
        } else {
            return { turnResult: result, newState: newState };
        }
    }

    public async run(activity: Partial<Activity>, state?: StoredBotState): Promise<BotTurnResult> {
        // Initialize context object
        const adapter = new BotRunAdapter();
        const context = new TurnContext(adapter, activity);
        const result = await this.onTurn(context, state);
        result.activities = adapter.activities;
        return result;
    }


    //---------------------------------------------------------------------------------------------
    // State loading
    //---------------------------------------------------------------------------------------------

    static async loadBotState(storage: Storage, keys: BotStateStorageKeys): Promise<StoredBotState> {
        const data = await storage.read([keys.userState, keys.conversationState]);
        return {
            userState: data[keys.userState] || {},
            conversationState: data[keys.conversationState] || {}
        };
    }

    static async saveBotState(storage: Storage, keys: BotStateStorageKeys, newState: StoredBotState, oldState?: StoredBotState, eTag?: string): Promise<void> {
        // Check for state changes
        let save = false;
        const changes: StoreItems = {};
        if (oldState) {
            if (JSON.stringify(newState.userState) != JSON.stringify(oldState.userState)) {
                if (eTag) { newState.userState.eTag = eTag }
                changes[keys.userState] = newState.userState;
                save = true; 
            }
            if (JSON.stringify(newState.conversationState) != JSON.stringify(oldState.conversationState)) {
                if (eTag) { newState.conversationState.eTag = eTag }
                changes[keys.conversationState] = newState.conversationState;
                save = true;
            }
        } else {
            if (eTag) {
                newState.userState.eTag = eTag;
                newState.conversationState.eTag = eTag;
            }
            changes[keys.userState] = newState.userState;
            changes[keys.conversationState] = newState.conversationState;
            save = true;
        }

        // Save changes
        if (save) {
            await storage.write(changes);
        }
    }

    static getStorageKeys(context: TurnContext): BotStateStorageKeys {
        // Get channel, user, and conversation ID's
        const activity = context.activity;
        const channelId: string = activity.channelId;
        let userId: string = activity.from && activity.from.id ? activity.from.id : undefined;
        const conversationId: string = activity.conversation && activity.conversation.id ? activity.conversation.id : undefined;

        // Patch User ID if needed
        if (activity.type == ActivityTypes.ConversationUpdate) {
            const users = (activity.membersAdded || activity.membersRemoved || []).filter((u) => u.id != activity.recipient.id);
            const found = userId ? users.filter((u) => u.id == userId) : [];
            if (found.length == 0 && users.length > 0) {
                userId = users[0].id
            }
        } 

        // Verify ID's found
        if (!userId) { throw new Error(`Bot: unable to load the bots state. The users ID couldn't be found.`) }
        if (!conversationId) { throw new Error(`Bot: unable to load the bots state. The conversations ID couldn't be found.`) }

        // Return storage keys
        return {
            userState: `${channelId}/users/${userId}`,
            conversationState: `${channelId}/conversations/${conversationId}`
        };
    }
}