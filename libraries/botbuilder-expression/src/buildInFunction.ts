
import { Expression, ReturnType } from './expression';
import { EvaluateExpressionDelegate, ExpressionEvaluator } from './expressionEvaluator';
import { ExpressionType } from './expressionType';

/**
 *  <summary>
 *  Definition of default built-in functions for expressions.
 *  </summary>
 *  <remarks>
 *  These functions are largely from WDL https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference
 *  with a few extensions like infix operators for math, logic and comparisons.
 *  </remarks>
 */
export class BuiltInFunctions {

    public static _functions: Map<string, ExpressionEvaluator> =  BuiltInFunctions.BuildFunctionLookup();
    /**
     * Validate that expression has a certain number of children that are of any of the supported types.
     * @param expression Expression to validate.
     * @param minArity Minimum number of children.
     * @param maxArity Maximum number of children.
     * @param types Allowed return types for children.
     * If a child has a return type of Object then validation will happen at runtime.
     */
    public static ValidateArityAndAnyType(expression: Expression, minArity: number, maxArity: number, ...types: ReturnType[]): void {
        if (expression.Children.length < minArity) {
            throw new Error(`${expression} should have at least ${minArity} children.`);
        }
        if (expression.Children.length > maxArity) {
            throw new Error(`${expression} can't have more than ${maxArity} children.`);
        }

        if (types.length > 0) {
            for (const child of expression.Children) {
                if (child.ReturnType !== ReturnType.Object && !types.includes(child.ReturnType)) {
                    if (types.length === 1) {
                        throw new Error(`${child} is not a ${types[0]} expression in ${expression}.`);
                    } else {
                        const builder: string = `${child} in ${expression} is not any of [`;
                        let first: boolean = true;
                        for (const type of types) {
                            if (first) {
                                first = false;
                            } else {
                                builder.concat('. ');
                            }
                            builder.concat(type.toString());
                        }
                        builder.concat('].');
                        throw new Error(builder);
                    }
                }
            }
        }
    }

    /**
     * Validate the number and type of arguments to a function.
     * @param expression Expression to validate.
     * @param optional
     * @param types Expected types in order.
     */
    public static ValidateOrder(expression: Expression, optional: ReturnType[], ...types: ReturnType[]): void {
        if (optional === undefined) {
            optional = [];
        }
        if (expression.Children.length < types.length || expression.Children.length > types.length + optional.length) {
            throw new Error(optional.length === 0 ?
                `${expression} should have ${types.length} children.`
                : `${expression} should have between ${types.length} and ${types.length + optional.length} children.`);
        }

        for (let i: number = 0; i < types.length; i++) {
            const child: Expression = expression.Children[i];
            const type: ReturnType = types[i];
            if (type !== ReturnType.Object && child.ReturnType !== ReturnType.Object && child.ReturnType !== type) {
                throw new Error(`${child} in ${expression} is not a ${type}.`);
            }
        }

        for (let i: number = 0; i < optional.length; i++) {
            const ic: number = i + types.length;
            if (ic >= expression.Children.length) {
                break;
            }
            const child: Expression = expression.Children[ic];
            const type: ReturnType = optional[i];
            if (child.ReturnType !== type) {
                throw new Error(`${child} in ${expression} is not a ${type}.`);
            }
        }
    }

    /**
     * Validate 1 or more numeric arguments.
     * @param expression Expression to validate.
     */
    public static ValidateNumber(expression: Expression): void {

        return BuiltInFunctions.ValidateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER, ReturnType.Number);
    }

    /**
     * Validate 1 or more boolean arguments.
     * @param expression Expression to validate.
     */
    public static ValidateBoolean(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER, ReturnType.Boolean);
    }

    /**
     * Validate 1 or more string arguments.
     * @param expression Expression to validate.
     */
    public static ValidateString(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 1, Number.MAX_SAFE_INTEGER, ReturnType.String);
    }

    /**
     * Validate there are two children.
     * @param expression Expression to validate.
     */
    public static ValidateBinary(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 2, 2);
    }

    /**
     * Validate 2 numeric arguments.
     * @param expression Expression to validate.
     */
    public static ValidateBinaryNumber(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 2, 2, ReturnType.Number);
    }

    /**
     * Validate there are 2 numeric or string arguments.
     * @param expression Expression to validate.
     */
    public static ValidateBinaryNumberOrString(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 2, 2, ReturnType.Number, ReturnType.String);
    }

    /**
     * Validate there is a single argument.
     * @param expression Expression to validate.
     */
    public static ValidateUnary(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 1, 1);
    }

    /**
     * Validate there is a single string argument.
     * @param expression Expression to validate.
     */
    public static ValidateUnaryString(expression: Expression): void {
        return BuiltInFunctions.ValidateArityAndAnyType(expression, 1, 1, ReturnType.String);
    }

    /**
     * Validate there is a single boolean argument.
     * @param expression Expression to validate.
     */
    public static ValidateUnaryBoolean(expression: Expression): void {
        return BuiltInFunctions.ValidateOrder(expression, undefined, ReturnType.Boolean);
    }

    /**
     * Verify value is numeric.
     * @param value alue to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    public static VerifyNumber(value: any, expression: Expression): string {
        let error: string;
        if (Number.isNaN(value)) {
            error = `${expression} is not a number.`;
        }

        return error;
    }

    /**
     * Verify value is an integer.
     * @param value alue to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    public static VerifyInteger(value: any, expression: Expression): string {
        let error: string;
        if (!Number.isInteger(value)) {
            error = `${expression} is not a integer.`;
        }

        return error;
    }

    /**
     * Verify value is a string.
     * @param value alue to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    public static VerifyString(value: any, expression: Expression): string {
        let error: string;
        if (typeof value !== 'string') {
            error = `${expression} is not a string.`;
        }

        return error;
    }

    /**
     * Verify value is a number or string.
     * @param value alue to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    public static VerifyNumberOrString(value: any, expression: Expression): string {
        let error: string;
        if (value !== undefined && Number.isNaN(value) && typeof value !== 'string') {
            error = `${expression} is not string or number.`;
        }

        return error;
    }

    /**
     * Verify value is boolean.
     * @param value alue to check.
     * @param expression Expression that led to value.
     * @returns Error or undefined if invalid.
     */
    public static VerifyBoolean(value: any, expression: Expression): string {
        let error: string;
        if (typeof value !== 'boolean') {
            error = `${expression} is not a boolean.`;
        }

        return error;
    }

    /**
     * Evaluate expression children and return them.
     * @param expression Expression with children.
     * @param state Global state.
     * @param verify Optional function to verify each child's result.
     * @returns List of child values or error message.
     */
    public static EvaluateChildren(expression: Expression, state: any, verify?: (arg0: any, arg1: Expression) => any)
    : {args: ReadonlyArray<any>; error: string} {
        const args: any[] = [];
        let value: any;
        let error: string;
        for (const child of expression.Children) {
           ({value, error} = child.TryEvaluate(state));
           if (error !== undefined) {
               break;
           }
           if (verify !== undefined) {
               error = verify(value, child);
           }
           if (error !== undefined) {
               break;
           }
           args.push(value);
        }

        return {args, error};
    }

    /**
     * Generate an expression delegate that applies function after verifying all children.
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    public static Apply(func: (arg0: ReadonlyArray<any>) => any, verify?: (arg0: any, arg1: Expression) => string)
    : EvaluateExpressionDelegate {
        return (expression: Expression, state: any): {value: any; error: string} => {
            let value: any;
            let error: string;
            let args: ReadonlyArray<any>;
            ({args, error} = BuiltInFunctions.EvaluateChildren(expression, state, verify));
            if (error === undefined) {
                value = func(args);
            }

            return {value, error};
        };
    }

    /**
     * Generate an expression delegate that applies function on the accumulated value after verifying all children.
     * @param func Function to apply.
     * @param verify Function to check each arg for validity.
     * @returns Delegate for evaluating an expression.
     */
    public static ApplySequence(func: (arg0: ReadonlyArray<any>) => any, verify?: (arg0: any, arg1: Expression) => string)
    : EvaluateExpressionDelegate {
        return BuiltInFunctions.Apply(
            (args: ReadonlyArray<any>): any => {
                const binaryArgs: any[] = [undefined, undefined];
                let soFar: any = args[0];
                // tslint:disable-next-line: prefer-for-of
                for (let i: number = 0; i < args.length; i++) {
                    binaryArgs[0] = soFar;
                    binaryArgs[1] = args[i];
                    soFar = func(binaryArgs);
                }

                return soFar;
            },
            verify
        );
    }

    /**
     * Numeric operators that can have 1 or more args.
     * @param func Function to apply.
     */
    public static Numeric(func: (arg0: ReadonlyArray<any>) => any): ExpressionEvaluator {
        return new ExpressionEvaluator(BuiltInFunctions.ApplySequence(func, BuiltInFunctions.VerifyNumber),
                                       ReturnType.Number, BuiltInFunctions.ValidateNumber);
    }

    /**
     * Comparison operators that have 2 args and work over strings or numbers.
     * @param func Function to apply.
     */
    public static Comparison(func: (arg0: ReadonlyArray<any>) => any): ExpressionEvaluator {
        return new ExpressionEvaluator(BuiltInFunctions.Apply(func, BuiltInFunctions.VerifyNumberOrString),
                                       ReturnType.Boolean, BuiltInFunctions.ValidateBinaryNumberOrString);
    }

    /**
     * Transform a string into another string.
     * @param func Function to apply.
     */
    public static StringTransform(func: (arg0: ReadonlyArray<any>) => any): ExpressionEvaluator {
        return new ExpressionEvaluator(BuiltInFunctions.Apply(func, BuiltInFunctions.VerifyString),
                                       ReturnType.String, BuiltInFunctions.ValidateUnaryString);
    }

    /**
     * Lookup a built-in function information by type.
     * @param type Type to look up.
     */
    public static Lookup(type: string): ExpressionEvaluator {
        const evaluator: ExpressionEvaluator = BuiltInFunctions._functions.get(type);
        if (evaluator === undefined) {
            throw new Error(`${type} does not have a built-in expression evaluator.`);
        }

        return evaluator;
    }

    private static BuildFunctionLookup(): Map<string, ExpressionEvaluator> {
        // tslint:disable-next-line: no-unnecessary-local-variable
        const functions: Map<string, ExpressionEvaluator>  =  new Map<string, ExpressionEvaluator>([
            //TODO
            //Math
            [ExpressionType.Add, BuiltInFunctions.Numeric(args => args[0] + args[1])],
            [ExpressionType.Multiply, BuiltInFunctions.Numeric(args => args[0] * args[1])]
        ]);

        return functions;
    }
}
