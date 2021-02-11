const { strictEqual, notStrictEqual } = require('assert');

const validateCodeIntent = (result) => {
    // intent assertions
    const intents = result.intents;
    strictEqual(Object.entries(intents).length, 1, 'should recognize one intent');
    strictEqual(Object.keys(intents)[0], 'codeIntent', 'should recognize codeIntent');

    // entity assertions from captured group
    const entities = result.entities;
    notStrictEqual(entities.code, undefined, 'should find code');
    strictEqual(entities.color, undefined, 'should not find color');
    strictEqual(Object.entries(entities.code).length, 2, 'should find 2 codes');
    strictEqual(entities.code[0], 'a1', 'should find a1');
    strictEqual(entities.code[1], 'b2', 'should find b2');
};

const validateColorIntent = (result) => {
    // intent assertions
    const intents = result.intents;
    strictEqual(Object.entries(intents).length, 1, 'should recognize one intent');
    strictEqual(Object.keys(intents)[0], 'colorIntent', 'should recognize colorIntent');

    // entity assertions from captured group
    const entities = result.entities;
    notStrictEqual(entities.color, undefined, 'should find color');
    strictEqual(entities.code, undefined, 'should not find code');
    strictEqual(Object.entries(entities.color).length, 2, 'should find 2 colors');
    strictEqual(entities.color[0], 'red', 'should find red');
    strictEqual(entities.color[1], 'orange', 'should find orange');
};

const validateGreetingIntent = (result) => {
    const intentNames = Object.keys(result.intents);
    strictEqual(intentNames.length, 1);
    strictEqual(intentNames[0], 'greeting');
}

const validateChooseIntent = (result) => {
    const intentNames = Object.keys(result.intents);
    strictEqual(intentNames.length, 1);
    strictEqual(intentNames[0], 'ChooseIntent');
}

module.exports = {
    validateCodeIntent,
    validateColorIntent,
    validateChooseIntent,
    validateGreetingIntent
};
