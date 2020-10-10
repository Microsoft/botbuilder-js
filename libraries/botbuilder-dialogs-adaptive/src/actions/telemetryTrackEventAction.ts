/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    StringExpression,
    BoolExpression,
    BoolExpressionConverter,
    StringExpressionConverter,
} from 'adaptive-expressions';
import { Converter, Converters, Dialog, DialogContext, DialogTurnResult, Properties } from 'botbuilder-dialogs';

type Input = Record<string, string>;
type Output = Record<string, StringExpression>;

/**
 * Converter to convert telemetry properties configuration.
 */
class TelemetryPropertiesConverter implements Converter<Input, Output> {
    public convert(properties: Input | Output): Output {
        const result = {};
        for (const name in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, name)) {
                const property = properties[name];
                result[name] = property instanceof StringExpression ? property : new StringExpression(property);
            }
        }
        return result;
    }
}

/**
 * Track a custom event.
 */
export class TelemetryTrackEventAction<O extends object = {}> extends Dialog {
    public static $kind = 'Microsoft.TelemetryTrackEventAction';

    /**
     * Initialize a `TelemetryTrackEventAction` instance.
     */
    public constructor();
    public constructor(eventName: string, properties: { [name: string]: string });
    public constructor(eventName?: string, properties?: { [name: string]: string }) {
        super();
        if (eventName) {
            this.eventName = new StringExpression(eventName);
        }
        if (properties) {
            this.properties = {};
            for (const name in properties) {
                this.properties[name] = new StringExpression(properties[name]);
            }
        }
    }

    /**
     * Gets or sets an optional expression which if is true will disable this action.
     */
    public disabled: BoolExpression;

    /**
     * Gets or sets a name to use for the event.
     */
    public eventName: StringExpression;

    /**
     * Gets or sets the properties to attach to the tracked event.
     */
    public properties: { [name: string]: StringExpression };

    public get converters(): Converters<Properties<TelemetryTrackEventAction>> {
        return {
            eventName: new StringExpressionConverter(),
            properties: new TelemetryPropertiesConverter(),
            disabled: new BoolExpressionConverter(),
        };
    }

    public async beginDialog(dc: DialogContext, options?: O): Promise<DialogTurnResult> {
        if (this.disabled && this.disabled.getValue(dc.state)) {
            return await dc.endDialog();
        }

        if (this.eventName) {
            const name = this.eventName.getValue(dc.state);
            const properties = {};
            if (this.properties) {
                for (const name in this.properties) {
                    properties[name] = this.properties[name].getValue(dc.state);
                }
            }
            this.telemetryClient.trackEvent({ name, properties });
        }

        return await dc.endDialog();
    }

    protected onComputeId(): string {
        return `TelemetryTrackEventAction[${this.eventName && this.eventName.toString()}]`;
    }
}
