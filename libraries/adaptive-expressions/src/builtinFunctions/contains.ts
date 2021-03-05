/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from '../expression';
import { ExpressionEvaluator, ValueWithError } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { InternalFunctionUtils } from '../functionUtils.internal';
import { MemoryInterface } from '../memory/memoryInterface';
import { Options } from '../options';
import { ReturnType } from '../returnType';

/**
 * Check whether a collection has a specific item. Return true if the item is found, or return false if not found.
 * This function is case-sensitive.
 */
export class Contains extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Contains](xref:adaptive-expressions.Contains) class.
     */
    public constructor() {
        super(ExpressionType.Contains, Contains.evaluator, ReturnType.Boolean, FunctionUtils.validateBinary);
    }

    /**
     * @private
     */
    private static evaluator(expression: Expression, state: MemoryInterface, options: Options): ValueWithError {
        let found = false;
        const { args, error: childrenError } = FunctionUtils.evaluateChildren(expression, state, options);
        let error = childrenError;
        if (!error) {
            const firstChild = args[0];
            const secondChild = args[1];
            if (typeof firstChild === 'string' && typeof secondChild === 'string') {
                found = firstChild.includes(secondChild);
            } else if (Array.isArray(firstChild)) {
                found = firstChild.includes(secondChild);
            } else if (firstChild instanceof Map) {
                found = firstChild.get(secondChild) !== undefined;
            } else if (typeof secondChild === 'string') {
                let value: unknown;
                ({ value, error } = InternalFunctionUtils.accessProperty(firstChild, secondChild));
                found = !error && value !== undefined;
            }
        }

        return { value: found, error: undefined };
    }
}
