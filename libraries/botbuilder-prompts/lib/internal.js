"use strict";
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
function sendPrompt(context, prompt, speak) {
    // Compose activity
    const msg = typeof prompt === 'string' ? { text: prompt } : Object.assign({}, prompt);
    if (speak) {
        msg.speak = speak;
    }
    if (!msg.type) {
        msg.type = botbuilder_1.ActivityTypes.Message;
    }
    if (!msg.inputHint) {
        msg.inputHint = botbuilder_1.InputHints.ExpectingInput;
    }
    // Send using batch output to ensure that prompt gets appended if batching is being used.
    return new botbuilder_1.BatchOutput(context).reply(msg).flush().then(() => {
        // eat response body 
    });
}
exports.sendPrompt = sendPrompt;
//# sourceMappingURL=internal.js.map