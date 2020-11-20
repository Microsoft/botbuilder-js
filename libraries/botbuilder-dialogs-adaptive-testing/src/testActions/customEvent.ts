/**
 * @module botbuilder-dialogs-adaptive-testing
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TurnContext, TestAdapter, ActivityTypes } from 'botbuilder-core';
import { TestAction } from '../testAction';

export interface CustomEventConfiguration {
    name: string;
    value?: unknown;
}

export class CustomEvent<T = unknown> extends TestAction implements CustomEventConfiguration {
    public static $kind = 'Microsoft.Test.CustomEvent';
    /**
     * The event name.
     */
    public name: string;

    /**
     * Event value.
     */
    public value?: T;

    public async execute(testAdapter: TestAdapter, callback: (context: TurnContext) => Promise<void>): Promise<void> {
        if (!this.name) {
            throw Error('You must define the event name.');
        }
        const activity = testAdapter.makeActivity();
        activity.type = ActivityTypes.Event;
        activity.name = this.name;
        activity.value = this.value;

        await testAdapter.processActivity(activity, callback);
    }
}
