/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { InvokeResponse } from './botFrameworkAdapter';

import {
    ActivityTypes,
    ActivityHandler,
    AppBasedLinkQuery,
    FileConsentCardResponse,
    MessagingExtensionAction,
    MessagingExtensionActionResponse,
    MessagingExtensionQuery,
    MessagingExtensionResponse,
    O365ConnectorCardActionQuery,
    SigninStateVerificationQuery,
    TaskModuleTaskInfo,
    TaskModuleRequest,
    TaskModuleResponse,
    TurnContext
} from 'botbuilder-core';

export class TeamsActivityHandler extends ActivityHandler {

    /**
     * 
     * @param context 
     */
    protected async onTurnActivity(context: TurnContext): Promise<void> {
        if (context.activity.channelId === 'msteams') {
            // this.teamsRosterClient = 
        }

        switch (context.activity.type) {
            case ActivityTypes.Invoke:
                const invokeResponse = await this.onInvokeActivity(context);
                if (invokeResponse) {
                    await context.sendActivity({ value: invokeResponse, type: 'invokeResponse' });
                }
                break;
            default:
                await super.onTurnActivity(context);
                break;
        }
    }

    /**
     * 
     * @param context 
     */
    protected async onInvokeActivity(context: TurnContext): Promise<InvokeResponse> {
        try {
            if (!context.activity.name && context.activity.channelId === 'msteams') {
                return await this.onTeamsCardActionInvoke(context);
            } else {
                switch (context.activity.name) {
                    case 'signin/verifyState':
                        return await this.onTeamsSigninVerifyState(context, context.activity.value);

                    case 'fileConsent/invoke':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsFileConsent(context, context.activity.value));

                    case 'actionableMessage/executeAction':
                        await this.onTeamsO365ConnectorCardAction(context, context.activity.value);
                        return TeamsActivityHandler.createInvokeResponse();

                    case 'composeExtension/queryLink':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsAppBasedLinkQuery(context, context.activity.value));

                    case 'composeExtension/query':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsMessagingExtensionQuery(context, context.activity.value));

                    case 'composeExtension/selectItem':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsMessagingExtensionSelectItem(context, context.activity.value));

                    case 'composeExtension/submitAction':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsMessagingExtensionSubmitActionDispatch(context, context.activity.value));

                    case 'composeExtension/fetchTask':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsMessagingExtensionFetchTask(context, context.activity.value));

                    case 'composeExtension/querySettingUrl':
                        return TeamsActivityHandler.createInvokeResponse(await this.onTeamsMessagingExtensionConfigurationQuerySettingUrl(context, context.activity.value));

                    case 'composeExtension/setting':
                        await this.onTeamsMessagingExtensionQuerySetting(context, context.activity.value);
                        return TeamsActivityHandler.createInvokeResponse();

                    case 'composeExtension/onCardButtonClicked':
                        await this.onTeamsMessagingExtensionCardButtonClicked(context, context.activity.value);
                        return TeamsActivityHandler.createInvokeResponse();

                    case 'task/fetch':
                        const fetchResponse = await this.onTeamsTaskModuleFetch(context, context.activity.value);
                        return TeamsActivityHandler.createInvokeResponse(fetchResponse);

                    case 'task/submit':
                        const submitResponse = await this.onTeamsTaskModuleSubmit(context, context.activity.value);
                        return TeamsActivityHandler.createInvokeResponse(submitResponse);

                    default:
                        throw new Error('NotImplemented');
                }
            }
        } catch (err) {
            if (err.message === 'NotImplemented') {
                return { status: 501 };
            }
            throw err;
        }
    }

    /**
     * 
     * @param context 
     */
    protected async onTeamsCardActionInvoke(context: TurnContext): Promise<InvokeResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'fileConsent/invoke'. Handlers registered here run before
     * `onTeamsFileConsentAccept` and `onTeamsFileConsentDecline`.
     * Developers are not passed a pointer to the next `onTeamsFileConsent` handler because the _wrapper_ around
     * the handler will call `onDialogs` handlers after delegating to `onTeamsFileConsentAccept` or `onTeamsFileConsentDecline`.
     * @remarks
     * It is important that only ONE onTeamsFileConsent handler is registered, otherwise the handlers for
     * onTeamsFileConsentAccept and onTeamsFileConsentDecline will run more than once.
     * This method wraps the given handler and sends an InvokeResponse on behalf of the user.
     * @param context
     * @param fileConsentCardResponse
     */
    protected async onTeamsFileConsent(context: TurnContext, fileConsentCardResponse: FileConsentCardResponse): Promise<void> {
        switch (fileConsentCardResponse.action) {
            case 'accept':
                return await this.onTeamsFileConsentAccept(context, fileConsentCardResponse);
            case 'decline':
                return await this.onTeamsFileConsentDecline(context, fileConsentCardResponse);
            default:
                throw new Error('NotImplemented');
        }
    }

    /**
     * Receives invoke activities with Activity name of 'fileConsent/invoke' with confirmation from user
     * @remarks
     * This type of invoke activity occur during the File Consent flow.
     * @param context
     * @param fileConsentCardResponse
     */
    protected async onTeamsFileConsentAccept(context: TurnContext, fileConsentCardResponse: FileConsentCardResponse): Promise<void> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'fileConsent/invoke' with decline from user
     * @remarks
     * This type of invoke activity occur during the File Consent flow.
     * @param context
     * @param fileConsentCardResponse
     */
    protected async onTeamsFileConsentDecline(context: TurnContext, fileConsentCardResponse: FileConsentCardResponse): Promise<void> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'actionableMessage/executeAction'
     */
    protected async onTeamsO365ConnectorCardAction(context: TurnContext, query: O365ConnectorCardActionQuery): Promise<void> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'signin/verifyState'
     * @param context
     * @param action
     */
    protected async onTeamsSigninVerifyState(context: TurnContext, query: SigninStateVerificationQuery): Promise<InvokeResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * 
     * @param context 
     * @param cardData 
     */
    protected async onTeamsMessagingExtensionCardButtonClicked(context: TurnContext, cardData: any): Promise<void> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'task/fetch'
     * @param context
     * @param taskModuleRequest
     */
    protected async onTeamsTaskModuleFetch(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleTaskInfo> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'task/submit'
     * @param context
     * @param taskModuleRequest
     */
    protected async onTeamsTaskModuleSubmit(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse | void> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with Activity name of 'composeExtension/queryLink'
     * @remarks
     * Used in creating a Search-based Message Extension.
     * @param context
     * @param query
     */
    protected async onTeamsAppBasedLinkQuery(context: TurnContext, query: AppBasedLinkQuery): Promise<MessagingExtensionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/query'.
     * @remarks
     * Used in creating a Search-based Message Extension.
     * @param context
     * @param action
     */
    protected async onTeamsMessagingExtensionQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/selectItem'.
     * @remarks
     * Used in creating a Search-based Message Extension.
     * @param context
     * @param action
     */
    protected async onTeamsMessagingExtensionSelectItem(context: TurnContext, query: any): Promise<MessagingExtensionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/submitAction' and is called before the next appropriate handler is called.
     * @remarks
     * A handler registered through this method does not dispatch to the next handler (either `onTeamsMessagingExtensionSubmitAction`, `onTeamsBotMessagePreviewEdit`, or `onTeamsBotMessagePreviewSend`).
     * This method exists for developers to optionally add more logic before the TeamsActivityHandler routes the activity to one of the
     * previously mentioned handlers.
     * @param context
     * @param action
     */
    protected async onTeamsMessagingExtensionSubmitActionDispatch(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        if (action.botMessagePreviewAction) {
            switch (action.botMessagePreviewAction) {
                case 'edit':
                    return await this.onTeamsBotMessagePreviewEdit(context, action);
                case 'send':
                    return await this.onTeamsBotMessagePreviewSend(context, action);
                default:
                    throw new Error('NotImplemented');
            }
        } else {
            return await this.onTeamsMessagingExtensionSubmitAction(context, action);
        }
    }

    /**
     * Receives invoke activities with the name 'composeExtension/submitAction'.
     * @remarks
     * This invoke activity is received when a user 
     * @param context
     * @param action
     */
    protected async onTeamsMessagingExtensionSubmitAction(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/submitAction' with the 'botMessagePreview' property present on activity.value.
     * The value for 'botMessagePreview' is 'edit'.
     * @remarks
     * This invoke activity is received when a user
     * @param context
     * @param action
     */
    protected async onTeamsBotMessagePreviewEdit(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/submitAction' with the 'botMessagePreview' property present on activity.value.
     * The value for 'botMessagePreview' is 'send'.
     * @remarks
     * This invoke activity is received when a user 
     * @param context
     * @param action
     */
    protected async onTeamsBotMessagePreviewSend(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/fetchTask'
     * @param context
     * @param action
     */
    protected async onTeamsMessagingExtensionFetchTask(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionActionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/querySettingUrl' 
     * @param context
     * @param query
     */
    protected async onTeamsMessagingExtensionConfigurationQuerySettingUrl(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResponse> {
        throw new Error('NotImplemented');
    }

    /**
     * Receives invoke activities with the name 'composeExtension/setting' 
     * @param context
     * @param query
     */
    protected onTeamsMessagingExtensionQuerySetting(context: TurnContext, settings: any): Promise<MessagingExtensionResponse> {
        throw new Error('NotImplemented');
    }

    protected static createInvokeResponse(body?: any): InvokeResponse {
        return { status: 200, body };
    }
}