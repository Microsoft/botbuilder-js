/**
 * @module botbuilder-prompts
 */
/** second comment block */
import { Prompt, PromptOptions, CompletedHandler, Prompter, ValidatorResult } from './prompt';
/** Additional settings that can be passed in when creating a custom `TextPrompt`. */
export interface TextPromptOptions extends PromptOptions {
    /**
     * (Optional) if true the users reply will be trimmed before returning to the caller. The
     * default value is true.
     */
    trimReply?: boolean;
}
/**
 * Prompts the user with a general question.
 *
 * **Usage Example:**
 *
 * ```js
 * // define prompt
 * const namePrompt = new TextPrompt('namePrompt', (context, state) => {
 *     const name = state.value;
 *
 *      // ... do something with value ...
 *
 * });
 *
 * // use prompt
 * function promptForName(context) {
 *     const prompt = namePrompt.reply(`Hi. What's your name?`);
 *     context.begin(prompt);
 * }
 * ```
 *
 * @param W (Optional) type of parameters that can be passed to [with()](#with).
 * @param O (Optional) type of options supported by any derived classes.
 */
export declare class TextPrompt<W extends Object = {}, O extends TextPromptOptions = TextPromptOptions> extends Prompt<string, W, O> {
    constructor(uid: string, completed: CompletedHandler<string, W, O>, prompter?: Prompter<string, W, O>);
    static validator(context: BotContext, options?: TextPromptOptions): ValidatorResult<string>;
}
