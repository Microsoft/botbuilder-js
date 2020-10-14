/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    BoolExpression,
    BoolExpressionConverter,
    Expression,
    StringExpression,
    StringExpressionConverter,
} from 'adaptive-expressions';
import {
    Converter,
    ConverterFactory,
    Dialog,
    DialogConfiguration,
    DialogContext,
    DialogTurnResult,
} from 'botbuilder-dialogs';

type PropertiesInput = Record<string, string>;
type PropertiesOutput = Record<string, StringExpression>;

/**
 * Converter to convert telemetry properties configuration.
 */
class TelemetryPropertiesConverter implements Converter<PropertiesInput, PropertiesOutput> {
    public convert(value: PropertiesInput | PropertiesOutput): PropertiesOutput {
        return Object.entries(value).reduce((properties, [key, value]) => {
            const property = value instanceof StringExpression ? value : new StringExpression(value);
            return { ...properties, [key]: property };
        }, {});
    }
}

export interface TelemetryTrackEventActionConfiguration extends DialogConfiguration {
    disabled?: boolean | string | Expression | BoolExpression;
    eventName?: string | Expression | StringExpression;
    properties?: PropertiesInput | PropertiesOutput;
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

    public getConverter(property: keyof TelemetryTrackEventActionConfiguration): Converter | ConverterFactory {
        switch (property) {
            case 'eventName':
                return new StringExpressionConverter();
            case 'properties':
                return new TelemetryPropertiesConverter();
            case 'disabled':
                return new BoolExpressionConverter();
            default:
                return super.getConverter(property);
        }
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
