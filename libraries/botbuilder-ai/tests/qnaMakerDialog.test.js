const { QnAMakerDialog, QnAMaker } = require('../lib');
const { Dialog, DialogSet, DialogTurnStatus, DialogManager } = require('botbuilder-dialogs');
const { ok, strictEqual } = require('assert');
const { ConversationState, MemoryStorage, TestAdapter } = require('botbuilder-core');
const fs = require('fs');
const nock = require('nock');

const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

const KB_ID = process.env.QNAKNOWLEDGEBASEID;
const ENDPOINT_KEY = process.env.QNAENDPOINTKEY;
const HOSTNAME = process.env.QNAHOSTNAME || 'test-qna-app';
const isMockQna = false || !(KB_ID && ENDPOINT_KEY);

const beginMessage = { text: `begin`, type: 'message' };



describe('QnAMakerDialog', function() {
    // this.timeout(3000);
    this.timeout(120000);
    const testFiles = fs.readdirSync(`${ __dirname }/TestData/${ this.title }/`);

    beforeEach(function(done){
        nock.cleanAll();
        if (isMockQna) {
            var fileName = replaceCharacters(this.currentTest.title);
            var filePath = `${ __dirname }/TestData/${ this.test.parent.title }/`;
            var arr = testFiles.filter(function(file) { return file.startsWith(fileName + '.')} );
    
            arr.forEach(file => {
                nock(`https://${ HOSTNAME }.azurewebsites.net`)
                    .matchHeader('User-Agent', /botbuilder-ai\/4.*/)
                    .post(/qnamaker/)
                    .replyWithFile(200, filePath + file);
            });
        }
        done();
    })
    
    afterEach(function(done){
        nock.cleanAll();
        done();
    });
    
    function replaceCharacters (testName, testDesc) {
        return testName
        .replace(/"/g, '')
        .replace(/ /g, '_');
    }

    it('should successfully construct', () => {
        new QnAMakerDialog('kbId', 'endpointKey', 'https://myqnainstance.azurewebsites.net/qnamaker');
    });

    it('should add instance to a dialog set', () => {
        const dialogs = new DialogSet();
        const qna = new QnAMakerDialog('kbId', 'endpointKey', 'https://myqnainstance.azurewebsites.net/qnamaker');

        dialogs.add(qna);
    });

    describe('getQnAClient()', () => {
        const kbId = 'dummyKbId';
        const endpointKey = 'dummyEndpointKey';

        it('should return unmodified v5 hostName value', async () => {
            const V5_HOSTNAME = 'https://qnamaker-acom.azure.com/qnamaker/v5.0';
    
            // Create QnAMakerDialog
            const qna = new QnAMakerDialog(kbId, endpointKey, V5_HOSTNAME);
            const client = await qna.getQnAClient({state: {}});
    
            ok(client instanceof QnAMaker);
            strictEqual(client.endpoint.knowledgeBaseId,  kbId);
            strictEqual(client.endpoint.endpointKey, endpointKey);
            strictEqual(client.endpoint.host, V5_HOSTNAME);
        });
    
        it('should construct v4 API endpoint', async () => {
            const INCOMPLETE_HOSTNAME = 'myqnainstance';
            const HOSTNAME = 'https://myqnainstance.azurewebsites.net/qnamaker';
    
            // Create QnAMakerDialog with incomplete hostname
            const qnaDialog = new QnAMakerDialog(kbId, endpointKey, INCOMPLETE_HOSTNAME);
            const fixedClient = await qnaDialog.getQnAClient({state: {}});
    
            ok(fixedClient instanceof QnAMaker);
            strictEqual(fixedClient.endpoint.knowledgeBaseId, kbId);
            strictEqual(fixedClient.endpoint.endpointKey, endpointKey);
            strictEqual(fixedClient.endpoint.host, HOSTNAME);
        });
    
        it('should construct BAD v4 hostnames', async () => {
            const createHostName = (hostName) => `https://${ hostName }.azurewebsites.net/qnamaker`;
            const NOT_V5_HOSTNAME = 'myqnainstance.net/qnamaker';
    
            // Missing authority
            const noAuthority = new QnAMakerDialog(kbId, endpointKey, NOT_V5_HOSTNAME);
            const noAuthorityClient = await noAuthority.getQnAClient({state: {}});
    
            ok(noAuthorityClient instanceof QnAMaker);
            strictEqual(noAuthorityClient.endpoint.knowledgeBaseId,  kbId);
            strictEqual(noAuthorityClient.endpoint.endpointKey, endpointKey);
            strictEqual(noAuthorityClient.endpoint.host, createHostName(NOT_V5_HOSTNAME));
        });
        
        it('should log telemetry that includes question and username if logPersonalInformation is true in env file', async () => {
            const convoState = new ConversationState(new MemoryStorage());
            // Use DialogManager to set up scopes, including `settings` scope
            // to be able to grab logPersonalInformation value from .env
            const dm = new DialogManager();
            dm.conversationState = convoState;
            
            const qnaDialog = new QnAMakerDialog(kbId, endpointKey, HOSTNAME);
            qnaDialog.steps.unshift(async (step) => {
                ok(step);
                const qnaClient = await qnaDialog.getQnAClient(step);

                ok(qnaClient instanceof QnAMaker);
                ok(qnaClient.telemetryClient);
                strictEqual(qnaClient.telemetryClient.isCustomTelemtryClient, true);
                
                // Note: not using strictEqual for logPii, due to adaptive-expression bug,
                // where BoolExpression resolve to string 'true' instead of boolean.
                ok(qnaClient.logPersonalInformation);
                strictEqual(qnaClient.endpoint.knowledgeBaseId, kbId);
                strictEqual(qnaClient.endpoint.endpointKey, endpointKey);
                strictEqual(qnaClient.endpoint.host, `https://${HOSTNAME}.azurewebsites.net/qnamaker`);
                
                return Dialog.EndOfTurn;
            });

            let qnaMessageCount = 0;
            qnaDialog.telemetryClient = {
                isCustomTelemtryClient: true,
                trackEvent: (telemetry) => {
                    const telemetryProperties = telemetry.properties;
                    // First QnaMessage event has QnA service's response
                    // to user's first message to QnAMakerDialog
                    if (telemetry.name === 'QnaMessage' && qnaMessageCount === 0)
                    {
                        ok(telemetryProperties);
                        ok('question' in telemetryProperties);
                        strictEqual(telemetryProperties.question, 'hi')
                        ok('username' in telemetryProperties);
                        strictEqual(telemetryProperties.username, 'User1');
                        ok('answer' in telemetryProperties);
                        ok('articleFound' in telemetryProperties);
                        strictEqual(telemetryProperties.articleFound, 'true');
                        ok('knowledgeBaseId' in telemetryProperties);
                        ok('questionId' in telemetryProperties);
                        ok('score' in telemetry.metrics);
                        
                        qnaMessageCount++;
                    }
                },
                trackPageView: () => { 
                    // noop
                },
                trackTrace: () => {
                    // noop
                }
            }
            dm.rootDialog = qnaDialog;

            const adapter = new TestAdapter(async (turnContext) => {
               const { turnResult } = await dm.onTurn(turnContext);

               if (turnResult.status === DialogTurnStatus.complete) {
                   strictEqual(turnResult.result[0].answer, 'Welcome to the **Smart lightbulb** bot.');
               }
            });

            await adapter.send(beginMessage);
            await adapter.send('hi')
                    .assertReply('Welcome to the **Smart lightbulb** bot.');
            strictEqual(qnaMessageCount, 1);
        });
    
        it('should log telemetry that excludes question and username if logPersonalInformation is false', async () => {
            const convoState = new ConversationState(new MemoryStorage());
            // Use DialogManager to set up scopes, including `settings` scope
            // to be able to grab logPersonalInformation value from .env
            const dm = new DialogManager();
            dm.conversationState = convoState;
            
            const qnaDialog = new QnAMakerDialog(kbId, endpointKey, HOSTNAME);
            qnaDialog.logPersonalInformation = false;

            qnaDialog.steps.unshift(async (step) => {
                ok(step);
                const qnaClient = await qnaDialog.getQnAClient(step);

                ok(qnaClient instanceof QnAMaker);
                ok(qnaClient.telemetryClient);
                strictEqual(qnaClient.telemetryClient.isCustomTelemtryClient, true);
                
                // Note: not using strictEqual here for logPii, due to adaptive-expression bug,
                // where BoolExpression resolve to string 'true' instead of boolean.
                strictEqual(qnaClient.logPersonalInformation, false);
                strictEqual(qnaClient.endpoint.knowledgeBaseId, kbId);
                strictEqual(qnaClient.endpoint.endpointKey, endpointKey);
                strictEqual(qnaClient.endpoint.host, `https://${HOSTNAME}.azurewebsites.net/qnamaker`);
                
                return Dialog.EndOfTurn;
            });

            let qnaMessageCount = 0;
            qnaDialog.telemetryClient = {
                isCustomTelemtryClient: true,
                trackEvent: (telemetry) => {
                    const telemetryProperties = telemetry.properties;
                    // First QnaMessage event has QnA service's response
                    // to user's first message to QnAMakerDialog
                    if (telemetry.name === 'QnaMessage' && qnaMessageCount === 0)
                    {
                        ok(telemetryProperties);
                        strictEqual('question' in telemetryProperties, false);
                        strictEqual('username' in telemetryProperties, false);
                        ok('answer' in telemetryProperties);
                        ok('articleFound' in telemetryProperties);
                        strictEqual(telemetryProperties.articleFound, 'true');
                        ok('knowledgeBaseId' in telemetryProperties);
                        ok('questionId' in telemetryProperties);
                        ok('score' in telemetry.metrics);
                        
                        qnaMessageCount++;
                    }
                },
                trackPageView: () => { 
                    // noop
                },
                trackTrace: () => {
                    // noop
                }
            }
            dm.rootDialog = qnaDialog;

            const adapter = new TestAdapter(async (turnContext) => {
                const { turnResult } = await dm.onTurn(turnContext);

                if (turnResult.status === DialogTurnStatus.complete) {
                    strictEqual(turnResult.result[0].answer, 'Welcome to the **Smart lightbulb** bot.');
                }
            });

            await adapter.send(beginMessage);
            await adapter.send('hi')
                    .assertReply('Welcome to the **Smart lightbulb** bot.');
            strictEqual(qnaMessageCount, 1);
        });
    });
});
