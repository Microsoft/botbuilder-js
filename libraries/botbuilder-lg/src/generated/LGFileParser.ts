// Generated from ../LGFileParser.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { LGFileParserListener } from "./LGFileParserListener";
import { LGFileParserVisitor } from "./LGFileParserVisitor";


export class LGFileParser extends Parser {
	public static readonly COMMENTS = 1;
	public static readonly WS = 2;
	public static readonly NEWLINE = 3;
	public static readonly HASH = 4;
	public static readonly DASH = 5;
	public static readonly INVALID_TOKEN_DEFAULT_MODE = 6;
	public static readonly WS_IN_NAME = 7;
	public static readonly IDENTIFIER = 8;
	public static readonly DOT = 9;
	public static readonly OPEN_PARENTHESIS = 10;
	public static readonly CLOSE_PARENTHESIS = 11;
	public static readonly COMMA = 12;
	public static readonly INVALID_SEPERATE_CHAR = 13;
	public static readonly WS_IN_BODY_IGNORED = 14;
	public static readonly IF = 15;
	public static readonly ELSEIF = 16;
	public static readonly ELSE = 17;
	public static readonly MULTI_LINE_TEXT = 18;
	public static readonly ESCAPE_CHARACTER = 19;
	public static readonly INVALID_ESCAPE = 20;
	public static readonly EXPRESSION = 21;
	public static readonly TEMPLATE_REF = 22;
	public static readonly TEXT_SEPARATOR = 23;
	public static readonly TEXT = 24;
	public static readonly SWITCH = 25;
	public static readonly CASE = 26;
	public static readonly DEFAULT = 27;
	public static readonly RULE_file = 0;
	public static readonly RULE_paragraph = 1;
	public static readonly RULE_newline = 2;
	public static readonly RULE_templateDefinition = 3;
	public static readonly RULE_templateNameLine = 4;
	public static readonly RULE_templateName = 5;
	public static readonly RULE_parameters = 6;
	public static readonly RULE_templateBody = 7;
	public static readonly RULE_normalTemplateBody = 8;
	public static readonly RULE_normalTemplateString = 9;
	public static readonly RULE_conditionalTemplateBody = 10;
	public static readonly RULE_ifConditionRule = 11;
	public static readonly RULE_ifCondition = 12;
	public static readonly RULE_switchCaseTemplateBody = 13;
	public static readonly RULE_caseConditionRule = 14;
	public static readonly RULE_defaultConditionRule = 15;
	public static readonly RULE_switchStatement = 16;
	public static readonly RULE_caseCondition = 17;
	public static readonly RULE_defaultCondition = 18;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"file", "paragraph", "newline", "templateDefinition", "templateNameLine", 
		"templateName", "parameters", "templateBody", "normalTemplateBody", "normalTemplateString", 
		"conditionalTemplateBody", "ifConditionRule", "ifCondition", "switchCaseTemplateBody", 
		"caseConditionRule", "defaultConditionRule", "switchStatement", "caseCondition", 
		"defaultCondition",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, "'#'", undefined, undefined, 
		undefined, undefined, "'.'", "'('", "')'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "COMMENTS", "WS", "NEWLINE", "HASH", "DASH", "INVALID_TOKEN_DEFAULT_MODE", 
		"WS_IN_NAME", "IDENTIFIER", "DOT", "OPEN_PARENTHESIS", "CLOSE_PARENTHESIS", 
		"COMMA", "INVALID_SEPERATE_CHAR", "WS_IN_BODY_IGNORED", "IF", "ELSEIF", 
		"ELSE", "MULTI_LINE_TEXT", "ESCAPE_CHARACTER", "INVALID_ESCAPE", "EXPRESSION", 
		"TEMPLATE_REF", "TEXT_SEPARATOR", "TEXT", "SWITCH", "CASE", "DEFAULT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(LGFileParser._LITERAL_NAMES, LGFileParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return LGFileParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "LGFileParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return LGFileParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return LGFileParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(LGFileParser._ATN, this);
	}
	// @RuleVersion(0)
	public file(): FileContext {
		let _localctx: FileContext = new FileContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, LGFileParser.RULE_file);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 39;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 38;
					this.paragraph();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 41;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 43;
			this.match(LGFileParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paragraph(): ParagraphContext {
		let _localctx: ParagraphContext = new ParagraphContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, LGFileParser.RULE_paragraph);
		try {
			this.state = 47;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case LGFileParser.EOF:
			case LGFileParser.NEWLINE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 45;
				this.newline();
				}
				break;
			case LGFileParser.HASH:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 46;
				this.templateDefinition();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public newline(): NewlineContext {
		let _localctx: NewlineContext = new NewlineContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, LGFileParser.RULE_newline);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			_la = this._input.LA(1);
			if (!(_la === LGFileParser.EOF || _la === LGFileParser.NEWLINE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateDefinition(): TemplateDefinitionContext {
		let _localctx: TemplateDefinitionContext = new TemplateDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, LGFileParser.RULE_templateDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			this.templateNameLine();
			this.state = 52;
			this.newline();
			this.state = 54;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LGFileParser.DASH) {
				{
				this.state = 53;
				this.templateBody();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateNameLine(): TemplateNameLineContext {
		let _localctx: TemplateNameLineContext = new TemplateNameLineContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, LGFileParser.RULE_templateNameLine);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 56;
			this.match(LGFileParser.HASH);
			this.state = 57;
			this.templateName();
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LGFileParser.IDENTIFIER || _la === LGFileParser.OPEN_PARENTHESIS) {
				{
				this.state = 58;
				this.parameters();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateName(): TemplateNameContext {
		let _localctx: TemplateNameContext = new TemplateNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, LGFileParser.RULE_templateName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 61;
			this.match(LGFileParser.IDENTIFIER);
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === LGFileParser.DOT) {
				{
				{
				this.state = 62;
				this.match(LGFileParser.DOT);
				this.state = 63;
				this.match(LGFileParser.IDENTIFIER);
				}
				}
				this.state = 68;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let _localctx: ParametersContext = new ParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, LGFileParser.RULE_parameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LGFileParser.OPEN_PARENTHESIS) {
				{
				this.state = 69;
				this.match(LGFileParser.OPEN_PARENTHESIS);
				}
			}

			this.state = 72;
			this.match(LGFileParser.IDENTIFIER);
			this.state = 77;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === LGFileParser.COMMA || _la === LGFileParser.INVALID_SEPERATE_CHAR) {
				{
				{
				this.state = 73;
				_la = this._input.LA(1);
				if (!(_la === LGFileParser.COMMA || _la === LGFileParser.INVALID_SEPERATE_CHAR)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 74;
				this.match(LGFileParser.IDENTIFIER);
				}
				}
				this.state = 79;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LGFileParser.CLOSE_PARENTHESIS) {
				{
				this.state = 80;
				this.match(LGFileParser.CLOSE_PARENTHESIS);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateBody(): TemplateBodyContext {
		let _localctx: TemplateBodyContext = new TemplateBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, LGFileParser.RULE_templateBody);
		try {
			this.state = 86;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				_localctx = new NormalBodyContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 83;
				this.normalTemplateBody();
				}
				break;

			case 2:
				_localctx = new ConditionalBodyContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 84;
				this.conditionalTemplateBody();
				}
				break;

			case 3:
				_localctx = new SwitchCaseBodyContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 85;
				this.switchCaseTemplateBody();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public normalTemplateBody(): NormalTemplateBodyContext {
		let _localctx: NormalTemplateBodyContext = new NormalTemplateBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, LGFileParser.RULE_normalTemplateBody);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 91;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 88;
					this.normalTemplateString();
					this.state = 89;
					this.newline();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 93;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public normalTemplateString(): NormalTemplateStringContext {
		let _localctx: NormalTemplateStringContext = new NormalTemplateStringContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, LGFileParser.RULE_normalTemplateString);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 95;
			this.match(LGFileParser.DASH);
			this.state = 99;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LGFileParser.WS) | (1 << LGFileParser.MULTI_LINE_TEXT) | (1 << LGFileParser.ESCAPE_CHARACTER) | (1 << LGFileParser.INVALID_ESCAPE) | (1 << LGFileParser.EXPRESSION) | (1 << LGFileParser.TEMPLATE_REF) | (1 << LGFileParser.TEXT_SEPARATOR) | (1 << LGFileParser.TEXT))) !== 0)) {
				{
				{
				this.state = 96;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LGFileParser.WS) | (1 << LGFileParser.MULTI_LINE_TEXT) | (1 << LGFileParser.ESCAPE_CHARACTER) | (1 << LGFileParser.INVALID_ESCAPE) | (1 << LGFileParser.EXPRESSION) | (1 << LGFileParser.TEMPLATE_REF) | (1 << LGFileParser.TEXT_SEPARATOR) | (1 << LGFileParser.TEXT))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				}
				this.state = 101;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditionalTemplateBody(): ConditionalTemplateBodyContext {
		let _localctx: ConditionalTemplateBodyContext = new ConditionalTemplateBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, LGFileParser.RULE_conditionalTemplateBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 103;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 102;
				this.ifConditionRule();
				}
				}
				this.state = 105;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === LGFileParser.DASH);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifConditionRule(): IfConditionRuleContext {
		let _localctx: IfConditionRuleContext = new IfConditionRuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, LGFileParser.RULE_ifConditionRule);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this.ifCondition();
			this.state = 108;
			this.newline();
			this.state = 110;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				{
				this.state = 109;
				this.normalTemplateBody();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifCondition(): IfConditionContext {
		let _localctx: IfConditionContext = new IfConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, LGFileParser.RULE_ifCondition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 112;
			this.match(LGFileParser.DASH);
			this.state = 113;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LGFileParser.IF) | (1 << LGFileParser.ELSEIF) | (1 << LGFileParser.ELSE))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LGFileParser.WS) | (1 << LGFileParser.EXPRESSION) | (1 << LGFileParser.TEXT))) !== 0)) {
				{
				{
				this.state = 114;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << LGFileParser.WS) | (1 << LGFileParser.EXPRESSION) | (1 << LGFileParser.TEXT))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchCaseTemplateBody(): SwitchCaseTemplateBodyContext {
		let _localctx: SwitchCaseTemplateBodyContext = new SwitchCaseTemplateBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, LGFileParser.RULE_switchCaseTemplateBody);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 120;
			this.switchStatement();
			this.state = 122;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 121;
					this.caseConditionRule();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 124;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LGFileParser.DASH) {
				{
				this.state = 126;
				this.defaultConditionRule();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public caseConditionRule(): CaseConditionRuleContext {
		let _localctx: CaseConditionRuleContext = new CaseConditionRuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, LGFileParser.RULE_caseConditionRule);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 129;
			this.caseCondition();
			this.state = 130;
			this.newline();
			this.state = 132;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				{
				this.state = 131;
				this.normalTemplateBody();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public defaultConditionRule(): DefaultConditionRuleContext {
		let _localctx: DefaultConditionRuleContext = new DefaultConditionRuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, LGFileParser.RULE_defaultConditionRule);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 134;
			this.defaultCondition();
			this.state = 135;
			this.newline();
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === LGFileParser.DASH) {
				{
				this.state = 136;
				this.normalTemplateBody();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchStatement(): SwitchStatementContext {
		let _localctx: SwitchStatementContext = new SwitchStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, LGFileParser.RULE_switchStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.match(LGFileParser.DASH);
			this.state = 140;
			this.match(LGFileParser.SWITCH);
			this.state = 141;
			this.match(LGFileParser.EXPRESSION);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public caseCondition(): CaseConditionContext {
		let _localctx: CaseConditionContext = new CaseConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, LGFileParser.RULE_caseCondition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 143;
			this.match(LGFileParser.DASH);
			this.state = 144;
			this.match(LGFileParser.CASE);
			this.state = 145;
			this.match(LGFileParser.EXPRESSION);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public defaultCondition(): DefaultConditionContext {
		let _localctx: DefaultConditionContext = new DefaultConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, LGFileParser.RULE_defaultCondition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			this.match(LGFileParser.DASH);
			this.state = 148;
			this.match(LGFileParser.DEFAULT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x03\x1D\x99\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x03\x02\x06\x02*\n\x02\r\x02\x0E\x02+\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x05\x032\n\x03\x03\x04\x03\x04\x03\x05\x03\x05" +
		"\x03\x05\x05\x059\n\x05\x03\x06\x03\x06\x03\x06\x05\x06>\n\x06\x03\x07" +
		"\x03\x07\x03\x07\x07\x07C\n\x07\f\x07\x0E\x07F\v\x07\x03\b\x05\bI\n\b" +
		"\x03\b\x03\b\x03\b\x07\bN\n\b\f\b\x0E\bQ\v\b\x03\b\x05\bT\n\b\x03\t\x03" +
		"\t\x03\t\x05\tY\n\t\x03\n\x03\n\x03\n\x06\n^\n\n\r\n\x0E\n_\x03\v\x03" +
		"\v\x07\vd\n\v\f\v\x0E\vg\v\v\x03\f\x06\fj\n\f\r\f\x0E\fk\x03\r\x03\r\x03" +
		"\r\x05\rq\n\r\x03\x0E\x03\x0E\x03\x0E\x07\x0Ev\n\x0E\f\x0E\x0E\x0Ey\v" +
		"\x0E\x03\x0F\x03\x0F\x06\x0F}\n\x0F\r\x0F\x0E\x0F~\x03\x0F\x05\x0F\x82" +
		"\n\x0F\x03\x10\x03\x10\x03\x10\x05\x10\x87\n\x10\x03\x11\x03\x11\x03\x11" +
		"\x05\x11\x8C\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03+\x02\x02\x15\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02\x02\x07\x03" +
		"\x03\x05\x05\x03\x02\x0E\x0F\x04\x02\x04\x04\x14\x1A\x03\x02\x11\x13\x05" +
		"\x02\x04\x04\x17\x17\x1A\x1A\x98\x02)\x03\x02\x02\x02\x041\x03\x02\x02" +
		"\x02\x063\x03\x02\x02\x02\b5\x03\x02\x02\x02\n:\x03\x02\x02\x02\f?\x03" +
		"\x02\x02\x02\x0EH\x03\x02\x02\x02\x10X\x03\x02\x02\x02\x12]\x03\x02\x02" +
		"\x02\x14a\x03\x02\x02\x02\x16i\x03\x02\x02\x02\x18m\x03\x02\x02\x02\x1A" +
		"r\x03\x02\x02\x02\x1Cz\x03\x02\x02\x02\x1E\x83\x03\x02\x02\x02 \x88\x03" +
		"\x02\x02\x02\"\x8D\x03\x02\x02\x02$\x91\x03\x02\x02\x02&\x95\x03\x02\x02" +
		"\x02(*\x05\x04\x03\x02)(\x03\x02\x02\x02*+\x03\x02\x02\x02+,\x03\x02\x02" +
		"\x02+)\x03\x02\x02\x02,-\x03\x02\x02\x02-.\x07\x02\x02\x03.\x03\x03\x02" +
		"\x02\x02/2\x05\x06\x04\x0202\x05\b\x05\x021/\x03\x02\x02\x0210\x03\x02" +
		"\x02\x022\x05\x03\x02\x02\x0234\t\x02\x02\x024\x07\x03\x02\x02\x0256\x05" +
		"\n\x06\x0268\x05\x06\x04\x0279\x05\x10\t\x0287\x03\x02\x02\x0289\x03\x02" +
		"\x02\x029\t\x03\x02\x02\x02:;\x07\x06\x02\x02;=\x05\f\x07\x02<>\x05\x0E" +
		"\b\x02=<\x03\x02\x02\x02=>\x03\x02\x02\x02>\v\x03\x02\x02\x02?D\x07\n" +
		"\x02\x02@A\x07\v\x02\x02AC\x07\n\x02\x02B@\x03\x02\x02\x02CF\x03\x02\x02" +
		"\x02DB\x03\x02\x02\x02DE\x03\x02\x02\x02E\r\x03\x02\x02\x02FD\x03\x02" +
		"\x02\x02GI\x07\f\x02\x02HG\x03\x02\x02\x02HI\x03\x02\x02\x02IJ\x03\x02" +
		"\x02\x02JO\x07\n\x02\x02KL\t\x03\x02\x02LN\x07\n\x02\x02MK\x03\x02\x02" +
		"\x02NQ\x03\x02\x02\x02OM\x03\x02\x02\x02OP\x03\x02\x02\x02PS\x03\x02\x02" +
		"\x02QO\x03\x02\x02\x02RT\x07\r\x02\x02SR\x03\x02\x02\x02ST\x03\x02\x02" +
		"\x02T\x0F\x03\x02\x02\x02UY\x05\x12\n\x02VY\x05\x16\f\x02WY\x05\x1C\x0F" +
		"\x02XU\x03\x02\x02\x02XV\x03\x02\x02\x02XW\x03\x02\x02\x02Y\x11\x03\x02" +
		"\x02\x02Z[\x05\x14\v\x02[\\\x05\x06\x04\x02\\^\x03\x02\x02\x02]Z\x03\x02" +
		"\x02\x02^_\x03\x02\x02\x02_]\x03\x02\x02\x02_`\x03\x02\x02\x02`\x13\x03" +
		"\x02\x02\x02ae\x07\x07\x02\x02bd\t\x04\x02\x02cb\x03\x02\x02\x02dg\x03" +
		"\x02\x02\x02ec\x03\x02\x02\x02ef\x03\x02\x02\x02f\x15\x03\x02\x02\x02" +
		"ge\x03\x02\x02\x02hj\x05\x18\r\x02ih\x03\x02\x02\x02jk\x03\x02\x02\x02" +
		"ki\x03\x02\x02\x02kl\x03\x02\x02\x02l\x17\x03\x02\x02\x02mn\x05\x1A\x0E" +
		"\x02np\x05\x06\x04\x02oq\x05\x12\n\x02po\x03\x02\x02\x02pq\x03\x02\x02" +
		"\x02q\x19\x03\x02\x02\x02rs\x07\x07\x02\x02sw\t\x05\x02\x02tv\t\x06\x02" +
		"\x02ut\x03\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02" +
		"\x02x\x1B\x03\x02\x02\x02yw\x03\x02\x02\x02z|\x05\"\x12\x02{}\x05\x1E" +
		"\x10\x02|{\x03\x02\x02\x02}~\x03\x02\x02\x02~|\x03\x02\x02\x02~\x7F\x03" +
		"\x02\x02\x02\x7F\x81\x03\x02\x02\x02\x80\x82\x05 \x11\x02\x81\x80\x03" +
		"\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x1D\x03\x02\x02\x02\x83\x84\x05" +
		"$\x13\x02\x84\x86\x05\x06\x04\x02\x85\x87\x05\x12\n\x02\x86\x85\x03\x02" +
		"\x02\x02\x86\x87\x03\x02\x02\x02\x87\x1F\x03\x02\x02\x02\x88\x89\x05&" +
		"\x14\x02\x89\x8B\x05\x06\x04\x02\x8A\x8C\x05\x12\n\x02\x8B\x8A\x03\x02" +
		"\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C!\x03\x02\x02\x02\x8D\x8E\x07\x07" +
		"\x02\x02\x8E\x8F\x07\x1B\x02\x02\x8F\x90\x07\x17\x02\x02\x90#\x03\x02" +
		"\x02\x02\x91\x92\x07\x07\x02\x02\x92\x93\x07\x1C\x02\x02\x93\x94\x07\x17" +
		"\x02\x02\x94%\x03\x02\x02\x02\x95\x96\x07\x07\x02\x02\x96\x97\x07\x1D" +
		"\x02\x02\x97\'\x03\x02\x02\x02\x14+18=DHOSX_ekpw~\x81\x86\x8B";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LGFileParser.__ATN) {
			LGFileParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(LGFileParser._serializedATN));
		}

		return LGFileParser.__ATN;
	}

}

export class FileContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(LGFileParser.EOF, 0); }
	public paragraph(): ParagraphContext[];
	public paragraph(i: number): ParagraphContext;
	public paragraph(i?: number): ParagraphContext | ParagraphContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParagraphContext);
		} else {
			return this.getRuleContext(i, ParagraphContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_file; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterFile) {
			listener.enterFile(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitFile) {
			listener.exitFile(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitFile) {
			return visitor.visitFile(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParagraphContext extends ParserRuleContext {
	public newline(): NewlineContext | undefined {
		return this.tryGetRuleContext(0, NewlineContext);
	}
	public templateDefinition(): TemplateDefinitionContext | undefined {
		return this.tryGetRuleContext(0, TemplateDefinitionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_paragraph; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterParagraph) {
			listener.enterParagraph(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitParagraph) {
			listener.exitParagraph(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitParagraph) {
			return visitor.visitParagraph(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NewlineContext extends ParserRuleContext {
	public NEWLINE(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.NEWLINE, 0); }
	public EOF(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_newline; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterNewline) {
			listener.enterNewline(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitNewline) {
			listener.exitNewline(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitNewline) {
			return visitor.visitNewline(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateDefinitionContext extends ParserRuleContext {
	public templateNameLine(): TemplateNameLineContext {
		return this.getRuleContext(0, TemplateNameLineContext);
	}
	public newline(): NewlineContext {
		return this.getRuleContext(0, NewlineContext);
	}
	public templateBody(): TemplateBodyContext | undefined {
		return this.tryGetRuleContext(0, TemplateBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_templateDefinition; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterTemplateDefinition) {
			listener.enterTemplateDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitTemplateDefinition) {
			listener.exitTemplateDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitTemplateDefinition) {
			return visitor.visitTemplateDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateNameLineContext extends ParserRuleContext {
	public HASH(): TerminalNode { return this.getToken(LGFileParser.HASH, 0); }
	public templateName(): TemplateNameContext {
		return this.getRuleContext(0, TemplateNameContext);
	}
	public parameters(): ParametersContext | undefined {
		return this.tryGetRuleContext(0, ParametersContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_templateNameLine; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterTemplateNameLine) {
			listener.enterTemplateNameLine(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitTemplateNameLine) {
			listener.exitTemplateNameLine(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitTemplateNameLine) {
			return visitor.visitTemplateNameLine(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateNameContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.IDENTIFIER);
		} else {
			return this.getToken(LGFileParser.IDENTIFIER, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.DOT);
		} else {
			return this.getToken(LGFileParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_templateName; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterTemplateName) {
			listener.enterTemplateName(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitTemplateName) {
			listener.exitTemplateName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitTemplateName) {
			return visitor.visitTemplateName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.IDENTIFIER);
		} else {
			return this.getToken(LGFileParser.IDENTIFIER, i);
		}
	}
	public OPEN_PARENTHESIS(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.OPEN_PARENTHESIS, 0); }
	public CLOSE_PARENTHESIS(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.CLOSE_PARENTHESIS, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.COMMA);
		} else {
			return this.getToken(LGFileParser.COMMA, i);
		}
	}
	public INVALID_SEPERATE_CHAR(): TerminalNode[];
	public INVALID_SEPERATE_CHAR(i: number): TerminalNode;
	public INVALID_SEPERATE_CHAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.INVALID_SEPERATE_CHAR);
		} else {
			return this.getToken(LGFileParser.INVALID_SEPERATE_CHAR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_parameters; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterParameters) {
			listener.enterParameters(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitParameters) {
			listener.exitParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateBodyContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_templateBody; }
	public copyFrom(ctx: TemplateBodyContext): void {
		super.copyFrom(ctx);
	}
}
export class SwitchCaseBodyContext extends TemplateBodyContext {
	public switchCaseTemplateBody(): SwitchCaseTemplateBodyContext {
		return this.getRuleContext(0, SwitchCaseTemplateBodyContext);
	}
	constructor(ctx: TemplateBodyContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterSwitchCaseBody) {
			listener.enterSwitchCaseBody(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitSwitchCaseBody) {
			listener.exitSwitchCaseBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitSwitchCaseBody) {
			return visitor.visitSwitchCaseBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NormalBodyContext extends TemplateBodyContext {
	public normalTemplateBody(): NormalTemplateBodyContext {
		return this.getRuleContext(0, NormalTemplateBodyContext);
	}
	constructor(ctx: TemplateBodyContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterNormalBody) {
			listener.enterNormalBody(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitNormalBody) {
			listener.exitNormalBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitNormalBody) {
			return visitor.visitNormalBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConditionalBodyContext extends TemplateBodyContext {
	public conditionalTemplateBody(): ConditionalTemplateBodyContext {
		return this.getRuleContext(0, ConditionalTemplateBodyContext);
	}
	constructor(ctx: TemplateBodyContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterConditionalBody) {
			listener.enterConditionalBody(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitConditionalBody) {
			listener.exitConditionalBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitConditionalBody) {
			return visitor.visitConditionalBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NormalTemplateBodyContext extends ParserRuleContext {
	public normalTemplateString(): NormalTemplateStringContext[];
	public normalTemplateString(i: number): NormalTemplateStringContext;
	public normalTemplateString(i?: number): NormalTemplateStringContext | NormalTemplateStringContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NormalTemplateStringContext);
		} else {
			return this.getRuleContext(i, NormalTemplateStringContext);
		}
	}
	public newline(): NewlineContext[];
	public newline(i: number): NewlineContext;
	public newline(i?: number): NewlineContext | NewlineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NewlineContext);
		} else {
			return this.getRuleContext(i, NewlineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_normalTemplateBody; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterNormalTemplateBody) {
			listener.enterNormalTemplateBody(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitNormalTemplateBody) {
			listener.exitNormalTemplateBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitNormalTemplateBody) {
			return visitor.visitNormalTemplateBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NormalTemplateStringContext extends ParserRuleContext {
	public DASH(): TerminalNode { return this.getToken(LGFileParser.DASH, 0); }
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.WS);
		} else {
			return this.getToken(LGFileParser.WS, i);
		}
	}
	public TEXT(): TerminalNode[];
	public TEXT(i: number): TerminalNode;
	public TEXT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.TEXT);
		} else {
			return this.getToken(LGFileParser.TEXT, i);
		}
	}
	public EXPRESSION(): TerminalNode[];
	public EXPRESSION(i: number): TerminalNode;
	public EXPRESSION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.EXPRESSION);
		} else {
			return this.getToken(LGFileParser.EXPRESSION, i);
		}
	}
	public TEMPLATE_REF(): TerminalNode[];
	public TEMPLATE_REF(i: number): TerminalNode;
	public TEMPLATE_REF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.TEMPLATE_REF);
		} else {
			return this.getToken(LGFileParser.TEMPLATE_REF, i);
		}
	}
	public TEXT_SEPARATOR(): TerminalNode[];
	public TEXT_SEPARATOR(i: number): TerminalNode;
	public TEXT_SEPARATOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.TEXT_SEPARATOR);
		} else {
			return this.getToken(LGFileParser.TEXT_SEPARATOR, i);
		}
	}
	public MULTI_LINE_TEXT(): TerminalNode[];
	public MULTI_LINE_TEXT(i: number): TerminalNode;
	public MULTI_LINE_TEXT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.MULTI_LINE_TEXT);
		} else {
			return this.getToken(LGFileParser.MULTI_LINE_TEXT, i);
		}
	}
	public ESCAPE_CHARACTER(): TerminalNode[];
	public ESCAPE_CHARACTER(i: number): TerminalNode;
	public ESCAPE_CHARACTER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.ESCAPE_CHARACTER);
		} else {
			return this.getToken(LGFileParser.ESCAPE_CHARACTER, i);
		}
	}
	public INVALID_ESCAPE(): TerminalNode[];
	public INVALID_ESCAPE(i: number): TerminalNode;
	public INVALID_ESCAPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.INVALID_ESCAPE);
		} else {
			return this.getToken(LGFileParser.INVALID_ESCAPE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_normalTemplateString; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterNormalTemplateString) {
			listener.enterNormalTemplateString(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitNormalTemplateString) {
			listener.exitNormalTemplateString(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitNormalTemplateString) {
			return visitor.visitNormalTemplateString(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalTemplateBodyContext extends ParserRuleContext {
	public ifConditionRule(): IfConditionRuleContext[];
	public ifConditionRule(i: number): IfConditionRuleContext;
	public ifConditionRule(i?: number): IfConditionRuleContext | IfConditionRuleContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IfConditionRuleContext);
		} else {
			return this.getRuleContext(i, IfConditionRuleContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_conditionalTemplateBody; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterConditionalTemplateBody) {
			listener.enterConditionalTemplateBody(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitConditionalTemplateBody) {
			listener.exitConditionalTemplateBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitConditionalTemplateBody) {
			return visitor.visitConditionalTemplateBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfConditionRuleContext extends ParserRuleContext {
	public ifCondition(): IfConditionContext {
		return this.getRuleContext(0, IfConditionContext);
	}
	public newline(): NewlineContext {
		return this.getRuleContext(0, NewlineContext);
	}
	public normalTemplateBody(): NormalTemplateBodyContext | undefined {
		return this.tryGetRuleContext(0, NormalTemplateBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_ifConditionRule; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterIfConditionRule) {
			listener.enterIfConditionRule(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitIfConditionRule) {
			listener.exitIfConditionRule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitIfConditionRule) {
			return visitor.visitIfConditionRule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfConditionContext extends ParserRuleContext {
	public DASH(): TerminalNode { return this.getToken(LGFileParser.DASH, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.IF, 0); }
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.ELSE, 0); }
	public ELSEIF(): TerminalNode | undefined { return this.tryGetToken(LGFileParser.ELSEIF, 0); }
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.WS);
		} else {
			return this.getToken(LGFileParser.WS, i);
		}
	}
	public TEXT(): TerminalNode[];
	public TEXT(i: number): TerminalNode;
	public TEXT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.TEXT);
		} else {
			return this.getToken(LGFileParser.TEXT, i);
		}
	}
	public EXPRESSION(): TerminalNode[];
	public EXPRESSION(i: number): TerminalNode;
	public EXPRESSION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(LGFileParser.EXPRESSION);
		} else {
			return this.getToken(LGFileParser.EXPRESSION, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_ifCondition; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterIfCondition) {
			listener.enterIfCondition(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitIfCondition) {
			listener.exitIfCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitIfCondition) {
			return visitor.visitIfCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchCaseTemplateBodyContext extends ParserRuleContext {
	public switchStatement(): SwitchStatementContext {
		return this.getRuleContext(0, SwitchStatementContext);
	}
	public caseConditionRule(): CaseConditionRuleContext[];
	public caseConditionRule(i: number): CaseConditionRuleContext;
	public caseConditionRule(i?: number): CaseConditionRuleContext | CaseConditionRuleContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CaseConditionRuleContext);
		} else {
			return this.getRuleContext(i, CaseConditionRuleContext);
		}
	}
	public defaultConditionRule(): DefaultConditionRuleContext | undefined {
		return this.tryGetRuleContext(0, DefaultConditionRuleContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_switchCaseTemplateBody; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterSwitchCaseTemplateBody) {
			listener.enterSwitchCaseTemplateBody(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitSwitchCaseTemplateBody) {
			listener.exitSwitchCaseTemplateBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitSwitchCaseTemplateBody) {
			return visitor.visitSwitchCaseTemplateBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CaseConditionRuleContext extends ParserRuleContext {
	public caseCondition(): CaseConditionContext {
		return this.getRuleContext(0, CaseConditionContext);
	}
	public newline(): NewlineContext {
		return this.getRuleContext(0, NewlineContext);
	}
	public normalTemplateBody(): NormalTemplateBodyContext | undefined {
		return this.tryGetRuleContext(0, NormalTemplateBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_caseConditionRule; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterCaseConditionRule) {
			listener.enterCaseConditionRule(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitCaseConditionRule) {
			listener.exitCaseConditionRule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitCaseConditionRule) {
			return visitor.visitCaseConditionRule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefaultConditionRuleContext extends ParserRuleContext {
	public defaultCondition(): DefaultConditionContext {
		return this.getRuleContext(0, DefaultConditionContext);
	}
	public newline(): NewlineContext {
		return this.getRuleContext(0, NewlineContext);
	}
	public normalTemplateBody(): NormalTemplateBodyContext | undefined {
		return this.tryGetRuleContext(0, NormalTemplateBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_defaultConditionRule; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterDefaultConditionRule) {
			listener.enterDefaultConditionRule(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitDefaultConditionRule) {
			listener.exitDefaultConditionRule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitDefaultConditionRule) {
			return visitor.visitDefaultConditionRule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchStatementContext extends ParserRuleContext {
	public DASH(): TerminalNode { return this.getToken(LGFileParser.DASH, 0); }
	public SWITCH(): TerminalNode { return this.getToken(LGFileParser.SWITCH, 0); }
	public EXPRESSION(): TerminalNode { return this.getToken(LGFileParser.EXPRESSION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_switchStatement; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterSwitchStatement) {
			listener.enterSwitchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitSwitchStatement) {
			listener.exitSwitchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitSwitchStatement) {
			return visitor.visitSwitchStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CaseConditionContext extends ParserRuleContext {
	public DASH(): TerminalNode { return this.getToken(LGFileParser.DASH, 0); }
	public CASE(): TerminalNode { return this.getToken(LGFileParser.CASE, 0); }
	public EXPRESSION(): TerminalNode { return this.getToken(LGFileParser.EXPRESSION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_caseCondition; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterCaseCondition) {
			listener.enterCaseCondition(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitCaseCondition) {
			listener.exitCaseCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitCaseCondition) {
			return visitor.visitCaseCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefaultConditionContext extends ParserRuleContext {
	public DASH(): TerminalNode { return this.getToken(LGFileParser.DASH, 0); }
	public DEFAULT(): TerminalNode { return this.getToken(LGFileParser.DEFAULT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return LGFileParser.RULE_defaultCondition; }
	// @Override
	public enterRule(listener: LGFileParserListener): void {
		if (listener.enterDefaultCondition) {
			listener.enterDefaultCondition(this);
		}
	}
	// @Override
	public exitRule(listener: LGFileParserListener): void {
		if (listener.exitDefaultCondition) {
			listener.exitDefaultCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LGFileParserVisitor<Result>): Result {
		if (visitor.visitDefaultCondition) {
			return visitor.visitDefaultCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


