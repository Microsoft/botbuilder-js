// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AdaptiveDialog, OnIntent, CancelAllDialogs, TextInput, EditArray, ArrayChangeType, SendActivity, IfCondition, SetProperty } from "botbuilder-dialogs-adaptive";
import { getRecognizer } from "../recognizer";

export class AddToDo extends AdaptiveDialog {
    constructor() {
        super('AddToDo', [
            new TextInput('$title', '@title', `What would you like to call your new todo?`),
            new EditArray(ArrayChangeType.push, 'dialog.todos', '$title'),
            new SendActivity(`Added a todo named "{$title}". You can delete it by saying "delete todo named {$title}".`),
            new IfCondition(`dialog.tips.showToDos != true`, [
                new SendActivity(`To view your todos just ask me to "show my todos".`),
                new SetProperty('dialog.tips.showToDos', 'true')
            ])
        ]);

        // Use parents recognizer
        this.recognizer = getRecognizer();

        // Add interruption rules
        this.addRule(new OnIntent('#Cancel', [], [
            new CancelAllDialogs('cancelAdd')
        ]));
    }
}

