/**
 * @module botbuilder-dialogs
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { TurnContext, Attachment } from 'botbuilder';
import { DialogContext } from '../dialogContext';
import { Prompt, PromptOptions, PromptValidator } from './prompt';
/**
 * Prompts a user to upload attachments like images. By default the prompt will return to the
 * calling dialog a `Attachment[]` but this can be overridden using a custom `PromptValidator`.
 *
 * **Example usage:**
 *
 * ```JavaScript
 * const { DialogSet, AttachmentPrompt } = require('botbuilder-dialogs');
 *
 * const dialogs = new DialogSet();
 *
 * dialogs.add('attachmentPrompt', new AttachmentPrompt());
 *
 * dialogs.add('uploadImage', [
 *      function (dc) {
 *          return dc.prompt('attachmentPrompt', `Send me image(s)`);
 *      },
 *      function (dc, attachments) {
 *          dc.batch.reply(`Processing ${attachments.length} images.`);
 *          return dc.end();
 *      }
 * ]);
 * ```
 */
export declare class AttachmentPrompt<C extends TurnContext> extends Prompt<C, Attachment[]> {
    private prompt;
    /**
     * Creates a new instance of the prompt.
     *
     * **Example usage:**
     *
     * ```JavaScript
     * dialogs.add('imagePrompt', new AttachmentPrompt((dc, values) => {
     *      if (!Array.isArray(values) || values.length < 1) {
     *          dc.batch.reply(`Send me an image or say "cancel".`);
     *          return undefined;
     *      } else {
     *          return values;
     *      }
     * }));
     * ```
     * @param validator (Optional) validator that will be called each time the user responds to the prompt. If the validator replies with a message no additional retry prompt will be sent.
     */
    constructor(validator?: PromptValidator<C, Attachment[]>);
    protected onPrompt(dc: DialogContext<C>, options: PromptOptions, isRetry: boolean): Promise<void>;
    protected onRecognize(dc: DialogContext<C>, options: PromptOptions): Promise<Attachment[] | undefined>;
}
