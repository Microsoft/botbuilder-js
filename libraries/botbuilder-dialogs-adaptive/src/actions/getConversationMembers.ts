/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Dialog, DialogContext, DialogTurnResult } from 'botbuilder-dialogs';
import { StringExpression, BoolExpression } from 'adaptive-expressions';
import { TurnContext } from 'botbuilder-core';

interface CompatibleAdapter {
    getConversationMembers(context: TurnContext);
}

function isCompatibleAdapter(adapter: unknown): adapter is CompatibleAdapter {
    return adapter && typeof (adapter as CompatibleAdapter).getConversationMembers === 'function';
}

/**
 * Calls `BotFrameworkAdapter.getConversationMembers()` and sets the result to a memory property.
 */
export class GetConversationMembers<O extends object = {}> extends Dialog<O> {
    public constructor();

    /**
     * Initializes a new instance of the [GetConversationMembers](xref:botbuilder-dialogs-adaptive.GetConversationMembers) class.
     * @param property Property path to put the value in.
     */
    public constructor(property?: string) {
        super();
        if (property) {
            this.property = new StringExpression(property);
        }
    }

    /**
     * Property path to put the value in.
     */
    public property: StringExpression;

    /**
     * An optional expression which if is true will disable this action.
     */
    public disabled?: BoolExpression;

    /**
     * Starts a new dialog and pushes it onto the dialog stack.
     * @param dc The [DialogContext](xref:botbuilder-dialogs.DialogContext) for the current turn of conversation.
     * @param options Optional. Initial information to pass to the dialog.
     * @returns A `Promise` representing the asynchronous operation.
     */
    public async beginDialog(dc: DialogContext, options?: O): Promise<DialogTurnResult> {
        if (this.disabled && this.disabled.getValue(dc.state)) {
            return await dc.endDialog();
        }

        const adapter = dc.context.adapter;
        if (isCompatibleAdapter(adapter)) {
            const result = await adapter.getConversationMembers(dc.context);
            dc.state.setValue(this.property.getValue(dc.state), result);
            return await dc.endDialog(result);
        } else {
            throw new Error('getConversationMembers() not supported by the current adapter.');
        }
    }

    /**
     * @protected
     * Builds the compute Id for the dialog.
     * @returns A `string` representing the compute Id.
     */
    protected onComputeId(): string {
        return `GetConversationMembers[${this.property.toString()}]`;
    }
}
