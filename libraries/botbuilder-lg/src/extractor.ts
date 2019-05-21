
/**
 * @module botbuilder-expression-lg
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable-next-line: no-submodule-imports
import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree';
import { keyBy } from 'lodash';
import * as lp from './generated/LGFileParser';
import { LGFileParserVisitor } from './generated/LGFileParserVisitor';
import { LGTemplate } from './lgTemplate';
import { stringify } from 'querystring';

// tslint:disable-next-line: completed-docs
export class Extractor extends AbstractParseTreeVisitor<Map<string, any>> implements LGFileParserVisitor<Map<string, any>> {
    public readonly Templates: LGTemplate[];
    public readonly TemplateMap: {[name: string]: LGTemplate};
    constructor(templates: LGTemplate[]) {
        super();
        this.Templates = templates;
        this.TemplateMap = keyBy(templates, (t: LGTemplate) => t.Name);
    }

    public Extract(): Map<string, any>[] {
        const result: Map<string, any>[] = [];
        this.Templates.forEach((template: LGTemplate) => {
            result.push(this.visit(template.ParseTree));
        });

        return result;
    }

    public visitTemplateDefinition(context: lp.TemplateDefinitionContext): Map<string, any> {
        const result: Map<string, any> = new Map<string, any>();
        const templateName: string = context.templateNameLine().templateName().text;
        const templateBodies: Map<string, any> = this.visit(context.templateBody());
        let isNormalTemplate: boolean = true;
        templateBodies.forEach((templateBody: Map<string, any>) => isNormalTemplate = isNormalTemplate && (templateBody === undefined));

        if (isNormalTemplate) {
            const templates: string[] = [];
            for (const templateBody of templateBodies) {
                templates.push(templateBody[0]);
            }
            result.set(templateName, templates);
        } else {
            result.set(templateName, templateBodies);
        }

        return result;
    }

    public visitNormalTemplateBody(context: lp.NormalTemplateBodyContext): Map<string, any> {
        const result: Map<string, any> = new Map<string, any>();
        for (const templateStr of context.normalTemplateString()) {
            result.set(templateStr.text, undefined);
        }

        return result;
    }

    public visitConditionalBody(context: lp.ConditionalBodyContext): Map<string, any> {
        const result: Map<string, any> = new Map<string, any>();
        const ifRules: lp.IfConditionRuleContext[] = context.conditionalTemplateBody().ifConditionRule();
        for (const ifRule of ifRules) {
            const expressions: TerminalNode[] = ifRule.ifCondition().EXPRESSION();
            const  conditionNode : lp.IfConditionContext = ifRule.ifCondition();
            const ifExpr : boolean = conditionNode.IF() !== undefined;
            const elseIfExpr : boolean = conditionNode.ELSEIF() !== undefined;
            const elseExpr : boolean = conditionNode.ELSE() !== undefined;

            const node : TerminalNode = ifExpr ? conditionNode.IF() :
                         elseIfExpr ? conditionNode.ELSEIF() :
                         conditionNode.ELSE();
            const conditionLabel: string = node.text.toLowerCase();
            const childTemplateBodyResult: string[] = [];
            const templateBodies: Map<string, any> = this.visit(ifRule.normalTemplateBody());
            for (const templateBody of templateBodies) {
                childTemplateBodyResult.push(templateBody[0]);
            }

            if (expressions !== undefined && expressions.length > 0) {
                if (expressions[0].text !== undefined) {
                    result.set(conditionLabel.toUpperCase().concat(' ') + expressions[0].text, childTemplateBodyResult);
                }
            } else {
                // tslint:disable-next-line: no-backbone-get-set-outside-model
                result.set('ELSE:', childTemplateBodyResult);
            }
        }

        return result;
    }

    /*
    public visitSwitchCaseBody(context: lp.SwitchCaseBodyContext): Map<string, any> {
        const result: Map<string, any> = new Map<string, any>();
        const caseNodes: lp.CaseConditionRuleContext[] = context.switchCaseTemplateBody().caseConditionRule();
        for (const caseNode of caseNodes) {
            const expression: TerminalNode = caseNode.caseCondition().EXPRESSION();
            const childTemplateBodyResult: string[] = [];
            const templateBodies: Map<string, any> = this.visit(caseNode.normalTemplateBody());
            for (const templateBody of templateBodies) {
                childTemplateBodyResult.push(templateBody[0]);
            }
            if (expression !== undefined) {
                result.set(expression.text, childTemplateBodyResult);
            }
        }

        const defaultNode: lp.DefaultConditionRuleContext = context.switchCaseTemplateBody().defaultConditionRule();
        const childTemplateBodyResult: string[] = [];
            const templateBodies: Map<string, any> = this.visit(defaultNode.normalTemplateBody());
            for (const templateBody of templateBodies) {
                childTemplateBodyResult.push(templateBody[0]);
            }
        result.set('DEFAULT', childTemplateBodyResult);
        
        return result; 
    }
*/

    protected defaultResult(): Map<string, any> {
        return new Map<string, any>();
    }
}
