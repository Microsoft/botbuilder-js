import { Expression, ReturnType } from "./expression";
import { ExpressionType } from "./expressionType";
import { ExpressionEvaluator } from "./expressionEvaluator";

export class Constant extends Expression {
    public constructor(value: any = undefined){
        super(ExpressionType.Constant, new ExpressionEvaluator(
            (expression: Expression, state: any):{value: any; error: string}  => {
                return {value:(expression as Constant).Value ,error:undefined};
            }
        ));
        this.Value = value;
    }

    public get Value():any  {
        return this._value;
    }

    public set Value(theValue: any) {
        this._evaluator.ReturnType = 
        typeof theValue === "string" ? ReturnType.String
        : Number.isNaN(theValue) ? ReturnType.Number
        : typeof theValue === "boolean" ? ReturnType.Boolean
        : ReturnType.Object;

        this._value = theValue; 
    }

    private _value: any;

    public toString(): string {
        if(typeof this.Value === "string") {
            return `'${this.Value}'`;
        }
        else {
            return this.Value === undefined ? undefined : this.Value.toString();
        }
    }
}