/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { DialogContext, Choice, ListStyle, ChoiceFactoryOptions, FindChoicesOptions, ChoiceFactory, recognizeChoices, ModelResult, FoundChoice, PromptCultureModels } from 'botbuilder-dialogs';
import { Activity } from 'botbuilder-core';
import { InputDialog, InputState } from './inputDialog';
import { ChoiceSet } from './choiceSet';
import { ObjectExpression, StringExpression, EnumExpression } from 'adaptive-expressions';


export enum ChoiceOutputFormat {
    value = 'value',
    index = 'index'
}

export interface ChoiceInputOptions {
    choices: Choice[];
}

export class ChoiceInput extends InputDialog {
    /**
     * Default options for rendering the choices to the user based on locale.
     */
    private static defaultChoiceOptions: { [locale: string]: ChoiceFactoryOptions } = {
        'es-es': { inlineSeparator: ', ', inlineOr: ' o ', inlineOrMore: ', o ', includeNumbers: true },
        'nl-nl': { inlineSeparator: ', ', inlineOr: ' of ', inlineOrMore: ', of ', includeNumbers: true },
        'en-us': { inlineSeparator: ', ', inlineOr: ' or ', inlineOrMore: ', or ', includeNumbers: true },
        'fr-fr': { inlineSeparator: ', ', inlineOr: ' ou ', inlineOrMore: ', ou ', includeNumbers: true },
        'de-de': { inlineSeparator: ', ', inlineOr: ' oder ', inlineOrMore: ', oder ', includeNumbers: true },
        'ja-jp': { inlineSeparator: '、 ', inlineOr: ' または ', inlineOrMore: '、 または ', includeNumbers: true },
        'pt-br': { inlineSeparator: ', ', inlineOr: ' ou ', inlineOrMore: ', ou ', includeNumbers: true },
        'zh-cn': { inlineSeparator: '， ', inlineOr: ' 要么 ', inlineOrMore: '， 要么 ', includeNumbers: true }
    };

    /**
     * List of choices to present to user.
     */
    public choices: ObjectExpression<ChoiceSet>;

    /**
     * Style of the "yes" and "no" choices rendered to the user when prompting.
     *
     * @remarks
     * Defaults to `ListStyle.auto`.
     */
    public style: EnumExpression<ListStyle> = new EnumExpression<ListStyle>(ListStyle.auto);

    /**
     * The prompts default locale that should be recognized.
     */
    public defaultLocale?: StringExpression;

    /**
     * Control the format of the response (value or index of the choice).
     */
    public outputFormat: EnumExpression<ChoiceOutputFormat> = new EnumExpression<ChoiceOutputFormat>(ChoiceOutputFormat.value);

    /**
     * Additional options passed to the `ChoiceFactory` and used to tweak the style of choices
     * rendered to the user.
     */
    public choiceOptions?: ObjectExpression<ChoiceFactoryOptions> = new ObjectExpression();

    /**
     * Additional options passed to the underlying `recognizeChoices()` function.
     */
    public recognizerOptions?: ObjectExpression<FindChoicesOptions> = new ObjectExpression();

    protected onInitializeOptions(dc: DialogContext, options: ChoiceInputOptions): ChoiceInputOptions {
        if (!(options && options.choices && options.choices.length > 0)) {
            if (!options) {
                options = { choices: [] };
            }
            const choices = this.choices.getValue(dc.state);
            options.choices = choices;
        }
        return super.onInitializeOptions(dc, options);
    }

    protected async onRecognizeInput(dc: DialogContext): Promise<InputState> {
        // Get input and options
        let input: string = dc.state.getValue(InputDialog.VALUE_PROPERTY).toString();
        const options: ChoiceInputOptions = dc.state.getValue(InputDialog.OPTIONS_PROPERTY);

        // Format choices
        const choices = ChoiceFactory.toChoices(options.choices);

        // Initialize recognizer options
        const opt = Object.assign({}, this.recognizerOptions.getValue(dc.state));
        opt.locale = this.determineCulture(dc, opt);

        // Recognize input
        const results = recognizeChoices(input, choices, opt);
        if (!Array.isArray(results) || results.length == 0) {
            return InputState.unrecognized;
        }

        // Format output and return success
        const foundChoice = results[0].resolution;
        switch (this.outputFormat.getValue(dc.state)) {
            case ChoiceOutputFormat.value:
            default:
                dc.state.setValue(InputDialog.VALUE_PROPERTY, foundChoice.value);
                break;
            case ChoiceOutputFormat.index:
                dc.state.setValue(InputDialog.VALUE_PROPERTY, foundChoice.index);
                break;
        }

        return InputState.valid;
    }

    protected async onRenderPrompt(dc: DialogContext, state: InputState): Promise<Partial<Activity>> {
        // Determine locale
        let locale = this.determineCulture(dc);

        const choices = this.choices.getValue(dc.state);

        // Format prompt to send
        const prompt = await super.onRenderPrompt(dc, state);
        const channelId = dc.context.activity.channelId;
        const choiceOptions = (this.choiceOptions && this.choiceOptions.getValue(dc.state)) || ChoiceInput.defaultChoiceOptions[locale];
        const style = this.style.getValue(dc.state);
        return Promise.resolve(this.appendChoices(prompt, channelId, choices, style, choiceOptions));
    }

    protected onComputeId(): string {
        return `ChoiceInput[${ this.prompt && this.prompt.toString() }]`;
    }

    private determineCulture(dc: DialogContext, opt?: FindChoicesOptions): string {
        const optLocale = opt && opt.locale ? opt.locale : null;
        let culture = PromptCultureModels.mapToNearestLanguage(
            dc.context.activity.locale ||
            optLocale ||
            (this.defaultLocale && this.defaultLocale.getValue(dc.state)));

        if (!(culture && ChoiceInput.defaultChoiceOptions.hasOwnProperty(culture))) {
            culture = PromptCultureModels.English.locale;
        }

        return culture;
    }
}
