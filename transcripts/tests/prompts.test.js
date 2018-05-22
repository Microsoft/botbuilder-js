const assert = require('assert');

const { BotState, UserState, MemoryStorage, TestAdapter, ConversationState } = require('botbuilder-core-extensions');
const { createChoicePrompt, ListStyle } = require('botbuilder-prompts');
const {
    DialogSet, TextPrompt, ConfirmPrompt, ChoicePrompt, DatetimePrompt, NumberPrompt,
    AttachmentPrompt, FoundChoice, Choice, FoundDatetime
} = require('botbuilder-dialogs');

const TranscriptUtilities = require('../../libraries/botbuilder-core-extensions/tests/transcriptUtilities');

function TestBotWithTranscript(transcriptPath, botLogicFactoryFun) {
    return function (done) {
        TranscriptUtilities.getActivitiesFromChat(transcriptPath).then(activities => {
            const convoState = new ConversationState(new MemoryStorage());
            var adapter = new TestAdapter(botLogicFactoryFun(convoState));
            adapter.use(convoState);
            return adapter.testActivities(activities)
                .then(done)
                .catch(done);
        });
    }
}

describe(`Prompts using transcripts`, function () {
    this.timeout(5000);

    it('ChoicePrompt', TestBotWithTranscript('../DialogsTests/ChoicePrompt.chat', ChoicePromptLogic));
    it('ChoicePrompt - Retry', TestBotWithTranscript('../DialogsTests/ChoicePromptRetry.chat', ChoicePromptLogic));

});

function ChoicePromptLogic(state) {

    const colorChoices = ['red', 'green', 'blue'];
    const dialogs = new DialogSet();
    const choicePrompt = new ChoicePrompt().style(ListStyle.inline);
    dialogs.add('choicePrompt', choicePrompt);
    dialogs.add('start', [
        async function (dc) {
            await dc.prompt('choicePrompt', 'favorite color?', colorChoices, {
                retryPrompt: `I didn't catch that. Select a color from the list.`
            });
        },
        async function (dc, choice) {
            const color = choice.value;
            await dc.context.sendActivity(`Bot received the choice '${color}'.`);
            await dc.end();
        }
    ]);

    return async (context) => {
        const dc = dialogs.createContext(context, state);
        await dc.continue();

        // Check to see if anyone replied. If not then start echo dialog
        if (!context.responded) {
            await dc.begin('start');
        }
    }
};