/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IntExpression } from '../expressionProperties';

/**
 * `string` or `number` to json [IntExpression](xref:adaptive-expressions.IntExpression) converter.
 */
export class IntExpressionConverter {
    /**
     * Converts a `string` or `number` into an [IntExpression](xref:adaptive-expressions.IntExpression).
     * @param value `string` or `number` to convert.
     * @returns The [IntExpression](xref:adaptive-expressions.IntExpression).
     */
    public convert(value: string | number): IntExpression {
        return new IntExpression(value);
    }
}
