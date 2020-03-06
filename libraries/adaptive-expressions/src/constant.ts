/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Expression, ReturnType } from './expression';
import { ExpressionEvaluator } from './expressionEvaluator';
import { ExpressionType } from './expressionType';

/**
 * Construct an expression constant.
 */
export class Constant extends Expression {

    /**
     * Constant value.
     */
    public get value(): any {
        return this._value;
    }

    public set value(theValue: any) {
        this.evaluator.returnType =
            typeof theValue === 'string' ? ReturnType.String
                : typeof theValue === 'boolean' ? ReturnType.Boolean
                    : typeof theValue === 'number' && !Number.isNaN(theValue) ? ReturnType.Number
                        : ReturnType.Object;

        this._value = theValue;
    }

    private _value: any;
    public constructor(value: any) {
        super(ExpressionType.Constant, new ExpressionEvaluator(ExpressionType.Constant,
            (expression: Expression): { value: any; error: string } => {
                return { value: (expression as Constant).value, error: undefined };
            }
        ));
        this.value = value;
    }

    public toString(): string {
        if (this.value === undefined) {
            return 'null';
        }

        if (typeof this.value === 'string') {
            if (this.value.includes('\\')) {
                this.value = this.value.replace(/\\/g, '\\\\');
            }

            return this.value.includes(`'`) ? `"${ this.value }"` : `'${ this.value }'`;
        } 
        
        if (typeof this.value === 'number') {
            return this.value.toString();
        }

        if (Array.isArray(this.value)) {
            this.value = '[' + this.value.join(' ') + ']';
        }

        if(typeof this.value === 'object') {
            this.value = JSON.stringify(this.value);
        }

        return this.value === undefined ? undefined : this.value.toString();
    }
}
