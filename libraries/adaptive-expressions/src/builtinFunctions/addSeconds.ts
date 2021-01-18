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
 * Add a number of seconds to a timestamp.
 */
export class AddSeconds extends TimeTransformEvaluator {
    /**
     * Initializes a new instance of the [AddSeconds](xref:adaptive-expressions.AddSeconds) class.
     */
    public constructor() {
        super(ExpressionType.AddSeconds, (ts: Date, num: any): Date => dayjs(ts).utc().add(num, 's').toDate());
    }
}
