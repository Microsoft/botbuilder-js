/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TimeTransformEvaluator } from './timeTransformEvaluator';
import moment from 'moment';
import { ExpressionType } from '../expressionType';

/**
 * Add a number of days to a timestamp.
 */
export class AddDays extends TimeTransformEvaluator {
    public constructor() {
        super(ExpressionType.AddDays, (ts: Date, num: any): Date =>  moment(ts).utc().add(num, 'd').toDate());
    }
}