import { BotFrameworkAdapter, MemoryStorage, ConversationState, BatchOutput, BotContext } from 'botbuilder';
import { DialogSet } from 'botbuilder-dialogs';
import * as restify from 'restify';

// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter( { 
    appId: process.env.MICROSOFT_APP_ID, 
    appPassword: process.env.MICROSOFT_APP_PASSWORD 
});

// Add conversation state middleware
interface DemoState {
    currentLocale?: string;     // remembers the current locale between demos
    demo?: string;              // active demo (if any)
    demoState?: object;      // persisted control/dialog state
}
const conversationState = new ConversationState<DemoState>(new MemoryStorage());
adapter.use(conversationState);

// Listen for incoming requests 
server.post('/api/messages', (req, res) => {
    adapter.processRequest(req, res, async (context) => {
        if (context.request.type === 'message') {
            // Update request with current locale
            const state = conversationState.get(context);
            if (state.currentLocale) { context.request.locale = state.currentLocale }

            // Route received request
            if (!state.demo) {
                const utterance = (context.request.text || '').trim().toLowerCase();
                if (utterance.includes('dialog')) {
                    await beginDialogDemo(context, state);
                } else if (utterance.includes('topic')) {
                    await beginTopicDemo(context, state);
                } else {
                    await context.sendActivity(`Which demo would you like to run? The "dialog" or "topic" based demo?`);
                }
            } else {
                switch (state.demo) {
                    case 'dialog':
                        await continueDialogDemo(context, state);
                        break;
                    case 'topic':
                        await continueTopicDemo(context, state);
                        break;
                }
            }
        }
    });
});

import { LanguagePicker } from './language';

//---------------------------------------------------------
// Dialog Based Usage
//---------------------------------------------------------

async function beginDialogDemo(context: BotContext, state: DemoState) {
    state.demo = 'dialog';
    state.demoState = {};
    const dc = dialogs.createContext(context, state.demoState);
    await dc.begin('demo');
}

async function continueDialogDemo(context: BotContext, state: DemoState) {
    const dc = dialogs.createContext(context, state.demoState);
    const result = await dc.continue();
    if (!result.active) {
        state.demo = undefined;
        state.demoState = undefined;
        state.currentLocale = result.result;
    }
}

const dialogs = new DialogSet();

dialogs.add('demo', [
    async function (dc) {
        return await dc.begin('localePicker');
    },
    async function (dc, locale: string) {
        await dc.context.sendActivity(`Switching locale to "${locale}".`);
        return await dc.end(locale);
    }
]);

dialogs.add('localePicker', new LanguagePicker({ defaultLocale: 'en' }));


//---------------------------------------------------------
// Topic Based Usage
//---------------------------------------------------------

const localePicker = new LanguagePicker({ defaultLocale: 'en' });

async function beginTopicDemo(context: BotContext, state: DemoState) {
    state.demo = 'topic';
    state.demoState = {};
    await localePicker.begin(context, state.demoState);
}

async function continueTopicDemo(context: BotContext, state: DemoState) {
    const result = await localePicker.continue(context, state.demoState);
    if (!result.active) {
        state.demo = undefined;
        state.demoState = undefined;
        state.currentLocale = result.result;
        await context.sendActivity(`Switching locale to "${state.currentLocale}".`);
    }
}
