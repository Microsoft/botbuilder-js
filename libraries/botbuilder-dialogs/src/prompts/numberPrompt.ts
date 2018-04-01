/**
 * @module botbuilder-dialogs
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext } from 'botbuilder';
import { DialogContext } from '../dialogContext';
import { Prompt, PromptOptions, PromptValidator } from './prompt';
import * as prompts from 'botbuilder-prompts';

/**
 * Prompts a user to enter a number. By default the prompt will return to the calling dialog 
 * a `number` representing the users input.
 * 
 * **Example usage:**
 * 
 * ```JavaScript
 * const { DialogSet, NumberPrompt } = require('botbuilder-dialogs');
 * 
 * const dialogs = new DialogSet();
 * 
 * dialogs.add('numberPrompt', new NumberPrompt());
 * 
 * dialogs.add('numberDemo', [
 *      function (dc) {
 *          return dc.prompt('numberPrompt', `number: enter a number`);
 *      },
 *      function (dc, value) {
 *          dc.batch.reply(`Recognized value: ${value}`);
 *          return dc.end();
 *      }
 * ]);
 * ```
 */
export class NumberPrompt<C extends TurnContext> extends Prompt<C, number> {
    private prompt: prompts.NumberPrompt;

    /**
     * Creates a new instance of the prompt.
     * 
     * **Example usage:**
     * 
     * ```JavaScript
     * dialogs.add('agePrompt', new NumberPrompt((dc, value) => {
     *      if (value === undefined || value < 1 || value > 110) {
     *          dc.batch.reply(`Invalid age. Only ages between 1 and 110 are allowed.`);
     *          return undefined;
     *      } else {
     *          return value;
     *      }
     * }));
     * ```
     * @param validator (Optional) validator that will be called each time the user responds to the prompt. If the validator replies with a message no additional retry prompt will be sent.  
     * @param defaultLocale (Optional) locale to use if `dc.context.activity.locale` not specified. Defaults to a value of `en-us`.
     */
    constructor(validator?: PromptValidator<C, number>, defaultLocale?: string) {
        super(validator);
        this.prompt = prompts.createNumberPrompt(undefined, defaultLocale); 
    }

    protected onPrompt(dc: DialogContext<C>, options: PromptOptions, isRetry: boolean): Promise<void> {
        if (isRetry && options.retryPrompt) {
            return this.prompt.prompt(dc.context, options.retryPrompt, options.retrySpeak);
        } else if (options.prompt) {
            return this.prompt.prompt(dc.context, options.prompt, options.speak);
        }
        return Promise.resolve();
    }

    protected onRecognize(dc: DialogContext<C>, options: PromptOptions): Promise<number|undefined> {
        return this.prompt.recognize(dc.context);
    }
}


