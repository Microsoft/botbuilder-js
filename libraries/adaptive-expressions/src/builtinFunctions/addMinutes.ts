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
import { ExpressionType } from '../expressionType';
import { TimeTransformEvaluator } from './timeTransformEvaluator';

/**
 * Add a number of minutes to a timestamp.
 */
export class AddMinutes extends TimeTransformEvaluator {
    /**
     * Initializes a new instance of the [AddMinutes](xref:adaptive-expressions.AddMinutes) class.
     */
    public constructor() {
        super(ExpressionType.AddMinutes, (ts: Date, num: any): Date => dayjs(ts).utc().add(num, 'm').toDate());
    }
}
