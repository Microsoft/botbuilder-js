/**
 * @module botbuilder-dialogs-adaptive-teams
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { BoolExpression, BoolExpressionConverter } from 'adaptive-expressions';
import { Activity, MessageFactory, MessagingExtensionActionResponse, StringUtils } from 'botbuilder';
import {
    Converter,
    ConverterFactory,
    DialogConfiguration,
    DialogContext,
    DialogStateManager,
    DialogTurnResult,
    TemplateInterface,
} from 'botbuilder-dialogs';
import { ActivityTemplateConverter } from 'botbuilder-dialogs-adaptive/lib/converters';
import { BaseSendTaskModuleContinueResponse } from './baseSendTaskModuleContinueResponse';
import { BaseTeamsCacheInfoResponseDialog } from './baseTeamsCacheInfoResponseDialog';

export interface SendMessagingExtensionBotMessagePreviewResponseConfiguration extends DialogConfiguration {
    disabled?: boolean | string | BoolExpression;
    card?: TemplateInterface<Activity, DialogStateManager>;
}

/**
 * Send a messaging extension 'botMessagePreview' response.
 */
export class SendMessagingExtensionBotMessagePreviewResponse
    extends BaseSendTaskModuleContinueResponse
    implements SendMessagingExtensionBotMessagePreviewResponseConfiguration {
    /**
     * Class identifier.
     */
    public static $kind = 'Teams.SendMessagingExtensionBotMessagePreviewResponse';

    /**
     * Gets or sets template for the attachment template of a Thumbnail or Hero Card to send.
     */
    public card?: TemplateInterface<Activity, DialogStateManager>;

    public getConverter(
        property: keyof SendMessagingExtensionBotMessagePreviewResponseConfiguration
    ): Converter | ConverterFactory {
        switch (property) {
            case 'disabled':
                return new BoolExpressionConverter();
            case 'card':
                return new ActivityTemplateConverter();
            default:
                return super.getConverter(property);
        }
    }

    /**
     * Called when the dialog is started and pushed onto the dialog stack.
     *
     * @param {DialogContext} dc The [DialogContext](xref:botbuilder-dialogs.DialogContext) for the current turn of conversation.
     * @param {object} options Optional, initial information to pass to the dialog.
     * @returns {Promise<DialogTurnResult>} A promise representing the asynchronous operation.
     */
    public async beginDialog(dc: DialogContext, options?: Record<string, unknown>): Promise<DialogTurnResult> {
        if (this.disabled?.getValue(dc.state)) {
            return dc.endDialog();
        }

        if (!this.card) {
            throw new Error(`A valid Card is required for ${SendMessagingExtensionBotMessagePreviewResponse.$kind}.`);
        }
        const activity = await this.card.bind(dc, dc.state);

        const [attachment] = activity?.attachments ?? [];
        if (!attachment) {
            throw new Error(
                `Invalid activity. An attachment is required for ${SendMessagingExtensionBotMessagePreviewResponse.$kind}.`
            );
        }

        const response: MessagingExtensionActionResponse = {
            composeExtension: {
                type: 'botMessagePreview',
                activityPreview: <Activity>MessageFactory.attachment({
                    content: attachment.content,
                    contentType: attachment.contentType,
                }),
            },
            cacheInfo: this.getCacheInfo(dc),
        };

        const invokeResponse = BaseTeamsCacheInfoResponseDialog.createInvokeResponseActivity(response);
        const resourceResponse = await dc.context.sendActivity(invokeResponse);

        return dc.endDialog(resourceResponse);
    }

    /**
     * Builds the compute Id for the dialog.
     *
     * @returns {string} A string representing the compute Id.
     */
    protected onComputeId(): string {
        return `SendMessagingExtensionBotMessagePreviewResponse[\
            ${StringUtils.ellipsisHash(this.card?.toString() ?? '', 20)}\
        ]`;
    }
}
