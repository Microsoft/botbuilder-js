/**
 * @module botbuilder-dialogs-adaptive-teams
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression, ExpressionParserInterface } from 'adaptive-expressions';
import { Channels } from 'botbuilder';
import { TurnPath } from 'botbuilder-dialogs';
import { OnInvokeActivity } from 'botbuilder-dialogs-adaptive';

/**
 * Actions triggered when a Teams InvokeActivity is received when activity.name='composeExtension/fetchTask'.
 */
export class OnTeamsMessagingExtensionFetchTask extends OnInvokeActivity {
    public static readonly $kind = 'Teams.OnMessagingExtensionFetchTask';

    public getExpression(parser: ExpressionParserInterface): Expression {
        return Expression.andExpression(
            Expression.parse(
                `${TurnPath.activity}.channelId == '${Channels.Msteams}' && ${TurnPath.activity}.name == 'composeExtension/fetchTask'`
            ),
            super.getExpression(parser)
        );
    }
}
