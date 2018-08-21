const { ConversationState, MemoryStorage, TestAdapter } = require('botbuilder-core');
const { DialogSet, Dialog } =  require('../');
const assert = require('assert');

const beginMessage = { text: `begin`, type: 'message' };

class TestDialog extends Dialog {
    constructor(dialogId) {
        super(dialogId);
        this.beginArgs = undefined;
        this.continueCalled = false;
    }

    async dialogBegin(dc, options) {
        assert(dc);
        if (options) {
            assert(options.test === 'test1', `received options and options.test ("${options.test}") was not "test1".`);
        }
        await dc.context.sendActivity('begin called');
        return Dialog.EndOfTurn;
    }

    async dialogContinue(dc, options) {
        return await dc.end(120);
    }
}

describe('Dialog', function() {
    this.timeout(5000);

    it('should call dialog from a dialog set using dc.begin().', async function (done) {       
        // Initialize TestAdapter.
        const adapter = new TestAdapter(async (turnContext) => {
            const dc = await dialogs.createContext(turnContext);
        
            await dc.begin('testDialog');
        });
        // Create new ConversationState with MemoryStorage and register the state as middleware.
        const convoState = new ConversationState(new MemoryStorage());
        adapter.use(convoState);
        
        // Create a DialogState property, DialogSet and register TestDialog.
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        const dialog = new TestDialog('testDialog');
        dialogs.add(dialog);
            
        adapter.send(beginMessage)
        .assertReply('begin called')
        done();
    });

    it('should receive dialog options when beginning a dialog from a dialog set.', async function (done) {        
        const adapter = new TestAdapter(async (turnContext) => {
            const dc = await dialogs.createContext(turnContext);            
            await dc.begin('testDialog', { test: 'test1' });
        });

        const convoState = new ConversationState(new MemoryStorage());
        adapter.use(convoState);
        
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        const dialog = new TestDialog('testDialog');
        dialogs.add(dialog);
        
        adapter.send(beginMessage)
        .assertReply('begin called')
        done();
    });

    it('should continue() a multi-turn dialog.', async function (done) {
        const adapter = new TestAdapter(async (turnContext) => {
            const dc = await dialogs.createContext(turnContext);
        
            const results = await dc.continue();
            if (!turnContext.responded && !results.hasActive && !results.hasResult) {
                await dc.begin('testDialog');
            } else if (!results.hasActive && results.hasResult) {
                const finalResult = results.result;
                await turnContext.sendActivity(finalResult.toString());
            }
        });
        
        const convoState = new ConversationState(new MemoryStorage());
        adapter.use(convoState);
        
        const dialogState = convoState.createProperty('dialogState');
        const dialogs = new DialogSet(dialogState);
        const dialog = new TestDialog('testDialog');
        dialogs.add(dialog);
            
        adapter.send(beginMessage)
        .assertReply('begin called')
        .send('continue')
        .assertReply('120')
        done();
    });
});
