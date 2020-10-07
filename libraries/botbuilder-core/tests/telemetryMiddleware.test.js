// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License

const { ok: assert, strictEqual } = require('assert');
const { ActivityTypes, Channels, TestAdapter, TelemetryLoggerMiddleware } = require('../');

class OverrideReceiveLogger extends TelemetryLoggerMiddleware {
    async onReceiveActivity(activity) {
        this.telemetryClient.trackEvent({
            name: TelemetryLoggerMiddleware.botMsgReceiveEvent,
            properties: {
                foo: 'bar',
                ImportantProperty: 'ImportantValue',
            },
        });
        this.telemetryClient.trackEvent({
            name: 'MyReceive',
            properties: await this.fillReceiveEventProperties(activity, { conversationName: 'OVERRIDE' }),
        });
    }
}

class OverrideSendLogger extends TelemetryLoggerMiddleware {
    async onSendActivity(activity) {
        this.telemetryClient.trackEvent({
            name: TelemetryLoggerMiddleware.botMsgSendEvent,
            properties: {
                foo: 'bar',
                ImportantProperty: 'ImportantValue',
            },
        });
        this.telemetryClient.trackEvent({
            name: 'MySend',
            properties: await this.fillSendEventProperties(activity),
        });
    }
}

class OverrideUpdateDeleteLogger extends TelemetryLoggerMiddleware {
    async onUpdateActivity() {
        this.telemetryClient.trackEvent({
            name: TelemetryLoggerMiddleware.botMsgUpdateEvent,
            properties: {
                foo: 'bar',
                ImportantProperty: 'ImportantValue',
            },
        });
    }
    async onDeleteActivity() {
        this.telemetryClient.trackEvent({
            name: TelemetryLoggerMiddleware.botMsgDeleteEvent,
            properties: {
                foo: 'bar',
                ImportantProperty: 'ImportantValue',
            },
        });
    }
}

function createReply(activity, text, locale = null) {
    return {
        type: ActivityTypes.Message,
        from: { id: activity.recipient.id, name: activity.recipient.name },
        recipient: { id: activity.from.id, name: activity.from.name },
        replyToId: activity.id,
        serviceUrl: activity.serviceUrl,
        channelId: activity.channelId,
        conversation: {
            isGroup: activity.conversation.isGroup,
            id: activity.conversation.id,
            name: activity.conversation.name,
        },
        text: text || '',
        locale: locale || activity.locale,
    };
}

describe(`TelemetryMiddleware`, function () {
    this.timeout(5000);
    it(`telemetry should log send and receive activities`, function (done) {
        var callCount = 0;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 1:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                            assert(telemetry.properties);
                            assert('fromId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert('fromName' in telemetry.properties);
                            assert('text' in telemetry.properties);
                            assert(telemetry.properties.text === 'foo');
                            break;

                        case 2:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            break;
                        case 3:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert(telemetry.properties.text === 'echo:foo');
                            break;
                        case 4:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                            assert(telemetry.properties);
                            assert('fromId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert('fromName' in telemetry.properties);
                            assert('text' in telemetry.properties);
                            assert(telemetry.properties.text === 'bar');
                            break;
                        case 5:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            break;
                        case 6:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert(telemetry.properties.text === 'echo:bar');
                            done();
                            break;
                        default:
                            assert(false);
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };
        let myLogger = new TelemetryLoggerMiddleware(telemetryClient, true);
        var adapter = new TestAdapter(async (context) => {
            var typingActivity = {
                type: ActivityTypes.Typing,
                relatesTo: context.activity.relatesTo,
            };
            await context.sendActivity(typingActivity);
            await context.sendActivity(`echo:${context.activity.text}`);
        }).use(myLogger);

        adapter
            .send('foo')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:foo')
            .send('bar')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:bar');
    });

    it(`telemetry null telemetryClient`, function (done) {
        let myLogger = new TelemetryLoggerMiddleware(null, true);
        var adapter = new TestAdapter(async (context) => {
            var typingActivity = {
                type: ActivityTypes.Typing,
                relatesTo: context.activity.relatesTo,
            };
            await context.sendActivity(typingActivity);
            await context.sendActivity(`echo:${context.activity.text}`);
        }).use(myLogger);

        adapter
            .send('foo')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:foo')
            .send('bar')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:bar')
            .then(done);
    });

    it(`telemetry should not log PII properties for send and receive activities`, function (done) {
        var callCount = 0;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 1:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                            assert(telemetry.properties);
                            assert('fromId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert(!('fromName' in telemetry.properties));
                            assert(!('text' in telemetry.properties));
                            break;

                        case 2:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert(!('recipientName' in telemetry.properties));
                            break;
                        case 3:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert(!('recipientName' in telemetry.properties));
                            assert(!('text' in telemetry.properties));
                            break;
                        case 4:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                            assert(telemetry.properties);
                            assert('fromId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert(!('fromName' in telemetry.properties));
                            assert(!('text' in telemetry.properties));
                            done();
                            break;
                        default:
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };
        let myLogger = new TelemetryLoggerMiddleware(telemetryClient, false);
        var adapter = new TestAdapter(async (context) => {
            var typingActivity = {
                type: ActivityTypes.Typing,
                relatesTo: context.activity.relatesTo,
            };
            await context.sendActivity(typingActivity);
            await context.sendActivity(`echo:${context.activity.text}`);
        }).use(myLogger);

        adapter
            .send('foo')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:foo')
            .send('bar')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:bar');
    });

    it(`telemetry should log update activities`, function (done) {
        var callCount = 0;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 4:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgUpdateEvent);
                            assert(telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('conversationId' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('text' in telemetry.properties);
                            assert(telemetry.properties.text === 'new response');
                            done();
                            break;
                        default:
                            //Everything passes through
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };
        let myLogger = new TelemetryLoggerMiddleware(telemetryClient, true);
        var adapter = new TestAdapter(async (context) => {
            let activityToUpdate = context.activity;
            if (context.activity.text === 'update') {
                activityToUpdate.text = 'new response';
                await context.updateActivity(activityToUpdate);
            } else {
                var activity = createReply(context.activity, 'response');
                const response = await context.sendActivity(activity);
                activity.id = response.id;

                // clone the activity, so we can use it to do an update
                activityToUpdate = JSON.parse(JSON.stringify(activity));
            }
        }).use(myLogger);

        adapter.send('foo').delay(100).send('update').delay(100);
    });

    it(`telemetry should log delete activities`, function (done) {
        var callCount = 0;
        var activityId = null;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 4:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgDeleteEvent);
                            assert(telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('conversationId' in telemetry.properties);
                            done();
                            break;
                        default:
                            //Everything passes through
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };

        let myLogger = new TelemetryLoggerMiddleware(telemetryClient, true);
        var adapter = new TestAdapter(async (context) => {
            if (context.activity.text === 'deleteIt') {
                await context.deleteActivity(activityId);
            } else {
                var activity = createReply(context.activity, 'response');
                var response = await context.sendActivity(activity);
                activityId = response.id;
            }
        }).use(myLogger);

        adapter.send('foo').assertReply('response').send('deleteIt').delay(500);
    });

    it(`telemetry override RECEIVE with custom derived logger class`, function (done) {
        var callCount = 0;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 1:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                            assert(telemetry.properties);
                            assert('foo' in telemetry.properties);
                            assert(telemetry.properties.foo === 'bar');
                            assert('ImportantProperty' in telemetry.properties);
                            assert(telemetry.properties.ImportantProperty === 'ImportantValue');
                            break;

                        case 2:
                            assert(telemetry.name === 'MyReceive');
                            assert(telemetry.properties);
                            assert('fromId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert(telemetry.properties.conversationName === 'OVERRIDE');
                            assert('locale' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert('fromName' in telemetry.properties);
                            assert('text' in telemetry.properties);
                            assert(telemetry.properties.text === 'foo');
                            break;

                        case 3:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            break;

                        case 4:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert(telemetry.properties.text === 'echo:foo');
                            done();
                            break;
                        default:
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };
        let myLogger = new OverrideReceiveLogger(telemetryClient, true);
        var adapter = new TestAdapter(async (context) => {
            var typingActivity = {
                type: ActivityTypes.Typing,
                relatesTo: context.activity.relatesTo,
            };
            await context.sendActivity(typingActivity);
            await context.sendActivity(`echo:${context.activity.text}`);
        }).use(myLogger);

        adapter
            .send('foo')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:foo')
            .send('bar')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:bar');
    });

    it(`telemetry override SEND with custom derived logger class`, function (done) {
        var callCount = 0;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 1:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                            assert(telemetry.properties);
                            assert('fromId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            assert('fromName' in telemetry.properties);
                            assert('text' in telemetry.properties);
                            assert(telemetry.properties.text === 'foo');
                            break;

                        case 2:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgSendEvent);
                            assert(telemetry.properties);
                            assert('foo' in telemetry.properties);
                            assert(telemetry.properties.foo === 'bar');
                            assert('ImportantProperty' in telemetry.properties);
                            assert(telemetry.properties.ImportantProperty === 'ImportantValue');
                            break;

                        case 3:
                            assert(telemetry.name === 'MySend');
                            assert(telemetry.properties);
                            assert('replyActivityId' in telemetry.properties);
                            assert('recipientId' in telemetry.properties);
                            assert('conversationName' in telemetry.properties);
                            assert('locale' in telemetry.properties);
                            assert('recipientName' in telemetry.properties);
                            done();
                            break;

                        default:
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };
        let myLogger = new OverrideSendLogger(telemetryClient, true);
        var adapter = new TestAdapter(async (context) => {
            var typingActivity = {
                type: ActivityTypes.Typing,
                relatesTo: context.activity.relatesTo,
            };
            await context.sendActivity(typingActivity);
            await context.sendActivity(`echo:${context.activity.text}`);
        }).use(myLogger);

        adapter
            .send('foo')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:foo')
            .send('bar')
            .assertReply((activity) => strictEqual(activity.type, ActivityTypes.Typing))
            .assertReply('echo:bar');
    });

    it(`telemetry override UPDATE with custom derived logger class`, function (done) {
        var callCount = 0;
        var telemetryClient = {
            trackEvent: (telemetry) => {
                try {
                    assert(telemetry, 'telemetry is null');
                    switch (++callCount) {
                        case 4:
                            assert(telemetry.name === TelemetryLoggerMiddleware.botMsgUpdateEvent);
                            assert(telemetry.properties);
                            assert('foo' in telemetry.properties);
                            assert(telemetry.properties.foo === 'bar');
                            assert('ImportantProperty' in telemetry.properties);
                            assert(telemetry.properties.ImportantProperty === 'ImportantValue');
                            done();
                            break;
                        default:
                            break;
                    }
                } catch (err) {
                    done(err);
                }
            },
        };
        let myLogger = new OverrideUpdateDeleteLogger(telemetryClient, true);
        var adapter = new TestAdapter(async (context) => {
            let activityToUpdate = context.activity;
            if (context.activity.text === 'update') {
                activityToUpdate.text = 'new response';
                await context.updateActivity(activityToUpdate);
            } else {
                var activity = createReply(context.activity, 'response');
                const response = await context.sendActivity(activity);
                activity.id = response.id;

                // clone the activity, so we can use it to do an update
                activityToUpdate = JSON.parse(JSON.stringify(activity));
            }
        }).use(myLogger);

        adapter.send('foo').delay(100).send('update').delay(100);
    });

    it(`telemetry should log channel specific properties`, function (done) {
        let callCount = 0;
        const telemetryClient = {
            trackEvent: (telemetry) => {
                switch (++callCount) {
                    case 1:
                        assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                        assert(telemetry.properties);
                        assert('TeamsTeamInfo' in telemetry.properties);
                        assert('TeamsTenantId' in telemetry.properties);
                        assert('TeamsUserAadObjectId' in telemetry.properties);
                        assert(telemetry.properties.TeamsTeamInfo === '{"id":"teamid"}');
                        assert(telemetry.properties.TeamsTenantId === 'tenantid');
                        assert(telemetry.properties.TeamsUserAadObjectId === 'aadObjectId');
                        break;
                    case 2:
                        assert(telemetry.name === TelemetryLoggerMiddleware.botMsgReceiveEvent);
                        assert(telemetry.properties);
                        assert('TeamsUserAadObjectId' in telemetry.properties);
                        assert(telemetry.properties.TeamsUserAadObjectId === 'aadObjectId');
                        break;
                    default:
                        break;
                }
            },
        };

        const myLogger = new TelemetryLoggerMiddleware(telemetryClient, true);

        const adapter = new TestAdapter(async () => {
            // No logic required for test.
        }).use(myLogger);

        const teamsChannelData = {
            teamsChannelId: 'teamsChannelId',
            teamsTeamId: 'teamid',
            channel: { id: 'channelid' },
            team: { id: 'teamid' },
            tenant: { id: 'tenantid' },
        };

        const activity = {
            type: ActivityTypes.Message,
            channelId: Channels.Msteams,
            text: 'test',
            channelData: teamsChannelData,
            from: { id: 'fromId', name: 'fromName', aadObjectId: 'aadObjectId' },
        };

        // Unit test for https://github.com/microsoft/botbuilder-js/issues/2781
        const noChannelData = Object.assign({ ...activity }, { channelData: undefined });

        adapter
            .send(activity)
            .send(noChannelData)
            .then(() => {
                strictEqual(callCount, 2);
                done();
            })
            .catch(done);
    });
});
