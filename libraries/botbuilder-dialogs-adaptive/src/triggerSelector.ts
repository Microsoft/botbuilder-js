/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { OnCondition } from './conditions';
import { SequenceContext } from './sequenceContext';
import { ExpressionParserInterface } from 'adaptive-expressions';

/**
 * Select the trigger to execute in a given state.
 */
export interface TriggerSelector {
    /**
     * Gets or sets the expression parser for expressions.
     */
    parser: ExpressionParserInterface;

    /**
     * Initialize the selector with the set of rules.
     * @param conditionals Possible rules to match.
     * @param evaluate True if rules should be evaluated on select.
     */
    initialize(conditionals: OnCondition[], evaluate: boolean): void;

    /**
     * Select the best rule to execute.
     * @param context Dialog context for evaluation.
     */
    select(context: SequenceContext): Promise<number[]>;
}