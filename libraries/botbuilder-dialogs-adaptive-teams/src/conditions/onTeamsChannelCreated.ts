/**
 * @module botbuilder-dialogs-adaptive-teams
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from 'adaptive-expressions';
import { Channels } from 'botbuilder';
import { Dialog, TurnPath } from 'botbuilder-dialogs';
import { OnConversationUpdateActivity } from 'botbuilder-dialogs-adaptive';

/**
 * Actions triggered when a Teams ConversationUpdateActivity with channelData.eventType == 'channelCreated'.
 * Note: turn.activity.channelData.Teams has team data.
 * @extends OnConversationUpdateActivity
 */
export class OnTeamsChannelCreated extends OnConversationUpdateActivity {
    public static $kind = 'Teams.OnChannelCreated';

    public constructor(actions?: Dialog[], condition?: string) {
        super(actions, condition);
    }

    protected createExpression(): Expression {
        // if teams channel and eventType == 'channelCreated'
        return Expression.andExpression(
            Expression.parse(
                `${TurnPath.activity}.channelId == '${Channels.Msteams}' && ${TurnPath.activity}.channelData.eventType == 'channelCreated'`
            ),
            super.createExpression()
        );
    }
}
