/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'mocha';
import { TestRunner } from './testing';

describe('RecognizerSet', function() {
    this.timeout(5000);
    const testRunner = new TestRunner('resources/recognizerSetTests');

    it('Merge', async () => {
        await testRunner.runTestScript('RecognizerSetTests_Merge');
    });

    it('None', async () => {
        await testRunner.runTestScript('RecognizerSetTests_None');
    });
});
