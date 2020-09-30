/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { NumberExpression } from '../expressionProperties';

/**
 * String or number to json NumberExpression converter.
 */
export class NumberExpressionConverter {

    /**
     * Converts a string or number into a NumberExpression.
     * @param value String or number to convert.
     * @returns The NumberExpression.
     */
    public convert(value: string | number): NumberExpression {
        return new NumberExpression(value);
    }
}
