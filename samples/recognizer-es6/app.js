const builder = require("botbuilder");
const services = require('botbuilder-services');
const restify = require("restify");

// Create server
let server = restify.createServer();
server.getMessagePipelineToBot(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listing to ${server.url}`);
});

// Create connector
const botFrameworkAdapter = new services.BotFrameworkAdapter({ appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD });
server.post('/api/messages', botFrameworkAdapter.listen());

// init recognizer
let recognizer = new builder.RegExpRecognizer();
// add intents to recognizer
recognizer.addIntent('HelpIntent', /help/i);
recognizer.addIntent('CancelIntent', /(quit|cancel)/i);

// Initialize bot
const bot = new builder.Bot(botFrameworkAdapter);
// bind middleware
bot.use(new builder.ConsoleLogger(), new builder.MemoryStorage(), new builder.BotStateManager());
// register recognizer
bot.use(recognizer);
// handle messages
bot.onReceive((context) => {
    let count = context.state.conversation.count || 1;
    // handle intents - method #1
    if (context.topIntent && context.topIntent.name === 'HelpIntent') {
        context.reply('HelpIntent detected');
        context.reply('Here is some info about this bot, including usage example and available commands:\n\nhelp - shows this message\n\nquit - quits demo and ends conversation')
    }
    // handle intents - method #2
    else if (context.ifIntent('CancelIntent')) {
        context.reply('CancelIntent detected, ending conversation.');
        context.reply('Goodbye!');
        context.state.conversation.count = 1; // reset counter
        context.endOfConversation();
    }
    // handle messages
    else if (context.request.type === 'message') {
        if (count === 1) {
            // first run message
            context.reply('Welcome to the RegExpRecognizer demo.')
            context.reply('Type "help" for more info, or "quit" to exit')
        }
        context.reply(`You said "${context.request.text}"`);
        context.state.conversation.count = count + 1;
    } else {
        // handle other request types aka conversationUpdate etc.
        context.reply(`[${context.request.type} event detected]`);
    }
});

// END OF LINE
