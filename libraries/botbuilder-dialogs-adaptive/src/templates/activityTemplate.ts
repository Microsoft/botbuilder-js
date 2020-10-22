/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Activity, ActivityFactory, MessageFactory } from 'botbuilder-core';
import { DialogContext, DialogStateManager, TemplateInterface } from 'botbuilder-dialogs';
import { LanguageGenerator } from '../languageGenerator';
import { languageGeneratorKey } from '../languageGeneratorExtensions';

/**
 * Defines an activity template where the template expression is local aka "inline"
 * and processed through registered language generator.
 */
export class ActivityTemplate implements TemplateInterface<Partial<Activity>, DialogStateManager> {
    /**
     * Initialize a new instance of ActivityTemplate class.
     * @param template The template to evaluate to create the activity.
     */
    public constructor(template: string) {
        this.template = template;
    }

    /**
     * Gets or sets the template to evaluate to create the activity.
     */
    public template: string;

    /**
     * Bind data to template.
     * @param dialogContext DialogContext
     * @param data Data to bind to.
     */
    public async bind(dialogContext: DialogContext, data: DialogStateManager): Promise<Partial<Activity>> {
        if (this.template) {
            const languageGenerator = dialogContext.services.get(languageGeneratorKey) as LanguageGenerator<
                Partial<Activity>,
                DialogStateManager
            >;

            if (languageGenerator) {
                const lgResult = await languageGenerator.generate(dialogContext, this.template, data);
                const result = ActivityFactory.fromObject(lgResult);
                return Promise.resolve(result);
            } else {
                const message = MessageFactory.text(this.template, this.template);
                return Promise.resolve(message);
            }
        }

        return Promise.resolve(undefined);
    }

    public toString = (): string => {
        return `ActivityTemplate(${this.template})`;
    };
}
