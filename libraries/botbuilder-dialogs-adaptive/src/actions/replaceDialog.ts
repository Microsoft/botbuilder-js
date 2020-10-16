/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { BoolExpression, BoolExpressionConverter, Expression } from 'adaptive-expressions';
import { Converter, ConverterFactory, DialogContext, DialogTurnResult, TurnPath } from 'botbuilder-dialogs';
import { BaseInvokeDialog, BaseInvokeDialogConfiguration } from './baseInvokeDialog';

export interface ReplaceDialogConfiguration extends BaseInvokeDialogConfiguration {
    disabled?: boolean | string | Expression | BoolExpression;
}

export class ReplaceDialog<O extends object = {}> extends BaseInvokeDialog<O> implements ReplaceDialogConfiguration {
    public static $kind = 'Microsoft.ReplaceDialog';

    /**
     * Creates a new `ReplaceWithDialog` instance.
     * @param dialogId ID of the dialog to goto.
     * @param options (Optional) static options to pass the dialog.
     */
    public constructor();
    public constructor(dialogIdToCall: string, options?: O);
    public constructor(dialogIdToCall?: string, options?: O) {
        super(dialogIdToCall, options);
    }

    /**
     * An optional expression which if is true will disable this action.
     */
    public disabled?: BoolExpression;

    public getConverter(property: keyof ReplaceDialogConfiguration): Converter | ConverterFactory {
        switch (property) {
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

        const dialog = this.resolveDialog(dc);
        const boundOptions = this.bindOptions(dc, options);

        // set the activity processed state (default is true)
        dc.state.setValue(TurnPath.activityProcessed, this.activityProcessed.getValue(dc.state));

        return await dc.replaceDialog(dialog.id, boundOptions);
    }
}
