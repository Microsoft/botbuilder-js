/**
 * @module botbuilder-dialogs-adaptive-testing
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Activity, TurnContext, TestAdapter } from 'botbuilder-core';
import { Inspector, TestAction } from '../testAction';

export interface UserActivityConfiguration {
    activity?: Activity;
    user?: string;
}

/**
 * Send an activity to the bot.
 */
export class UserActivity extends TestAction implements UserActivityConfiguration {
    public static $kind = 'Microsoft.Test.UserActivity';

    /**
     * The activity to compare.
     */
    public activity: Activity;

    /**
     * If user is set then the channalAccount.id and channelAccount.name will be from user.
     */
    public user: string;

    /**
     * Execute the test.
     * @param testAdapter Adapter to execute against.
     * @param callback Logic for the bot to use.
     * @param inspector Inspector for dialog context.
     * @returns A Promise that represents the work queued to execute.
     */
    public async execute(
        testAdapter: TestAdapter,
        callback: (context: TurnContext) => Promise<void>,
        inspector?: Inspector
    ): Promise<void> {
        if (!this.activity) {
            throw new Error('You must define one of Text of Activity properties');
        }

        const activity = Object.assign({}, this.activity);
        const reference = testAdapter.conversation;
        activity.channelId = this.activity?.channelId ?? reference.channelId;
        activity.serviceUrl = this.activity?.serviceUrl ?? reference.serviceUrl;
        activity.conversation = this.activity?.conversation ?? reference.conversation;
        activity.from = this.activity?.from ?? reference.user;
        activity.recipient = this.activity?.recipient ?? reference.bot;
        if (reference.activityId) {
            activity.id = reference.activityId;
        }

        if (this.user) {
            activity.from = Object.assign({}, activity.from);
            activity.from.id = this.user;
            activity.from.name = this.user;
        }
        activity.locale = testAdapter.locale;

        await testAdapter.processActivity(activity, callback);
    }
}
