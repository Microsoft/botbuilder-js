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
    Expression,
} from 'adaptive-expressions';
import { Activity, StringUtils } from 'botbuilder-core';
import {
    Converter,
    ConverterFactory,
    Dialog,
    DialogConfiguration,
    DialogContext,
    DialogStateManager,
    DialogTurnResult,
    TemplateInterface,
} from 'botbuilder-dialogs';
import { ActivityTemplate, StaticActivityTemplate } from '../templates';
import { ActivityTemplateConverter } from '../converters';

type D = DialogStateManager & {
    utterance: string;
};

export interface UpdateActivityConfiguration extends DialogConfiguration {
    activity?: string | Partial<Activity> | TemplateInterface<Partial<Activity>, D>;
    activityId?: string | Expression | StringExpression;
    disabled?: boolean | string | Expression | BoolExpression;
}

export class UpdateActivity<O extends object = {}> extends Dialog<O> implements UpdateActivityConfiguration {
    public static $kind = 'Microsoft.UpdateActivity';

    public constructor();
    public constructor(activityId?: string, activity?: Partial<Activity> | string) {
        super();
        if (activityId) {
            this.activityId = new StringExpression(activityId);
        }
        if (activity) {
            if (typeof activity === 'string') {
                this.activity = new ActivityTemplate(activity);
            } else {
                this.activity = new StaticActivityTemplate(activity);
            }
        }
    }

    /**
     * Gets or sets template for the activity.
     */
    public activity: TemplateInterface<Partial<Activity>, D & O>;

    /**
     * The expression which resolves to the activityId to update.
     */
    public activityId: StringExpression;

    /**
     * An optional expression which if is true will disable this action.
     */
    public disabled?: BoolExpression;

    public getConverter(property: keyof UpdateActivityConfiguration): Converter | ConverterFactory {
        switch (property) {
            case 'activity':
                return new ActivityTemplateConverter();
            case 'activityId':
                return new StringExpressionConverter();
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

        if (!this.activity) {
            throw new Error(`UpdateActivity: no activity assigned for action.`);
        }

        const data = Object.assign(
            {
                utterance: dc.context.activity.text || '',
            },
            dc.state,
            options
        );
        const activityResult = await this.activity.bind(dc, data);

        this.telemetryClient.trackEvent({
            name: 'GeneratorResult',
            properties: {
                template: this.activity,
                result: activityResult || '',
            },
        });

        const value = this.activityId.getValue(dc.state);
        activityResult.id = value.toString();

        const result = await dc.context.updateActivity(activityResult);
        return await dc.endDialog(result);
    }

    protected onComputeId(): string {
        if (this.activity instanceof ActivityTemplate) {
            return `UpdateActivity[${StringUtils.ellipsis(this.activity.template.trim(), 30)}]`;
        }
        return `UpdateActivity[${StringUtils.ellipsis(this.activity && this.activity.toString().trim(), 30)}]`;
    }
}
