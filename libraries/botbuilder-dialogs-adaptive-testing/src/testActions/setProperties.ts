/**
 * @module botbuilder-dialogs-adaptive-testing
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { StringExpression, ValueExpression } from 'adaptive-expressions';
import { TestAdapter, TurnContext } from 'botbuilder-core';
import { Converter, ConverterFactory } from 'botbuilder-dialogs';
import { PropertyAssignment } from 'botbuilder-dialogs-adaptive';
import { Inspector, TestAction } from '../testAction';

type AssignmentInput<T> = {
    property: string;
    value: T;
};

class PropertyAssignmentsConverter<T = unknown> implements Converter<AssignmentInput<T>[], PropertyAssignment[]> {
    public convert(items: AssignmentInput<T>[] | PropertyAssignment[]): PropertyAssignment[] {
        const assignments: PropertyAssignment[] = [];
        items.forEach((item) => {
            const { property, value } = item;
            assignments.push({
                property: property instanceof StringExpression ? property : new StringExpression(property),
                value: value instanceof ValueExpression ? value : new ValueExpression(value),
            });
        });
        return assignments;
    }
}

export interface SetPropertiesConfiguration {
    assignments?: AssignmentInput<unknown>[] | PropertyAssignment[];
}

/**
 * Mock one or more property values.
 */
export class SetProperties extends TestAction {
    public static $kind = 'Microsoft.Test.SetProperties';

    /**
     * Gets or sets the property assignments.
     */
    public assignments: PropertyAssignment[] = [];

    public getConverter(property: keyof SetPropertiesConfiguration): Converter | ConverterFactory {
        switch (property) {
            case 'assignments':
                return new PropertyAssignmentsConverter();
            default:
                return super.getConverter(property);
        }
    }

    /**
     * Execute the test.
     * @param testAdapter Adapter to execute against.
     * @param callback Logic for the bot to use.
     * @param inspector Inspector for dialog context.
     * @returns A Promise that represents the work queued to execute.
     */
    public async execute(
        adapter: TestAdapter,
        callback: (context: TurnContext) => Promise<void>,
        inspector?: Inspector
    ): Promise<void> {
        if (inspector) {
            await inspector((dc) => {
                this.assignments.forEach((assignment) => {
                    dc.state.setValue(assignment.property.getValue(dc.state), assignment.value.getValue(dc.state));
                });
            });
        } else {
            throw new Error('No inspector to use for setting properties');
        }
    }
}
