/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DialogTurnResult, Dialog, DialogContext } from 'botbuilder-dialogs';
import { ActionScopeResult, ActionScopeCommands } from './actionScope';

export class ContinueLoop extends Dialog {

    protected onComputeId(): string {
        return `ContinueLoop[]`;
    }

    public async beginDialog(dc: DialogContext): Promise<DialogTurnResult> {
        const command: ActionScopeResult = {
            actionScopeCommand: ActionScopeCommands.continue
        }
        return dc.endDialog(command);
    }
}