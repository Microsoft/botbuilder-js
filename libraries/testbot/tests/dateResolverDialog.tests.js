/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { DialogTestClient, DialogTestLogger } = require('botbuilder-testing');
const { DateResolverDialog } = require('../dialogs/dateResolverDialog');
const assert = require('assert');

describe('dateResolverDialog', function() {
   
    it('should create a DialogTestClient', async function() {
        let client = new DialogTestClient();
        assert(client instanceof DialogTestClient, 'Created an invalid object');
    });

    let tests = require('./testData/dateResolverTestCases.js');

    let dialog = new DateResolverDialog('dateResolver');

    for (let t = 0; t < tests.length; t++) {
        let test = tests[t];
        it(test.name, async function() {
            console.log(`Test Case: ${ test.name }`);
            console.log(`Dialog Input ${ JSON.stringify(test.initialData) }`);
            let client = new DialogTestClient(dialog, test.initialData, [new DialogTestLogger()]);

            for (let i = 0; i < test.steps.length; i++) {
                let reply = await client.sendActivity(test.steps[i][0]);
                assert(reply ? reply.text : null == test.steps[i][1],`${ reply ? reply.text : null } != ${ test.steps[i][1] }`);
            }
            console.log(`Dialog result: ${ client.dialogTurnResult.result }`);
            if (test.expectedResult !== undefined) {
                assert(test.expectedResult == client.dialogTurnResult.result, `${ test.expectedResult } != ${ client.dialogTurnResult.result }`);
            }
        });
    }


});
