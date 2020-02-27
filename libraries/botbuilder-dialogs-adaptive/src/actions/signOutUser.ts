/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Configurable, Dialog, DialogContext, DialogTurnResult, DialogConfiguration } from 'botbuilder-dialogs';
import { StringExpression, BoolExpression } from '../expressionProperties';

export interface SignOutUserConfiguration extends DialogConfiguration {
    userId?: string;
    connectionName?: string;
    disabled?: string | boolean;
}

export class SignOutUser<O extends object = {}> extends Dialog<O> implements Configurable {
    public static declarativeType = 'Microsoft.SignOutUser';

    public constructor();
    public constructor(userId?: string, connectionName?: string) {
        super();
        if (userId) { this.userId = new StringExpression(userId); }
        if (connectionName) { this.connectionName = new StringExpression(connectionName); }
    }

    /**
     * The expression which resolves to the userId to sign out.
     */
    public userId: StringExpression;

    /**
     * The name of the OAuth connection.
     */
    public connectionName: StringExpression;

    /**
     * An optional expression which if is true will disable this action.
     */
    public disabled?: BoolExpression;

    public configure(config: SignOutUserConfiguration): this {
        for (const key in config) {
            if (config.hasOwnProperty(key)) {
                const value = config[key];
                switch (key) {
                    case 'userId':
                        this.userId = new StringExpression(value);
                        break;
                    case 'connectionName':
                        this.connectionName = new StringExpression(value);
                        break;
                    case 'disabled':
                        this.disabled = new BoolExpression(value);
                        break;
                    default:
                        super.configure({ [key]: value });
                        break;
                }
            }
        }

        return this;
    }

    public async beginDialog(dc: DialogContext, options?: O): Promise<DialogTurnResult> {
        if (this.disabled && this.disabled.getValue(dc.state)) {
            return await dc.endDialog();
        }

        const userId: string = this.userId.getValue(dc.state);
        const connectionName: string = this.connectionName.getValue(dc.state);

        const adapter = dc.context.adapter;
        if (typeof adapter['signOutUser'] === 'function') {
            await adapter['signOutUser'](dc.context, connectionName, userId);
            return await dc.endDialog();
        } else {
            throw new Error('signOutUser() not supported by the current adapter.');
        }
    }

    protected onComputeId(): string {
        return `SignOutUser[${ this.connectionName.toString() }, ${ this.userId.toString() }]`;
    }
}