/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from '../expression';
import { EvaluateExpressionDelegate, ExpressionEvaluator } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { ReturnType } from '../returnType';

/**
 * Return the JavaScript Object Notation (JSON) type value or object of a string or XML.
 */
export class Json extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [Json](xref:adaptive-expressions.Json) class.
     */
    public constructor() {
        super(ExpressionType.Json, Json.evaluator(), ReturnType.Object, Json.validator);
    }

    /**
     * @private
     */
    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.apply((args: any[]): any => {
            const firstChild = args[0];
            if (typeof firstChild === 'string') {
                return JSON.parse(firstChild.trim());
            } else if (typeof firstChild === 'object') {
                return firstChild;
            } else return {};
        });
    }

    /**
     * @private
     */
    private static validator(expression: Expression): void {
        FunctionUtils.validateOrder(expression, undefined, ReturnType.Object);
    }
}
