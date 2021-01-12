// Licensed under the MIT License.
// Copyright (c) Microsoft Corporation. All rights reserved.

import 'mocha';
import {
    ComponentRegistration,
    ConversationState,
    TestAdapter,
    useBotState,
    MemoryStorage,
    UserState,
    Channels,
    ConversationReference,
    ChannelAccount,
    ConversationAccount,
} from 'botbuilder';
import { ResourceExplorer } from 'botbuilder-dialogs-declarative';
import { TeamsComponentRegistration } from '../../lib';
import { AdaptiveTestComponentRegistration, TestUtils } from 'botbuilder-dialogs-adaptive-testing';
import { AdaptiveComponentRegistration } from 'botbuilder-dialogs-adaptive';
import { ConnectorClient, MicrosoftAppCredentials } from 'botframework-connector';
import { ok } from 'assert';
import path = require('path');
import nock = require('nock');

// TODO: Write tests that catch all errors for each action.

/**
 * A NOTE ON HOW THE test.dialog FILES WORK
 *
 * Many of them use `Microsoft.TraceActivity` instead of `Microsoft.SendActivity` because at the time of this writing,
 * there is no way to send an object from memory (e.g. $result) without it being formatted to text using SendActivity.
 * In order to use `Microsoft.TraceActivity` like this, the test.dialog must also have the `enableTrace` property set to true.
 */

/**
 * Registers mocha hooks for proper usage
 * TODO: Import function from testing/botbuilder-test-utils after PR merged:
 * https://github.com/microsoft/botbuilder-js/pull/3138
 */
export function mocha(): void {
    before(() => nock.disableNetConnect());
    beforeEach(() => nock.cleanAll());
    after(() => nock.enableNetConnect());
    afterEach(() => nock.cleanAll());
}

const getTeamsTestAdapter = (convo?: ConversationReference): TestAdapter => {
    const adapter = new TestAdapter(convo);
    // This is required because TeamsInfo checks that the adapter has a createConnectorClient method
    // and TestAdapter doesn't have one, natively.
    adapter.createConnectorClient = () => {
        return new ConnectorClient(new MicrosoftAppCredentials('', ''));
    };

    // DialogManager requires conversationState and it's required for the tests so that we can store
    // the nock response in user.participant, send it back as part of the test script, and AssertReply
    // that we got the correct response
    const storage = new MemoryStorage();
    const userState = new UserState(storage);
    const conversationState = new ConversationState(storage);
    useBotState(adapter, userState, conversationState);

    return adapter;
};

const getTeamsUser = (): ChannelAccount => {
    return {
        id: '29:User-Id',
        name: 'User Name',
        aadObjectId: 'participant-aad-id',
    };
};

const getPersonalConversation = (): ConversationAccount => {
    return {
        id: 'a:oneOnOneConversationId',
        name: 'oneOnOne',
        tenantId: 'tenantId-Guid',
        conversationType: 'personal',
        isGroup: false,
    };
};

const getGroupConversation = (): ConversationAccount => {
    return {
        id: '19:groupChatId@thread.v2',
        name: 'group',
        tenantId: 'tenantId-Guid',
        conversationType: 'groupChat',
        isGroup: true,
    };
};

const getPersonalConversationReference = (): ConversationReference => {
    return <ConversationReference>{
        user: getTeamsUser(),
        channelId: Channels.Msteams,
        conversation: getPersonalConversation(),
    };
};

const getGroupConversationReference = (): ConversationReference => {
    return <ConversationReference>{
        user: getTeamsUser(),
        channelId: Channels.Msteams,
        conversation: getGroupConversation(),
    };
};

const generateTeamMembers = (amount: number): Record<string, unknown>[] => {
    const members = [];
    for (let i = 0; i < amount; i++) {
        members.push({
            id: `${getTeamsUser().id}-${i}`,
            name: `${getTeamsUser.name}-${i}`,
            objectId: `User-${i}-Object-Id`,
            givenName: 'User',
            surname: i,
            email: `User.${i}@microsoft.com`,
            userPrincipalName: `user${i}@microsoft.com`,
            tenantId: 'tenant-id-1',
        });
    }

    return members;
};

describe('Actions', function () {
    ComponentRegistration.add(new AdaptiveTestComponentRegistration());
    ComponentRegistration.add(new AdaptiveComponentRegistration());
    ComponentRegistration.add(new TeamsComponentRegistration());

    const resourceExplorer = new ResourceExplorer().addFolder(
        path.join(__dirname, '../../tests/tests/actionTests'),
        true,
        false
    );

    /**
     * Note: With mocha, `this.test.title` refers to the test's name, so runTestScript
     * is just calling a file with the same name as the test.
     */
    it('Action_GetMeetingParticipant', async function () {
        const conversationReference = getPersonalConversationReference();
        const participant = {
            user: {
                userPrincipalName: 'userPrincipalName-1',
            },
            meeting: {
                role: 'Organizer',
            },
            conversation: conversationReference.conversation,
        };

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v1/meetings/meeting-id-1/participants/participant-aad-id?tenantId=tenant-id-1')
            .reply(200, participant);

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetMeetingParticipantError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_GetMember', async function () {
        const conversationReference = getPersonalConversationReference();
        const members = generateTeamMembers(1);

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v3/conversations/a%3AoneOnOneConversationId/members/29%3AUser-Id')
            .reply(200, members);

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetMemberError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_GetPagedMembers', async function () {
        const conversationReference = getGroupConversationReference();
        const members = generateTeamMembers(3);

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v3/conversations/19%3AgroupChatId%40thread.v2/pagedmembers')
            .reply(200, { continuationToken: 'token', members });

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetPagedMembersError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_GetPagedTeamMembers', async function () {
        const conversationReference = getGroupConversationReference();
        const members = generateTeamMembers(3);

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v3/conversations/team-id-1/pagedmembers')
            .reply(200, { continuationToken: 'token', members });

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetPagedTeamMembersError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_GetTeamChannels', async function () {
        const conversationReference = getGroupConversationReference();
        const conversations = [
            {
                id: '19:ChannelIdgeneralChannelId@thread.skype',
                name: 'Testing0',
            },
            {
                id: '19:somechannelId2e5ab3df9ae9b594bdb@thread.skype',
                name: 'Testing1',
            },
            {
                id: '19:somechannelId388ade16aa4dd375e69@thread.skype',
                name: 'Testing2',
            },
        ];

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v3/teams/team-id-1/conversations')
            .reply(200, { conversations });

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetTeamChannelsError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_GetTeamDetails', async function () {
        const conversationReference = getGroupConversationReference();
        const teamDetails = {
            id: '19:generalChannelIdgeneralChannelId@thread.skype',
            name: 'TeamName',
            aadGroupId: 'Team-aadGroupId',
        };

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v3/teams/team-id-1')
            .reply(200, teamDetails);

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetTeamDetailsError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_GetTeamMember', async function () {
        const conversationReference = getGroupConversationReference();
        const members = generateTeamMembers(1);

        const fetchExpectation = nock('https://api.botframework.com')
            .get('/v3/conversations/team-id-1/members/29%3AUser-Id')
            .reply(200, members[0]);

        const adapter = getTeamsTestAdapter(conversationReference);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_GetTeamMemberError', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    // TODO: Error tests for all below
    it('Action_SendAppBasedLinkQueryResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendMessageToTeamsChannel', async function () {
        const conversationReference = getGroupConversationReference();
        const adapter = getTeamsTestAdapter(conversationReference);

        const fetchExpectation = nock('https://api.botframework.com').post('/v3/conversations').reply(200);

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);

        ok(fetchExpectation.isDone());
    });

    it('Action_SendMessagingExtensionActionResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendMessagingExtensionAttachmentsResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendMessagingExtensionAuthResponse', async function () {
        const adapter = getTeamsTestAdapter();
        adapter.addUserToken('test connection', 'test', 'user1', 'token');

        await TestUtils.runTestScript(resourceExplorer, this.test.title, adapter);
    });

    it('Action_SendMessagingExtensionBotMessagePreviewResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendMessagingExtensionConfigQuerySettingUrlResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendMessagingExtensionMessageResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendMessagingExtensionSelectItemResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendTaskModuleCardResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendTaskModuleMessageResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });

    it('Action_SendTaskModuleUrlResponse', async function () {
        await TestUtils.runTestScript(resourceExplorer, this.test.title);
    });
});
