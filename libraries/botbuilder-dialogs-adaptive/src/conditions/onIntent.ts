/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { OnDialogEvent } from './onDialogEvent';
import { AdaptiveEventNames, SequenceContext } from '../sequenceContext';
import { DialogEvent, Dialog  } from 'botbuilder-dialogs';

/**
 * This rule is triggered when a message is received and the recognized intents & entities match a
 * specified list of intent & entity filters.
 */
export class OnIntent extends OnDialogEvent {

    /**
     * List of intents, entities, and properties to filter to.
     */
    public readonly matches: string[];

    /**
     * Creates a new `OnIntent` instance.
     * @param matches (Optional) list of intents, entities, and properties to filter to.
     * @param actions (Optional) list of actions to update the plan with when triggered.
     */
    constructor(matches?: string|string[], actions?: Dialog[]) {
        super(AdaptiveEventNames.recognizedIntent, actions, true);
        this.matches = Array.isArray(matches) ? matches : (matches !== undefined ? [matches] : []);
    }

    protected async onIsTriggered(sequence: SequenceContext, event: DialogEvent): Promise<boolean> {

        // Ensure all intents, entities, and properties exist.
        const memory = sequence.state;
        for(let i = 0; i < this.matches.length; i++) {
            const value = sequence.state.getValue(this.matches[i]);
            if (!Array.isArray(value) || value.length == 0 || value[0] == undefined) {
                return false;
            }
        }

        return true;
    }
}