/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ExpressionParserInterface, ExpressionParser } from 'adaptive-expressions';
import { Converters, Properties } from 'botbuilder-dialogs';
import { TriggerSelector } from '../triggerSelector';
import { OnCondition } from '../conditions';
import { ActionContext } from '../actionContext';

/**
 * Select a random true rule implementation of TriggerSelector.
 */
export class RandomSelector extends TriggerSelector {
    public static $kind = 'Microsoft.RandomSelector';

    private _conditionals: OnCondition[];
    private _evaluate: boolean;

    /**
     * Gets or sets the expression parser to use.
     */
    public parser: ExpressionParserInterface = new ExpressionParser();

    public getConverters(): Converters<Properties<RandomSelector>> {
        return {};
    }

    public initialize(conditionals: OnCondition[], evaluate: boolean): void {
        this._conditionals = conditionals;
        this._evaluate = evaluate;
    }

    public select(actionContext: ActionContext): Promise<OnCondition[]> {
        const candidates: OnCondition[] = [];
        for (let i = 0; i < this._conditionals.length; i++) {
            const conditional = this._conditionals[i];
            if (this._evaluate) {
                const expression = conditional.getExpression(this.parser);
                const { value, error } = expression.tryEvaluate(actionContext.state);
                if (value && !error) {
                    candidates.push(conditional);
                }
            } else {
                candidates.push(conditional);
            }
        }

        const result: OnCondition[] = [];
        if (candidates.length > 0) {
            const selection = Math.floor(Math.random() * candidates.length);
            result.push(candidates[selection]);
        }

        return Promise.resolve(result);
    }
}
