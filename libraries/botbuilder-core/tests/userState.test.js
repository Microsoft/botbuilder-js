const assert = require('assert');
const { TurnContext, UserState, MemoryStorage, TestAdapter } = require('../');

const receivedMessage = { text: 'received', type: 'message', channelId: 'test', from: { id: 'user' } };
const missingChannelId = { text: 'received', type: 'message', from: { id: 'user' } };
const missingFrom = { text: 'received', type: 'message', channelId: 'test' };

describe(`UserState`, function () {
    this.timeout(5000);

    const storage = new MemoryStorage();
    const adapter = new TestAdapter();
    const context = new TurnContext(adapter, receivedMessage);
    const userState = new UserState(storage);
    it(`should load and save state from storage.`, function (done) {
        let key;
        userState.onTurn(context, () => {
            key = userState.getStorageKey(context);
            const state = userState.get(context);
            assert(state, `State not loaded`);
            assert(key, `Key not found`);
            state.test = 'foo';
        })
        .then(() => storage.read([key]))
        .then((items) => {
            assert(items.hasOwnProperty(key), `Saved state not found in storage.`);
            assert(items[key].test === 'foo', `Missing test value in stored state.`);
            done();
        });
    });

    it(`should reject with error if channelId missing.`, async function () {
        const ctx = new TurnContext(adapter, missingChannelId);
        try {
            await userState.onTurn(ctx, () => assert(false, `shouldn't have called next.`));
            assert(false, `shouldn't have completed.`);
        } catch (err) {
            assert(err, `error object missing.`);
            assert.equal(err.message, "missing activity.channelId");
        }
    });

    it(`should reject with error if from missing.`, async function () {
        const ctx = new TurnContext(adapter, missingFrom);
        try {
            await userState.onTurn(ctx, () => assert(false, `shouldn't have called next.`));
            assert(false, `shouldn't have completed.`);
        } catch (err) {
            assert(err, `error object missing.`);
            assert.equal(err.message, "missing activity.from.id");
        }
    });

    it(`should throw install exception if get() called without a cached entry.`, function (done) {
        context.turnState.set('userState', undefined);
        try {
            UserState.get(context);
            assert(false, `exception not thrown.`);
        } catch (err) {
            done();
        }
    });
});
