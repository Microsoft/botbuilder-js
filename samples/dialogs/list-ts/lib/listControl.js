"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const botbuilder_choices_1 = require("botbuilder-choices");
const botbuilder_1 = require("botbuilder");
class ListControl extends botbuilder_dialogs_1.Dialog {
    constructor(pager, actions) {
        super();
        this.pager = pager;
        this.actions = actions || [{ type: 'imBack', title: 'Show More', value: 'more' }];
    }
    dialogBegin(dc, args) {
        dc.currentDialog.state = Object.assign({}, args);
        return this.showMore(dc);
    }
    dialogContinue(dc) {
        // Recognize selected action
        const utterance = (dc.context.activity.text || '').trim();
        const choices = this.actions.map((a) => {
            return typeof a === 'object' ? { value: a.value, action: a } : a;
        });
        const found = botbuilder_choices_1.findChoices(utterance, choices);
        // Check for 'more' action
        const action = found.length > 0 ? found[0].resolution.value : undefined;
        if (action === 'more') {
            return this.showMore(dc);
        }
        else {
            const state = dc.currentDialog.state;
            return dc.end({ action: action, continueToken: state.continueToken });
        }
    }
    showMore(dc) {
        try {
            const state = dc.currentDialog.state;
            return Promise.resolve(this.pager(dc, state.filter, state.continueToken)).then((result) => {
                if (result.continueToken) {
                    // Save continuation token
                    state.continueToken = result.continueToken;
                    // Add suggested actions to results
                    const msg = Object.assign(botbuilder_1.MessageFactory.suggestedActions(this.actions), result.results);
                    // Send user the results
                    return dc.context.sendActivity(msg);
                }
                else if (result.results) {
                    // Send user the results and end dialog.
                    return dc.context.sendActivity(result.results)
                        .then(() => dc.end({}));
                }
                else {
                    // Just end the dialog
                    return dc.end({});
                }
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
exports.ListControl = ListControl;
