/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { Expression } from '../expression';
import { EvaluateExpressionDelegate, ExpressionEvaluator, ValueWithError } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { InternalFunctionUtils } from '../functionUtils.internal';
import { Options } from '../options';
import { ReturnType } from '../returnType';

/**
 * Return a timestamp in the specified format.
 * Format reference: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
 */
export class FormatDateTime extends ExpressionEvaluator {
    /**
     * Initializes a new instance of the [FormatDateTime](xref:adaptive-expressions.FormatDateTime) class.
     */
    public constructor() {
        super(ExpressionType.FormatDateTime, FormatDateTime.evaluator(), ReturnType.String, FormatDateTime.validator);
    }

    /**
     * @private
     */
    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.applyWithOptionsAndError(
            (args: readonly unknown[], options: Options): ValueWithError => {
                let error: string;
                let value: unknown;
                const firstChild = args[0];
                let locale = options.locale ? options.locale : Intl.DateTimeFormat().resolvedOptions().locale;
                let format = FunctionUtils.DefaultDateTimeFormat;
                let isoString: string;
                if (typeof firstChild === 'string') {
                    error = InternalFunctionUtils.verifyTimestamp(firstChild);
                    isoString = firstChild;
                } else if (!(firstChild instanceof Date)) {
                    error = `${firstChild} is not a string or a date object.`;
                } else {
                    isoString = firstChild.toISOString();
                }

                if (!error) {
                    ({ format, locale } = FunctionUtils.determineFormatAndLocale(args, 3, format, locale));
                    let dateString: string;
                    if (isoString.endsWith('Z')) {
                        dateString = new Date(isoString).toISOString();
                    } else {
                        try {
                            dateString = new Date(`${isoString}Z`).toISOString();
                        } catch (err) {
                            dateString = new Date(isoString).toISOString();
                        }
                    }

                    value = dayjs(dateString).locale(locale).utc().format(format);
                }
                return { value, error };
            }
        );
    }

    /**
     * @private
     */
    private static validator(expression: Expression): void {
        FunctionUtils.validateOrder(expression, [ReturnType.String, ReturnType.String], ReturnType.Object);
    }
}
