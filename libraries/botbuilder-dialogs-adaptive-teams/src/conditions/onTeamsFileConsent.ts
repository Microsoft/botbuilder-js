/**
 * @module botbuilder-dialogs-adaptive-teams
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression, ExpressionParserInterface } from 'adaptive-expressions';
import { Channels } from 'botbuilder';
import { Dialog, TurnPath } from 'botbuilder-dialogs';
import { OnInvokeActivity } from 'botbuilder-dialogs-adaptive';

/**
 * Actions triggered when a Teams InvokeActivity is received with activity.name == 'fileConsent/invoke'.
 */
export class OnTeamsFileConsent extends OnInvokeActivity {
    public static $kind = 'Teams.OnFileConsent';

    public constructor(actions?: Dialog[], condition?: string) {
        super(actions, condition);
    }

    public getExpression(parser: ExpressionParserInterface): Expression {
        // if name is 'fileConsent/invoke'
        return Expression.andExpression(
            Expression.parse(
                `${TurnPath.activity}.channelId == '${Channels.Msteams}' && ${TurnPath.activity}.name == 'fileConsent/invoke'`
            ),
            super.getExpression(parser)
        );
    }
}
