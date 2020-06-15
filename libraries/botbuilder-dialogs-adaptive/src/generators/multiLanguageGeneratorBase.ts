/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LanguageGenerator } from '../languageGenerator';
import { TurnContext } from 'botbuilder-core';
import {LanguagePolicy} from '../languagePolicy';
/**
 * Class which manages cache of all LG resources from a ResourceExplorer. 
 * This class automatically updates the cache when resource change events occure.
 */
export abstract class MultiLanguageGeneratorBase implements LanguageGenerator{
    public languagePolicy: any;

    public abstract tryGetGenerator(context: TurnContext, locale: string): {exist: boolean; result: LanguageGenerator};

    public constructor(languagePolicy: any = undefined) {
        this.languagePolicy = languagePolicy;
    };
    
    public async generate(turnContext: TurnContext, template: string, data: object): Promise<string> {
        const targetLocale = turnContext.activity.locale? turnContext.activity.locale.toLocaleLowerCase() : '';

        // priority
        // 1. local policy
        // 2. shared policy in turnContext
        // 3. default policy
        if (!this.languagePolicy) {
            this.languagePolicy = turnContext.turnState.get('languagePolicy');
            if (!this.languagePolicy) {
                this.languagePolicy = LanguagePolicy.defaultPolicy;
            }
        }

        // see if we have any locales that match
        let fallbaslLocales = [];
        if (targetLocale in this.languagePolicy) {
            this.languagePolicy[targetLocale].forEach((u: string): number => fallbaslLocales.push(u));
        }

        // append empty as fallback to end
        if (targetLocale !== '' && '' in this.languagePolicy) {
            this.languagePolicy[''].forEach((u: string): number => fallbaslLocales.push(u));
        }

        if (fallbaslLocales.length === 0) {
            throw Error(`No supported language found for ${ targetLocale }`);
        }
        
        const generators: LanguageGenerator[] = [];
        for (const locale of fallbaslLocales) {
            if (this.tryGetGenerator(turnContext, locale).exist) {
                generators.push(this.tryGetGenerator(turnContext, locale).result); 
            }
        }

        if (generators.length === 0) {
            throw Error(`No generator found for language ${ targetLocale }`);
        }

        const errors: string[] = [];
        for (const generator of generators) {
            try{
                return generator.generate(turnContext, template, data);
            } catch(e) {
                errors.push(e);
            }
        }

        throw Error(errors.join(',\n'));
    }
}