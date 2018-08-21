const { ConversationState, MemoryStorage, TestAdapter, TurnContext } = require('botbuilder-core');
const { Dialog, DialogSet, WaterfallDialog } =  require('../');
const assert = require('assert');

const beginMessage = { text: `begin`, type: 'message' };
const continueMessage = { text: `continue`, type: 'message' };

describe('DialogSet', function() {
    this.timeout(5000);

    it('should add a waterfall to the dialog set.', function (done) {
        // Create new ConversationState with MemoryStorage and instantiate DialogSet with PropertyAccessor.
        const convoState = new ConversationState(new MemoryStorage());
        
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        dialogs.add(new WaterfallDialog('a', [
            function (dc) {
                assert(dc);
            }
        ]));
        done();
    });

    it('should throw an exception when trying to add the same dialog twice.', function (done) {
        const convoState = new ConversationState(new MemoryStorage());
        
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        dialogs.add(new WaterfallDialog('a', [
            function (dc) { }
        ]));

        try {
            dialogs.add('a', [
                function (dc) { }
            ]);
        } catch(err) {
            return done();
        }
        throw new Error('Should have thrown an error on adding dialogs with same ID.');
    });

    it('should find() a dialog that was added.', function (done) {
        const convoState = new ConversationState(new MemoryStorage());
        
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        dialogs.add(new WaterfallDialog('a', [
            function (dc) { }
        ]));

        assert(dialogs.find('a'), `dialog not found.`);
        assert(!dialogs.find('b'), `dialog found that shouldn't exist.`);
        done();
    });

    it('should save dialog stack state between turns.', function (done) {
        const adapter = new TestAdapter(async (turnContext) => {
            const dc = await dialogs.createContext(turnContext);

            const results = await dc.continue();
            if (!turnContext.responded && !results.hasActive && !results.hasResult) {
                await dc.begin('a');
            }
        });

        const convoState = new ConversationState(new MemoryStorage());
        adapter.use(convoState);
        
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        dialogs.add(new WaterfallDialog('a', [
            async function (dc, step) {
                assert(dc);
                assert(step);
                await dc.context.sendActivity(`Greetings`);
                return Dialog.EndOfTurn;
            },
            async function (dc, step) {
                assert(dc);
                await dc.context.sendActivity('Good bye!');
                return await dc.end();
            }
        ]));

        adapter.send(beginMessage)
        .assertReply('Greetings')
        .send(continueMessage)
        .assertReply('Good bye!')
        done();
    });
});
