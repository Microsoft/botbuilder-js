// Generated from ../LGFileLexer.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class LGFileLexer extends Lexer {
	public static readonly OPTIONS = 1;
	public static readonly COMMENTS = 2;
	public static readonly WS = 3;
	public static readonly NEWLINE = 4;
	public static readonly HASH = 5;
	public static readonly DASH = 6;
	public static readonly OBJECT_DEFINITION = 7;
	public static readonly EXPRESSION_FRAGMENT = 8;
	public static readonly LEFT_SQUARE_BRACKET = 9;
	public static readonly IMPORT = 10;
	public static readonly INVALID_TOKEN = 11;
	public static readonly WS_IN_NAME = 12;
	public static readonly NEWLINE_IN_NAME = 13;
	public static readonly IDENTIFIER = 14;
	public static readonly DOT = 15;
	public static readonly OPEN_PARENTHESIS = 16;
	public static readonly CLOSE_PARENTHESIS = 17;
	public static readonly COMMA = 18;
	public static readonly TEXT_IN_NAME = 19;
	public static readonly WS_IN_BODY = 20;
	public static readonly MULTILINE_PREFIX = 21;
	public static readonly NEWLINE_IN_BODY = 22;
	public static readonly IF = 23;
	public static readonly ELSEIF = 24;
	public static readonly ELSE = 25;
	public static readonly SWITCH = 26;
	public static readonly CASE = 27;
	public static readonly DEFAULT = 28;
	public static readonly ESCAPE_CHARACTER = 29;
	public static readonly EXPRESSION = 30;
	public static readonly TEXT = 31;
	public static readonly MULTILINE_SUFFIX = 32;
	public static readonly WS_IN_STRUCTURE_NAME = 33;
	public static readonly NEWLINE_IN_STRUCTURE_NAME = 34;
	public static readonly STRUCTURE_NAME = 35;
	public static readonly TEXT_IN_STRUCTURE_NAME = 36;
	public static readonly STRUCTURED_COMMENTS = 37;
	public static readonly WS_IN_STRUCTURE_BODY = 38;
	public static readonly STRUCTURED_NEWLINE = 39;
	public static readonly STRUCTURED_BODY_END = 40;
	public static readonly STRUCTURE_IDENTIFIER = 41;
	public static readonly STRUCTURE_EQUALS = 42;
	public static readonly STRUCTURE_OR_MARK = 43;
	public static readonly ESCAPE_CHARACTER_IN_STRUCTURE_BODY = 44;
	public static readonly EXPRESSION_IN_STRUCTURE_BODY = 45;
	public static readonly TEXT_IN_STRUCTURE_BODY = 46;
	public static readonly TEMPLATE_NAME_MODE = 1;
	public static readonly TEMPLATE_BODY_MODE = 2;
	public static readonly MULTILINE_MODE = 3;
	public static readonly STRUCTURE_NAME_MODE = 4;
	public static readonly STRUCTURE_BODY_MODE = 5;
	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE", "TEMPLATE_NAME_MODE", "TEMPLATE_BODY_MODE", "MULTILINE_MODE", 
		"STRUCTURE_NAME_MODE", "STRUCTURE_BODY_MODE",
	];

	public static readonly ruleNames: string[] = [
		"A", "C", "D", "E", "F", "H", "I", "L", "S", "T", "U", "W", "LETTER", 
		"NUMBER", "WHITESPACE", "EMPTY_OBJECT", "STRING_LITERAL", "STRING_INTERPOLATION", 
		"ESCAPE_CHARACTER_FRAGMENT", "OPTIONS", "COMMENTS", "WS", "NEWLINE", "HASH", 
		"DASH", "OBJECT_DEFINITION", "EXPRESSION_FRAGMENT", "LEFT_SQUARE_BRACKET", 
		"IMPORT", "INVALID_TOKEN", "WS_IN_NAME", "NEWLINE_IN_NAME", "IDENTIFIER", 
		"DOT", "OPEN_PARENTHESIS", "CLOSE_PARENTHESIS", "COMMA", "TEXT_IN_NAME", 
		"WS_IN_BODY", "MULTILINE_PREFIX", "NEWLINE_IN_BODY", "IF", "ELSEIF", "ELSE", 
		"SWITCH", "CASE", "DEFAULT", "ESCAPE_CHARACTER", "EXPRESSION", "TEXT", 
		"MULTILINE_SUFFIX", "MULTILINE_ESCAPE_CHARACTER", "MULTILINE_EXPRESSION", 
		"MULTILINE_TEXT", "WS_IN_STRUCTURE_NAME", "NEWLINE_IN_STRUCTURE_NAME", 
		"STRUCTURE_NAME", "TEXT_IN_STRUCTURE_NAME", "STRUCTURED_COMMENTS", "WS_IN_STRUCTURE_BODY", 
		"STRUCTURED_NEWLINE", "STRUCTURED_BODY_END", "STRUCTURE_IDENTIFIER", "STRUCTURE_EQUALS", 
		"STRUCTURE_OR_MARK", "ESCAPE_CHARACTER_IN_STRUCTURE_BODY", "EXPRESSION_IN_STRUCTURE_BODY", 
		"TEXT_IN_STRUCTURE_BODY",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "'.'", "'('", "')'", "','", undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"'|'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPTIONS", "COMMENTS", "WS", "NEWLINE", "HASH", "DASH", "OBJECT_DEFINITION", 
		"EXPRESSION_FRAGMENT", "LEFT_SQUARE_BRACKET", "IMPORT", "INVALID_TOKEN", 
		"WS_IN_NAME", "NEWLINE_IN_NAME", "IDENTIFIER", "DOT", "OPEN_PARENTHESIS", 
		"CLOSE_PARENTHESIS", "COMMA", "TEXT_IN_NAME", "WS_IN_BODY", "MULTILINE_PREFIX", 
		"NEWLINE_IN_BODY", "IF", "ELSEIF", "ELSE", "SWITCH", "CASE", "DEFAULT", 
		"ESCAPE_CHARACTER", "EXPRESSION", "TEXT", "MULTILINE_SUFFIX", "WS_IN_STRUCTURE_NAME", 
		"NEWLINE_IN_STRUCTURE_NAME", "STRUCTURE_NAME", "TEXT_IN_STRUCTURE_NAME", 
		"STRUCTURED_COMMENTS", "WS_IN_STRUCTURE_BODY", "STRUCTURED_NEWLINE", "STRUCTURED_BODY_END", 
		"STRUCTURE_IDENTIFIER", "STRUCTURE_EQUALS", "STRUCTURE_OR_MARK", "ESCAPE_CHARACTER_IN_STRUCTURE_BODY", 
		"EXPRESSION_IN_STRUCTURE_BODY", "TEXT_IN_STRUCTURE_BODY",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(LGFileLexer._LITERAL_NAMES, LGFileLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return LGFileLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	  ignoreWS = true; // usually we ignore whitespace, but inside template, whitespace is significant
	  inTemplate = false; // whether we are in the template
	  beginOfTemplateBody = false; // whether we are at the begining of template body
	  inMultiline = false; // whether we are in multiline
	  beginOfTemplateLine = false;// weather we are at the begining of template string
	  inStructuredValue = false; // weather we are in the structure value
	  beginOfStructureProperty = false; // weather we are at the begining of structure property


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(LGFileLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "LGFileLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return LGFileLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return LGFileLexer._serializedATN; }

	// @Override
	public get modeNames(): string[] { return LGFileLexer.modeNames; }

	// @Override
	public action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void {
		switch (ruleIndex) {
		case 23:
			this.HASH_action(_localctx, actionIndex);
			break;

		case 24:
			this.DASH_action(_localctx, actionIndex);
			break;

		case 28:
			this.IMPORT_action(_localctx, actionIndex);
			break;

		case 29:
			this.INVALID_TOKEN_action(_localctx, actionIndex);
			break;

		case 31:
			this.NEWLINE_IN_NAME_action(_localctx, actionIndex);
			break;

		case 39:
			this.MULTILINE_PREFIX_action(_localctx, actionIndex);
			break;

		case 40:
			this.NEWLINE_IN_BODY_action(_localctx, actionIndex);
			break;

		case 41:
			this.IF_action(_localctx, actionIndex);
			break;

		case 42:
			this.ELSEIF_action(_localctx, actionIndex);
			break;

		case 43:
			this.ELSE_action(_localctx, actionIndex);
			break;

		case 44:
			this.SWITCH_action(_localctx, actionIndex);
			break;

		case 45:
			this.CASE_action(_localctx, actionIndex);
			break;

		case 46:
			this.DEFAULT_action(_localctx, actionIndex);
			break;

		case 47:
			this.ESCAPE_CHARACTER_action(_localctx, actionIndex);
			break;

		case 48:
			this.EXPRESSION_action(_localctx, actionIndex);
			break;

		case 49:
			this.TEXT_action(_localctx, actionIndex);
			break;

		case 50:
			this.MULTILINE_SUFFIX_action(_localctx, actionIndex);
			break;

		case 55:
			this.NEWLINE_IN_STRUCTURE_NAME_action(_localctx, actionIndex);
			break;

		case 60:
			this.STRUCTURED_NEWLINE_action(_localctx, actionIndex);
			break;

		case 61:
			this.STRUCTURED_BODY_END_action(_localctx, actionIndex);
			break;

		case 62:
			this.STRUCTURE_IDENTIFIER_action(_localctx, actionIndex);
			break;

		case 63:
			this.STRUCTURE_EQUALS_action(_localctx, actionIndex);
			break;

		case 64:
			this.STRUCTURE_OR_MARK_action(_localctx, actionIndex);
			break;

		case 65:
			this.ESCAPE_CHARACTER_IN_STRUCTURE_BODY_action(_localctx, actionIndex);
			break;

		case 66:
			this.EXPRESSION_IN_STRUCTURE_BODY_action(_localctx, actionIndex);
			break;

		case 67:
			this.TEXT_IN_STRUCTURE_BODY_action(_localctx, actionIndex);
			break;
		}
	}
	private HASH_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 0:
			 this.inTemplate = true; this.beginOfTemplateBody = false; 
			break;
		}
	}
	private DASH_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 1:
			 this.beginOfTemplateLine = true; this.beginOfTemplateBody = false; 
			break;
		}
	}
	private IMPORT_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 2:
			 this.inTemplate = false;
			break;
		}
	}
	private INVALID_TOKEN_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 3:
			 this.inTemplate = false; this.beginOfTemplateBody = false; 
			break;
		}
	}
	private NEWLINE_IN_NAME_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 4:
			 this.beginOfTemplateBody = true;
			break;
		}
	}
	private MULTILINE_PREFIX_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 5:
			 this.inMultiline = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private NEWLINE_IN_BODY_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 6:
			 this.ignoreWS = true;
			break;
		}
	}
	private IF_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 7:
			 this.ignoreWS = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private ELSEIF_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 8:
			 this.ignoreWS = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private ELSE_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 9:
			 this.ignoreWS = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private SWITCH_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 10:
			 this.ignoreWS = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private CASE_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 11:
			 this.ignoreWS = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private DEFAULT_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 12:
			 this.ignoreWS = true; this.beginOfTemplateLine = false;
			break;
		}
	}
	private ESCAPE_CHARACTER_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 13:
			 this.ignoreWS = false; this.beginOfTemplateLine = false;
			break;
		}
	}
	private EXPRESSION_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 14:
			 this.ignoreWS = false; this.beginOfTemplateLine = false;
			break;
		}
	}
	private TEXT_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 15:
			 this.ignoreWS = false; this.beginOfTemplateLine = false;
			break;
		}
	}
	private MULTILINE_SUFFIX_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 16:
			 this.inMultiline = false; 
			break;
		}
	}
	private NEWLINE_IN_STRUCTURE_NAME_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 17:
			 this.ignoreWS = true;
			break;

		case 18:
			this.beginOfStructureProperty = true;
			break;
		}
	}
	private STRUCTURED_NEWLINE_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 19:
			 this.ignoreWS = true; this.inStructuredValue = false; this.beginOfStructureProperty = true;
			break;
		}
	}
	private STRUCTURED_BODY_END_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 20:
			 this.inTemplate = false; this.beginOfTemplateBody = false;
			break;
		}
	}
	private STRUCTURE_IDENTIFIER_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 21:
			this.beginOfStructureProperty = false;
			break;
		}
	}
	private STRUCTURE_EQUALS_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 22:
			this.inStructuredValue = true;
			break;
		}
	}
	private STRUCTURE_OR_MARK_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 23:
			 this.ignoreWS = true; 
			break;
		}
	}
	private ESCAPE_CHARACTER_IN_STRUCTURE_BODY_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 24:
			 this.ignoreWS = false; 
			break;
		}
	}
	private EXPRESSION_IN_STRUCTURE_BODY_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 25:
			 this.ignoreWS = false; 
			break;
		}
	}
	private TEXT_IN_STRUCTURE_BODY_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 26:
			 this.ignoreWS = false; this.beginOfStructureProperty = false;
			break;
		}
	}
	// @Override
	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 24:
			return this.DASH_sempred(_localctx, predIndex);

		case 27:
			return this.LEFT_SQUARE_BRACKET_sempred(_localctx, predIndex);

		case 38:
			return this.WS_IN_BODY_sempred(_localctx, predIndex);

		case 39:
			return this.MULTILINE_PREFIX_sempred(_localctx, predIndex);

		case 41:
			return this.IF_sempred(_localctx, predIndex);

		case 42:
			return this.ELSEIF_sempred(_localctx, predIndex);

		case 43:
			return this.ELSE_sempred(_localctx, predIndex);

		case 44:
			return this.SWITCH_sempred(_localctx, predIndex);

		case 45:
			return this.CASE_sempred(_localctx, predIndex);

		case 46:
			return this.DEFAULT_sempred(_localctx, predIndex);

		case 58:
			return this.STRUCTURED_COMMENTS_sempred(_localctx, predIndex);

		case 59:
			return this.WS_IN_STRUCTURE_BODY_sempred(_localctx, predIndex);

		case 61:
			return this.STRUCTURED_BODY_END_sempred(_localctx, predIndex);

		case 62:
			return this.STRUCTURE_IDENTIFIER_sempred(_localctx, predIndex);

		case 63:
			return this.STRUCTURE_EQUALS_sempred(_localctx, predIndex);
		}
		return true;
	}
	private DASH_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return  this.inTemplate ;
		}
		return true;
	}
	private LEFT_SQUARE_BRACKET_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return  this.inTemplate && this.beginOfTemplateBody ;
		}
		return true;
	}
	private WS_IN_BODY_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.ignoreWS;
		}
		return true;
	}
	private MULTILINE_PREFIX_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 3:
			return  !this.inMultiline  && this.beginOfTemplateLine ;
		}
		return true;
	}
	private IF_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 4:
			return  this.beginOfTemplateLine;
		}
		return true;
	}
	private ELSEIF_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.beginOfTemplateLine;
		}
		return true;
	}
	private ELSE_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return  this.beginOfTemplateLine ;
		}
		return true;
	}
	private SWITCH_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.beginOfTemplateLine;
		}
		return true;
	}
	private CASE_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 8:
			return this.beginOfTemplateLine;
		}
		return true;
	}
	private DEFAULT_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 9:
			return this.beginOfTemplateLine;
		}
		return true;
	}
	private STRUCTURED_COMMENTS_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 10:
			return  !this.inStructuredValue && this.beginOfStructureProperty;
		}
		return true;
	}
	private WS_IN_STRUCTURE_BODY_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 11:
			return this.ignoreWS;
		}
		return true;
	}
	private STRUCTURED_BODY_END_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 12:
			return !this.inStructuredValue;
		}
		return true;
	}
	private STRUCTURE_IDENTIFIER_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 13:
			return  !this.inStructuredValue && this.beginOfStructureProperty;
		}
		return true;
	}
	private STRUCTURE_EQUALS_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 14:
			return !this.inStructuredValue;
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x020\u027D\b\x01" +
		"\b\x01\b\x01\b\x01\b\x01\b\x01\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04" +
		"\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t" +
		"\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t" +
		"\x10\x04\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t" +
		"\x15\x04\x16\t\x16\x04\x17\t\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t" +
		"\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t" +
		"\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t" +
		"\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x04" +
		"0\t0\x041\t1\x042\t2\x043\t3\x044\t4\x045\t5\x046\t6\x047\t7\x048\t8\x04" +
		"9\t9\x04:\t:\x04;\t;\x04<\t<\x04=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04" +
		"B\tB\x04C\tC\x04D\tD\x04E\tE\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t" +
		"\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E" +
		"\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x07\x11\xB1\n\x11\f\x11" +
		"\x0E\x11\xB4\v\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x07" +
		"\x12\xBC\n\x12\f\x12\x0E\x12\xBF\v\x12\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x07\x12\xC6\n\x12\f\x12\x0E\x12\xC9\v\x12\x03\x12\x05\x12\xCC" +
		"\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x07\x13\xD2\n\x13\f\x13\x0E\x13" +
		"\xD5\v\x13\x03\x13\x03\x13\x03\x14\x03\x14\x05\x14\xDB\n\x14\x03\x15\x03" +
		"\x15\x07\x15\xDF\n\x15\f\x15\x0E\x15\xE2\v\x15\x03\x15\x03\x15\x03\x15" +
		"\x03\x15\x06\x15\xE8\n\x15\r\x15\x0E\x15\xE9\x03\x16\x03\x16\x07\x16\xEE" +
		"\n\x16\f\x16\x0E\x16\xF1\v\x16\x03\x16\x03\x16\x03\x17\x06\x17\xF6\n\x17" +
		"\r\x17\x0E\x17\xF7\x03\x17\x03\x17\x03\x18\x05\x18\xFD\n\x18\x03\x18\x03" +
		"\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03" +
		"\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1B\x06\x1B\u0113\n\x1B\r\x1B\x0E\x1B\u0114\x07\x1B\u0117\n\x1B\f\x1B" +
		"\x0E\x1B\u011A\v\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x06\x1C\u0125\n\x1C\r\x1C\x0E\x1C\u0126\x03\x1C\x05" +
		"\x1C\u012A\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E\x03\x1E" +
		"\x07\x1E\u0133\n\x1E\f\x1E\x0E\x1E\u0136\v\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x07\x1E\u013B\n\x1E\f\x1E\x0E\x1E\u013E\v\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1F\x03\x1F\x03\x1F\x03 \x06 \u0147\n \r \x0E \u0148\x03 \x03 \x03" +
		"!\x05!\u014E\n!\x03!\x03!\x03!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x05\"" +
		"\u0159\n\"\x03\"\x03\"\x03\"\x07\"\u015E\n\"\f\"\x0E\"\u0161\v\"\x03#" +
		"\x03#\x03$\x03$\x03%\x03%\x03&\x03&\x03\'\x06\'\u016C\n\'\r\'\x0E\'\u016D" +
		"\x03(\x06(\u0171\n(\r(\x0E(\u0172\x03(\x03(\x03(\x03(\x03)\x03)\x03)\x03" +
		")\x03)\x03)\x03)\x03)\x03)\x03*\x05*\u0183\n*\x03*\x03*\x03*\x03*\x03" +
		"*\x03*\x03+\x03+\x03+\x07+\u018E\n+\f+\x0E+\u0191\v+\x03+\x03+\x03+\x03" +
		"+\x03,\x03,\x03,\x03,\x03,\x07,\u019C\n,\f,\x0E,\u019F\v,\x03,\x03,\x03" +
		",\x07,\u01A4\n,\f,\x0E,\u01A7\v,\x03,\x03,\x03,\x03,\x03-\x03-\x03-\x03" +
		"-\x03-\x07-\u01B2\n-\f-\x0E-\u01B5\v-\x03-\x03-\x03-\x03-\x03.\x03.\x03" +
		".\x03.\x03.\x03.\x03.\x07.\u01C2\n.\f.\x0E.\u01C5\v.\x03.\x03.\x03.\x03" +
		".\x03/\x03/\x03/\x03/\x03/\x07/\u01D0\n/\f/\x0E/\u01D3\v/\x03/\x03/\x03" +
		"/\x03/\x030\x030\x030\x030\x030\x030\x030\x030\x070\u01E1\n0\f0\x0E0\u01E4" +
		"\v0\x030\x030\x030\x030\x031\x031\x031\x032\x032\x032\x033\x063\u01F1" +
		"\n3\r3\x0E3\u01F2\x033\x033\x034\x034\x034\x034\x034\x034\x034\x034\x03" +
		"5\x035\x035\x035\x036\x036\x036\x036\x037\x057\u0208\n7\x037\x037\x06" +
		"7\u020C\n7\r7\x0E7\u020D\x037\x037\x038\x068\u0213\n8\r8\x0E8\u0214\x03" +
		"8\x038\x039\x059\u021A\n9\x039\x039\x039\x039\x039\x039\x039\x03:\x03" +
		":\x03:\x05:\u0226\n:\x03:\x03:\x03:\x07:\u022B\n:\f:\x0E:\u022E\v:\x03" +
		";\x06;\u0231\n;\r;\x0E;\u0232\x03<\x03<\x07<\u0237\n<\f<\x0E<\u023A\v" +
		"<\x03<\x05<\u023D\n<\x03<\x03<\x03<\x03<\x03<\x03=\x06=\u0245\n=\r=\x0E" +
		"=\u0246\x03=\x03=\x03=\x03=\x03>\x05>\u024E\n>\x03>\x03>\x03>\x03?\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03@\x03@\x03@\x05@\u025D\n@\x03@\x03@\x03" +
		"@\x07@\u0262\n@\f@\x0E@\u0265\v@\x03@\x03@\x03@\x03A\x03A\x03A\x03A\x03" +
		"B\x03B\x03B\x03C\x03C\x03C\x03D\x03D\x03D\x03E\x06E\u0278\nE\rE\x0EE\u0279" +
		"\x03E\x03E\f\xBD\xC7\xD3\u0134\u013C\u016D\u01F2\u020D\u0232\u0279\x02" +
		"\x02F\b\x02\x02\n\x02\x02\f\x02\x02\x0E\x02\x02\x10\x02\x02\x12\x02\x02" +
		"\x14\x02\x02\x16\x02\x02\x18\x02\x02\x1A\x02\x02\x1C\x02\x02\x1E\x02\x02" +
		" \x02\x02\"\x02\x02$\x02\x02&\x02\x02(\x02\x02*\x02\x02,\x02\x02.\x02" +
		"\x030\x02\x042\x02\x054\x02\x066\x02\x078\x02\b:\x02\t<\x02\n>\x02\v@" +
		"\x02\fB\x02\rD\x02\x0EF\x02\x0FH\x02\x10J\x02\x11L\x02\x12N\x02\x13P\x02" +
		"\x14R\x02\x15T\x02\x16V\x02\x17X\x02\x18Z\x02\x19\\\x02\x1A^\x02\x1B`" +
		"\x02\x1Cb\x02\x1Dd\x02\x1Ef\x02\x1Fh\x02 j\x02!l\x02\"n\x02\x02p\x02\x02" +
		"r\x02\x02t\x02#v\x02$x\x02%z\x02&|\x02\'~\x02(\x80\x02)\x82\x02*\x84\x02" +
		"+\x86\x02,\x88\x02-\x8A\x02.\x8C\x02/\x8E\x020\b\x02\x03\x04\x05\x06\x07" +
		"\x1D\x04\x02CCcc\x04\x02EEee\x04\x02FFff\x04\x02GGgg\x04\x02HHhh\x04\x02" +
		"JJjj\x04\x02KKkk\x04\x02NNnn\x04\x02UUuu\x04\x02VVvv\x04\x02WWww\x04\x02" +
		"YYyy\x04\x02C\\c|\x06\x02\v\v\"\"\xA2\xA2\uFF01\uFF01\x04\x02))^^\x03" +
		"\x02))\x04\x02$$^^\x03\x02$$\x04\x02^^bb\x03\x02bb\x04\x02\f\f\x0F\x0F" +
		"\x06\x02\f\f\x0F\x0F}}\x7F\x7F\x06\x02$$))bb\x7F\x7F\x06\x02\f\f\x0F\x0F" +
		"]]__\x05\x02\f\f\x0F\x0F*+\x04\x02//aa\x04\x02/0aa\u02A4\x02.\x03\x02" +
		"\x02\x02\x020\x03\x02\x02\x02\x022\x03\x02\x02\x02\x024\x03\x02\x02\x02" +
		"\x026\x03\x02\x02\x02\x028\x03\x02\x02\x02\x02:\x03\x02\x02\x02\x02<\x03" +
		"\x02\x02\x02\x02>\x03\x02\x02\x02\x02@\x03\x02\x02\x02\x02B\x03\x02\x02" +
		"\x02\x03D\x03\x02\x02\x02\x03F\x03\x02\x02\x02\x03H\x03\x02\x02\x02\x03" +
		"J\x03\x02\x02\x02\x03L\x03\x02\x02\x02\x03N\x03\x02\x02\x02\x03P\x03\x02" +
		"\x02\x02\x03R\x03\x02\x02\x02\x04T\x03\x02\x02\x02\x04V\x03\x02\x02\x02" +
		"\x04X\x03\x02\x02\x02\x04Z\x03\x02\x02\x02\x04\\\x03\x02\x02\x02\x04^" +
		"\x03\x02\x02\x02\x04`\x03\x02\x02\x02\x04b\x03\x02\x02\x02\x04d\x03\x02" +
		"\x02\x02\x04f\x03\x02\x02\x02\x04h\x03\x02\x02\x02\x04j\x03\x02\x02\x02" +
		"\x05l\x03\x02\x02\x02\x05n\x03\x02\x02\x02\x05p\x03\x02\x02\x02\x05r\x03" +
		"\x02\x02\x02\x06t\x03\x02\x02\x02\x06v\x03\x02\x02\x02\x06x\x03\x02\x02" +
		"\x02\x06z\x03\x02\x02\x02\x07|\x03\x02\x02\x02\x07~\x03\x02\x02\x02\x07" +
		"\x80\x03\x02\x02\x02\x07\x82\x03\x02\x02\x02\x07\x84\x03\x02\x02\x02\x07" +
		"\x86\x03\x02\x02\x02\x07\x88\x03\x02\x02\x02\x07\x8A\x03\x02\x02\x02\x07" +
		"\x8C\x03\x02\x02\x02\x07\x8E\x03\x02\x02\x02\b\x90\x03\x02\x02\x02\n\x92" +
		"\x03\x02\x02\x02\f\x94\x03\x02\x02\x02\x0E\x96\x03\x02\x02\x02\x10\x98" +
		"\x03\x02\x02\x02\x12\x9A\x03\x02\x02\x02\x14\x9C\x03\x02\x02\x02\x16\x9E" +
		"\x03\x02\x02\x02\x18\xA0\x03\x02\x02\x02\x1A\xA2\x03\x02\x02\x02\x1C\xA4" +
		"\x03\x02\x02\x02\x1E\xA6\x03\x02\x02\x02 \xA8\x03\x02\x02\x02\"\xAA\x03" +
		"\x02\x02\x02$\xAC\x03\x02\x02\x02&\xAE\x03\x02\x02\x02(\xCB\x03\x02\x02" +
		"\x02*\xCD\x03\x02\x02\x02,\xD8\x03\x02\x02\x02.\xDC\x03\x02\x02\x020\xEB" +
		"\x03\x02\x02\x022\xF5\x03\x02\x02\x024\xFC\x03\x02\x02\x026\u0102\x03" +
		"\x02\x02\x028\u0107\x03\x02\x02\x02:\u010D\x03\x02\x02\x02<\u011D\x03" +
		"\x02\x02\x02>\u012B\x03\x02\x02\x02@\u0130\x03\x02\x02\x02B\u0142\x03" +
		"\x02\x02\x02D\u0146\x03\x02\x02\x02F\u014D\x03\x02\x02\x02H\u0158\x03" +
		"\x02\x02\x02J\u0162\x03\x02\x02\x02L\u0164\x03\x02\x02\x02N\u0166\x03" +
		"\x02\x02\x02P\u0168\x03\x02\x02\x02R\u016B\x03\x02\x02\x02T\u0170\x03" +
		"\x02\x02\x02V\u0178\x03\x02\x02\x02X\u0182\x03\x02\x02\x02Z\u018A\x03" +
		"\x02\x02\x02\\\u0196\x03\x02\x02\x02^\u01AC\x03\x02\x02\x02`\u01BA\x03" +
		"\x02\x02\x02b\u01CA\x03\x02\x02\x02d\u01D8\x03\x02\x02\x02f\u01E9\x03" +
		"\x02\x02\x02h\u01EC\x03\x02\x02\x02j\u01F0\x03\x02\x02\x02l\u01F6\x03" +
		"\x02\x02\x02n\u01FE\x03\x02\x02\x02p\u0202\x03\x02\x02\x02r\u020B\x03" +
		"\x02\x02\x02t\u0212\x03\x02\x02\x02v\u0219\x03\x02\x02\x02x\u0225\x03" +
		"\x02\x02\x02z\u0230\x03\x02\x02\x02|\u0234\x03\x02\x02\x02~\u0244\x03" +
		"\x02\x02\x02\x80\u024D\x03\x02\x02\x02\x82\u0252\x03\x02\x02\x02\x84\u025C" +
		"\x03\x02\x02\x02\x86\u0269\x03\x02\x02\x02\x88\u026D\x03\x02\x02\x02\x8A" +
		"\u0270\x03\x02\x02\x02\x8C\u0273\x03\x02\x02\x02\x8E\u0277\x03\x02\x02" +
		"\x02\x90\x91\t\x02\x02\x02\x91\t\x03\x02\x02\x02\x92\x93\t\x03\x02\x02" +
		"\x93\v\x03\x02\x02\x02\x94\x95\t\x04\x02\x02\x95\r\x03\x02\x02\x02\x96" +
		"\x97\t\x05\x02\x02\x97\x0F\x03\x02\x02\x02\x98\x99\t\x06\x02\x02\x99\x11" +
		"\x03\x02\x02\x02\x9A\x9B\t\x07\x02\x02\x9B\x13\x03\x02\x02\x02\x9C\x9D" +
		"\t\b\x02\x02\x9D\x15\x03\x02\x02\x02\x9E\x9F\t\t\x02\x02\x9F\x17\x03\x02" +
		"\x02\x02\xA0\xA1\t\n\x02\x02\xA1\x19\x03\x02\x02\x02\xA2\xA3\t\v\x02\x02" +
		"\xA3\x1B\x03\x02\x02\x02\xA4\xA5\t\f\x02\x02\xA5\x1D\x03\x02\x02\x02\xA6" +
		"\xA7\t\r\x02\x02\xA7\x1F\x03\x02\x02\x02\xA8\xA9\t\x0E\x02\x02\xA9!\x03" +
		"\x02\x02\x02\xAA\xAB\x042;\x02\xAB#\x03\x02\x02\x02\xAC\xAD\t\x0F\x02" +
		"\x02\xAD%\x03\x02\x02\x02\xAE\xB2\x07}\x02\x02\xAF\xB1\x05$\x10\x02\xB0" +
		"\xAF\x03\x02\x02\x02\xB1\xB4\x03\x02\x02\x02\xB2\xB0\x03\x02\x02\x02\xB2" +
		"\xB3\x03\x02\x02\x02\xB3\xB5\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02\xB5" +
		"\xB6\x07\x7F\x02\x02\xB6\'\x03\x02\x02\x02\xB7\xBD\x07)\x02\x02\xB8\xB9" +
		"\x07^\x02\x02\xB9\xBC\t\x10\x02\x02\xBA\xBC\n\x11\x02\x02\xBB\xB8\x03" +
		"\x02\x02\x02\xBB\xBA\x03\x02\x02\x02\xBC\xBF\x03\x02\x02\x02\xBD\xBE\x03" +
		"\x02\x02\x02\xBD\xBB\x03\x02\x02\x02\xBE\xC0\x03\x02\x02\x02\xBF\xBD\x03" +
		"\x02\x02\x02\xC0\xCC\x07)\x02\x02\xC1\xC7\x07$\x02\x02\xC2\xC3\x07^\x02" +
		"\x02\xC3\xC6\t\x12\x02\x02\xC4\xC6\n\x13\x02\x02\xC5\xC2\x03\x02\x02\x02" +
		"\xC5\xC4\x03\x02\x02\x02\xC6\xC9\x03\x02\x02\x02\xC7\xC8\x03\x02\x02\x02" +
		"\xC7\xC5\x03\x02\x02\x02\xC8\xCA\x03\x02\x02\x02\xC9\xC7\x03\x02\x02\x02" +
		"\xCA\xCC\x07$\x02\x02\xCB\xB7\x03\x02\x02\x02\xCB\xC1\x03\x02\x02\x02" +
		"\xCC)\x03\x02\x02\x02\xCD\xD3\x07b\x02\x02\xCE\xCF\x07^\x02\x02\xCF\xD2" +
		"\t\x14\x02\x02\xD0\xD2\n\x15\x02\x02\xD1\xCE\x03\x02\x02\x02\xD1\xD0\x03" +
		"\x02\x02\x02\xD2\xD5\x03\x02\x02\x02\xD3\xD4\x03\x02\x02\x02\xD3\xD1\x03" +
		"\x02\x02\x02\xD4\xD6\x03\x02\x02\x02\xD5\xD3\x03\x02\x02\x02\xD6\xD7\x07" +
		"b\x02\x02\xD7+\x03\x02\x02\x02\xD8\xDA\x07^\x02\x02\xD9\xDB\n\x16\x02" +
		"\x02\xDA\xD9\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB-\x03\x02\x02" +
		"\x02\xDC\xE0\x07@\x02\x02\xDD\xDF\x05$\x10\x02\xDE\xDD\x03\x02\x02\x02" +
		"\xDF\xE2\x03\x02\x02\x02\xE0\xDE\x03\x02\x02\x02\xE0\xE1\x03\x02\x02\x02" +
		"\xE1\xE3\x03\x02\x02\x02\xE2\xE0\x03\x02\x02\x02\xE3\xE4\x07#\x02\x02" +
		"\xE4\xE5\x07%\x02\x02\xE5\xE7\x03\x02\x02\x02\xE6\xE8\n\x16\x02\x02\xE7" +
		"\xE6\x03\x02\x02\x02\xE8\xE9\x03\x02\x02\x02\xE9\xE7\x03\x02\x02\x02\xE9" +
		"\xEA\x03\x02\x02\x02\xEA/\x03\x02\x02\x02\xEB\xEF\x07@\x02\x02\xEC\xEE" +
		"\n\x16\x02\x02\xED\xEC\x03\x02\x02\x02\xEE\xF1\x03\x02\x02\x02\xEF\xED" +
		"\x03\x02\x02\x02\xEF\xF0\x03\x02\x02\x02\xF0\xF2\x03\x02\x02\x02\xF1\xEF" +
		"\x03\x02\x02\x02\xF2\xF3\b\x16\x02\x02\xF31\x03\x02\x02\x02\xF4\xF6\x05" +
		"$\x10\x02\xF5\xF4\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7\xF5\x03" +
		"\x02\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8\xF9\x03\x02\x02\x02\xF9\xFA\b" +
		"\x17\x02\x02\xFA3\x03\x02\x02\x02\xFB\xFD\x07\x0F\x02\x02\xFC\xFB\x03" +
		"\x02\x02\x02\xFC\xFD\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\xFF\x07" +
		"\f\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0101\b\x18\x02\x02\u01015" +
		"\x03\x02\x02\x02\u0102\u0103\x07%\x02\x02\u0103\u0104\b\x19\x03\x02\u0104" +
		"\u0105\x03\x02\x02\x02\u0105\u0106\b\x19\x04\x02\u01067\x03\x02\x02\x02" +
		"\u0107\u0108\x07/\x02\x02\u0108\u0109\x06\x1A\x02\x02\u0109\u010A\b\x1A" +
		"\x05\x02\u010A\u010B\x03\x02\x02\x02\u010B\u010C\b\x1A\x06\x02\u010C9" +
		"\x03\x02\x02\x02\u010D\u0118\x07}\x02\x02\u010E\u010F\x05H\"\x02\u010F" +
		"\u0112\x07<\x02\x02\u0110\u0113\n\x17\x02\x02\u0111\u0113\x05:\x1B\x02" +
		"\u0112\u0110\x03\x02\x02\x02\u0112\u0111\x03\x02\x02\x02\u0113\u0114\x03" +
		"\x02\x02\x02\u0114\u0112\x03\x02\x02\x02\u0114\u0115\x03\x02\x02\x02\u0115" +
		"\u0117\x03\x02\x02\x02\u0116\u010E\x03\x02\x02\x02\u0117\u011A\x03\x02" +
		"\x02\x02\u0118\u0116\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119" +
		"\u011B\x03\x02\x02\x02\u011A\u0118\x03\x02\x02\x02\u011B\u011C\x07\x7F" +
		"\x02\x02\u011C;\x03\x02\x02\x02\u011D\u011E\x07&\x02\x02\u011E\u0124\x07" +
		"}\x02\x02\u011F\u0125\x05(\x12\x02\u0120\u0125\x05*\x13\x02\u0121\u0125" +
		"\x05&\x11\x02\u0122\u0125\x05:\x1B\x02\u0123\u0125\n\x18\x02\x02\u0124" +
		"\u011F\x03\x02\x02\x02\u0124\u0120\x03\x02\x02\x02\u0124\u0121\x03\x02" +
		"\x02\x02\u0124\u0122\x03\x02\x02\x02\u0124\u0123\x03\x02\x02\x02\u0125" +
		"\u0126\x03\x02\x02\x02\u0126\u0124\x03\x02\x02\x02\u0126\u0127\x03\x02" +
		"\x02\x02\u0127\u0129\x03\x02\x02\x02\u0128\u012A\x07\x7F\x02\x02\u0129" +
		"\u0128\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A=\x03\x02\x02" +
		"\x02\u012B\u012C\x07]\x02\x02\u012C\u012D\x06\x1D\x03\x02\u012D\u012E" +
		"\x03\x02\x02\x02\u012E\u012F\b\x1D\x07\x02\u012F?\x03\x02\x02\x02\u0130" +
		"\u0134\x07]\x02\x02\u0131\u0133\n\x19\x02\x02\u0132\u0131\x03\x02\x02" +
		"\x02\u0133\u0136\x03\x02\x02\x02\u0134\u0135\x03\x02\x02\x02\u0134\u0132" +
		"\x03\x02\x02\x02\u0135\u0137\x03\x02\x02\x02\u0136\u0134\x03\x02\x02\x02" +
		"\u0137\u0138\x07_\x02\x02\u0138\u013C\x07*\x02\x02\u0139\u013B\n\x1A\x02" +
		"\x02\u013A\u0139\x03\x02\x02\x02\u013B\u013E\x03\x02\x02\x02\u013C\u013D" +
		"\x03\x02\x02\x02\u013C\u013A\x03\x02\x02\x02\u013D\u013F\x03\x02\x02\x02" +
		"\u013E\u013C\x03\x02\x02\x02\u013F\u0140\x07+\x02\x02\u0140\u0141\b\x1E" +
		"\b\x02\u0141A\x03\x02\x02\x02\u0142\u0143\v\x02\x02\x02\u0143\u0144\b" +
		"\x1F\t\x02\u0144C\x03\x02\x02\x02\u0145\u0147\x05$\x10\x02\u0146\u0145" +
		"\x03\x02\x02\x02\u0147\u0148\x03\x02\x02\x02\u0148\u0146\x03\x02\x02\x02" +
		"\u0148\u0149\x03\x02\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A\u014B\b" +
		" \x02\x02\u014BE\x03\x02\x02\x02\u014C\u014E\x07\x0F\x02\x02\u014D\u014C" +
		"\x03\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02" +
		"\u014F\u0150\x07\f\x02\x02\u0150\u0151\b!\n\x02\u0151\u0152\x03\x02\x02" +
		"\x02\u0152\u0153\b!\x02\x02\u0153\u0154\b!\v\x02\u0154G\x03\x02\x02\x02" +
		"\u0155\u0159\x05 \x0E\x02\u0156\u0159\x05\"\x0F\x02\u0157\u0159\x07a\x02" +
		"\x02\u0158\u0155\x03\x02\x02\x02\u0158\u0156\x03\x02\x02\x02\u0158\u0157" +
		"\x03\x02\x02\x02\u0159\u015F\x03\x02\x02\x02\u015A\u015E\x05 \x0E\x02" +
		"\u015B\u015E\x05\"\x0F\x02\u015C\u015E\t\x1B\x02\x02\u015D\u015A\x03\x02" +
		"\x02\x02\u015D\u015B\x03\x02\x02\x02\u015D\u015C\x03\x02\x02\x02\u015E" +
		"\u0161\x03\x02\x02\x02\u015F\u015D\x03\x02\x02\x02\u015F\u0160\x03\x02" +
		"\x02\x02\u0160I\x03\x02\x02\x02\u0161\u015F\x03\x02\x02\x02\u0162\u0163" +
		"\x070\x02\x02\u0163K\x03\x02\x02\x02\u0164\u0165\x07*\x02\x02\u0165M\x03" +
		"\x02\x02\x02\u0166\u0167\x07+\x02\x02\u0167O\x03\x02\x02\x02\u0168\u0169" +
		"\x07.\x02\x02\u0169Q\x03\x02\x02\x02\u016A\u016C\n\x16\x02\x02\u016B\u016A" +
		"\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D\u016E\x03\x02\x02\x02" +
		"\u016D\u016B\x03\x02\x02\x02\u016ES\x03\x02\x02\x02\u016F\u0171\x05$\x10" +
		"\x02\u0170\u016F\x03\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172\u0170" +
		"\x03\x02\x02\x02\u0172\u0173\x03\x02\x02\x02\u0173\u0174\x03\x02\x02\x02" +
		"\u0174\u0175\x06(\x04\x02\u0175\u0176\x03\x02\x02\x02\u0176\u0177\b(\x02" +
		"\x02\u0177U\x03\x02\x02\x02\u0178\u0179\x07b\x02\x02\u0179\u017A\x07b" +
		"\x02\x02\u017A\u017B\x07b\x02\x02\u017B\u017C\x03\x02\x02\x02\u017C\u017D" +
		"\x06)\x05\x02\u017D\u017E\b)\f\x02\u017E\u017F\x03\x02\x02\x02\u017F\u0180" +
		"\b)\r\x02\u0180W\x03\x02\x02\x02\u0181\u0183\x07\x0F\x02\x02\u0182\u0181" +
		"\x03\x02\x02\x02\u0182\u0183\x03\x02\x02\x02\u0183\u0184\x03\x02\x02\x02" +
		"\u0184\u0185\x07\f\x02\x02\u0185\u0186\b*\x0E\x02\u0186\u0187\x03\x02" +
		"\x02\x02\u0187\u0188\b*\x02\x02\u0188\u0189\b*\v\x02\u0189Y\x03\x02\x02" +
		"\x02\u018A\u018B\x05\x14\b\x02\u018B\u018F\x05\x10\x06\x02\u018C\u018E" +
		"\x05$\x10\x02\u018D\u018C\x03\x02\x02\x02\u018E\u0191\x03\x02\x02\x02" +
		"\u018F\u018D\x03\x02\x02\x02\u018F\u0190\x03\x02\x02\x02\u0190\u0192\x03" +
		"\x02\x02\x02\u0191\u018F\x03\x02\x02\x02\u0192\u0193\x07<\x02\x02\u0193" +
		"\u0194\x06+\x06\x02\u0194\u0195\b+\x0F\x02\u0195[\x03\x02\x02\x02\u0196" +
		"\u0197\x05\x0E\x05\x02\u0197\u0198\x05\x16\t\x02\u0198\u0199\x05\x18\n" +
		"\x02\u0199\u019D\x05\x0E\x05\x02\u019A\u019C\x05$\x10\x02\u019B\u019A" +
		"\x03\x02\x02\x02\u019C\u019F\x03\x02\x02\x02\u019D\u019B\x03\x02\x02\x02" +
		"\u019D\u019E\x03\x02\x02\x02\u019E\u01A0\x03\x02\x02\x02\u019F\u019D\x03" +
		"\x02\x02\x02\u01A0\u01A1\x05\x14\b\x02\u01A1\u01A5\x05\x10\x06\x02\u01A2" +
		"\u01A4\x05$\x10\x02\u01A3\u01A2\x03\x02\x02\x02\u01A4\u01A7\x03\x02\x02" +
		"\x02\u01A5\u01A3\x03\x02\x02\x02\u01A5\u01A6\x03\x02\x02\x02\u01A6\u01A8" +
		"\x03\x02\x02\x02\u01A7\u01A5\x03\x02\x02\x02\u01A8\u01A9\x07<\x02\x02" +
		"\u01A9\u01AA\x06,\x07\x02\u01AA\u01AB\b,\x10\x02\u01AB]\x03\x02\x02\x02" +
		"\u01AC\u01AD\x05\x0E\x05\x02\u01AD\u01AE\x05\x16\t\x02\u01AE\u01AF\x05" +
		"\x18\n\x02\u01AF\u01B3\x05\x0E\x05\x02\u01B0\u01B2\x05$\x10\x02\u01B1" +
		"\u01B0\x03\x02\x02\x02\u01B2\u01B5\x03\x02\x02\x02\u01B3\u01B1\x03\x02" +
		"\x02\x02\u01B3\u01B4\x03\x02\x02\x02\u01B4\u01B6\x03\x02\x02\x02\u01B5" +
		"\u01B3\x03\x02\x02\x02\u01B6\u01B7\x07<\x02\x02\u01B7\u01B8\x06-\b\x02" +
		"\u01B8\u01B9\b-\x11\x02\u01B9_\x03\x02\x02\x02\u01BA\u01BB\x05\x18\n\x02" +
		"\u01BB\u01BC\x05\x1E\r\x02\u01BC\u01BD\x05\x14\b\x02\u01BD\u01BE\x05\x1A" +
		"\v\x02\u01BE\u01BF\x05\n\x03\x02\u01BF\u01C3\x05\x12\x07\x02\u01C0\u01C2" +
		"\x05$\x10\x02\u01C1\u01C0\x03\x02\x02\x02\u01C2\u01C5\x03\x02\x02\x02" +
		"\u01C3\u01C1\x03\x02\x02\x02\u01C3\u01C4\x03\x02\x02\x02\u01C4\u01C6\x03" +
		"\x02\x02\x02\u01C5\u01C3\x03\x02\x02\x02\u01C6\u01C7\x07<\x02\x02\u01C7" +
		"\u01C8\x06.\t\x02\u01C8\u01C9\b.\x12\x02\u01C9a\x03\x02\x02\x02\u01CA" +
		"\u01CB\x05\n\x03\x02\u01CB\u01CC\x05\b\x02\x02\u01CC\u01CD\x05\x18\n\x02" +
		"\u01CD\u01D1\x05\x0E\x05\x02\u01CE\u01D0\x05$\x10\x02\u01CF\u01CE\x03" +
		"\x02\x02\x02\u01D0\u01D3\x03\x02\x02\x02\u01D1\u01CF\x03\x02\x02\x02\u01D1" +
		"\u01D2\x03\x02\x02\x02\u01D2\u01D4\x03\x02\x02\x02\u01D3\u01D1\x03\x02" +
		"\x02\x02\u01D4\u01D5\x07<\x02\x02\u01D5\u01D6\x06/\n\x02\u01D6\u01D7\b" +
		"/\x13\x02\u01D7c\x03\x02\x02\x02\u01D8\u01D9\x05\f\x04\x02\u01D9\u01DA" +
		"\x05\x0E\x05\x02\u01DA\u01DB\x05\x10\x06\x02\u01DB\u01DC\x05\b\x02\x02" +
		"\u01DC\u01DD\x05\x1C\f\x02\u01DD\u01DE\x05\x16\t\x02\u01DE\u01E2\x05\x1A" +
		"\v\x02\u01DF\u01E1\x05$\x10\x02\u01E0\u01DF\x03\x02\x02\x02\u01E1\u01E4" +
		"\x03\x02\x02\x02\u01E2\u01E0\x03\x02\x02\x02\u01E2\u01E3\x03\x02\x02\x02" +
		"\u01E3\u01E5\x03\x02\x02\x02\u01E4\u01E2\x03\x02\x02\x02\u01E5\u01E6\x07" +
		"<\x02\x02\u01E6\u01E7\x060\v\x02\u01E7\u01E8\b0\x14\x02\u01E8e\x03\x02" +
		"\x02\x02\u01E9\u01EA\x05,\x14\x02\u01EA\u01EB\b1\x15\x02\u01EBg\x03\x02" +
		"\x02\x02\u01EC\u01ED\x05<\x1C\x02\u01ED\u01EE\b2\x16\x02\u01EEi\x03\x02" +
		"\x02\x02\u01EF\u01F1\n\x16\x02\x02\u01F0\u01EF\x03\x02\x02\x02\u01F1\u01F2" +
		"\x03\x02\x02\x02\u01F2\u01F3\x03\x02\x02\x02\u01F2\u01F0\x03\x02\x02\x02" +
		"\u01F3\u01F4\x03\x02\x02\x02\u01F4\u01F5\b3\x17\x02\u01F5k\x03\x02\x02" +
		"\x02\u01F6\u01F7\x07b\x02\x02\u01F7\u01F8\x07b\x02\x02\u01F8\u01F9\x07" +
		"b\x02\x02\u01F9\u01FA\x03\x02\x02\x02\u01FA\u01FB\b4\x18\x02\u01FB\u01FC" +
		"\x03\x02\x02\x02\u01FC\u01FD\b4\v\x02\u01FDm\x03\x02\x02\x02\u01FE\u01FF" +
		"\x05,\x14\x02\u01FF\u0200\x03\x02\x02\x02\u0200\u0201\b5\x19\x02\u0201" +
		"o\x03\x02\x02\x02\u0202\u0203\x05<\x1C\x02\u0203\u0204\x03\x02\x02\x02" +
		"\u0204\u0205\b6\x1A\x02\u0205q\x03\x02\x02\x02\u0206\u0208\x07\x0F\x02" +
		"\x02\u0207\u0206\x03\x02\x02\x02\u0207\u0208\x03\x02\x02\x02\u0208\u0209" +
		"\x03\x02\x02\x02\u0209\u020C\x07\f\x02\x02\u020A\u020C\n\x16";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\u020B\u0207\x03\x02\x02\x02\u020B\u020A\x03\x02\x02\x02\u020C" +
		"\u020D\x03\x02\x02\x02\u020D\u020E\x03\x02\x02\x02\u020D\u020B\x03\x02" +
		"\x02\x02\u020E\u020F\x03\x02\x02\x02\u020F\u0210\b7\x1B\x02\u0210s\x03" +
		"\x02\x02\x02\u0211\u0213\x05$\x10\x02\u0212\u0211\x03\x02\x02\x02\u0213" +
		"\u0214\x03\x02\x02\x02\u0214\u0212\x03\x02\x02\x02\u0214\u0215\x03\x02" +
		"\x02\x02\u0215\u0216\x03\x02\x02\x02\u0216\u0217\b8\x02\x02\u0217u\x03" +
		"\x02\x02\x02\u0218\u021A\x07\x0F\x02\x02\u0219\u0218\x03\x02\x02\x02\u0219" +
		"\u021A\x03\x02\x02\x02\u021A\u021B\x03\x02\x02\x02\u021B\u021C\x07\f\x02" +
		"\x02\u021C\u021D\b9\x1C\x02\u021D\u021E\b9\x1D\x02\u021E\u021F\x03\x02" +
		"\x02\x02\u021F\u0220\b9\x02\x02\u0220\u0221\b9\x1E\x02\u0221w\x03\x02" +
		"\x02\x02\u0222\u0226\x05 \x0E\x02\u0223\u0226\x05\"\x0F\x02\u0224\u0226" +
		"\x07a\x02\x02\u0225\u0222\x03\x02\x02\x02\u0225\u0223\x03\x02\x02\x02" +
		"\u0225\u0224\x03\x02\x02\x02\u0226\u022C\x03\x02\x02\x02\u0227\u022B\x05" +
		" \x0E\x02\u0228\u022B\x05\"\x0F\x02\u0229\u022B\t\x1C\x02\x02\u022A\u0227" +
		"\x03\x02\x02\x02\u022A\u0228\x03\x02\x02\x02\u022A\u0229\x03\x02\x02\x02" +
		"\u022B\u022E\x03\x02\x02\x02\u022C\u022A\x03\x02\x02\x02\u022C\u022D\x03" +
		"\x02\x02\x02\u022Dy\x03\x02\x02\x02\u022E\u022C\x03\x02\x02\x02\u022F" +
		"\u0231\n\x16\x02\x02\u0230\u022F\x03\x02\x02\x02\u0231\u0232\x03\x02\x02" +
		"\x02\u0232\u0233\x03\x02\x02\x02\u0232\u0230\x03\x02\x02\x02\u0233{\x03" +
		"\x02\x02\x02\u0234\u0238\x07@\x02\x02\u0235\u0237\n\x16\x02\x02\u0236" +
		"\u0235\x03\x02\x02\x02\u0237\u023A\x03\x02\x02\x02\u0238\u0236\x03\x02" +
		"\x02\x02\u0238\u0239\x03\x02\x02\x02\u0239\u023C\x03\x02\x02\x02\u023A" +
		"\u0238\x03\x02\x02\x02\u023B\u023D\x07\x0F\x02\x02\u023C\u023B\x03\x02" +
		"\x02\x02\u023C\u023D\x03\x02\x02\x02\u023D\u023E\x03\x02\x02\x02\u023E" +
		"\u023F\x07\f\x02\x02\u023F\u0240\x06<\f\x02\u0240\u0241\x03\x02\x02\x02" +
		"\u0241\u0242\b<\x02\x02\u0242}\x03\x02\x02\x02\u0243\u0245\x05$\x10\x02" +
		"\u0244\u0243\x03\x02\x02\x02\u0245\u0246\x03\x02\x02\x02\u0246\u0244\x03" +
		"\x02\x02\x02\u0246\u0247\x03\x02\x02\x02\u0247\u0248\x03\x02\x02\x02\u0248" +
		"\u0249\x06=\r\x02\u0249\u024A\x03\x02\x02\x02\u024A\u024B\b=\x02\x02\u024B" +
		"\x7F\x03\x02\x02\x02\u024C\u024E\x07\x0F\x02\x02\u024D\u024C\x03\x02\x02" +
		"\x02\u024D\u024E\x03\x02\x02\x02\u024E\u024F\x03\x02\x02\x02\u024F\u0250" +
		"\x07\f\x02\x02\u0250\u0251\b>\x1F\x02\u0251\x81\x03\x02\x02\x02\u0252" +
		"\u0253\x07_\x02\x02\u0253\u0254\x06?\x0E\x02\u0254\u0255\b? \x02\u0255" +
		"\u0256\x03\x02\x02\x02\u0256\u0257\b?\v\x02\u0257\u0258\b?\v\x02\u0258" +
		"\x83\x03\x02\x02\x02\u0259\u025D\x05 \x0E\x02\u025A\u025D\x05\"\x0F\x02" +
		"\u025B\u025D\x07a\x02\x02\u025C\u0259\x03\x02\x02\x02\u025C\u025A\x03" +
		"\x02\x02\x02\u025C\u025B\x03\x02\x02\x02\u025D\u0263\x03\x02\x02\x02\u025E" +
		"\u0262\x05 \x0E\x02\u025F\u0262\x05\"\x0F\x02\u0260\u0262\t\x1C\x02\x02" +
		"\u0261\u025E\x03\x02\x02\x02\u0261\u025F\x03\x02\x02\x02\u0261\u0260\x03" +
		"\x02\x02\x02\u0262\u0265\x03\x02\x02\x02\u0263\u0261\x03\x02\x02\x02\u0263" +
		"\u0264\x03\x02\x02\x02\u0264\u0266\x03\x02\x02\x02\u0265\u0263\x03\x02" +
		"\x02\x02\u0266\u0267\x06@\x0F\x02\u0267\u0268\b@!\x02\u0268\x85\x03\x02" +
		"\x02\x02\u0269\u026A\x07?\x02\x02\u026A\u026B\x06A\x10\x02\u026B\u026C" +
		"\bA\"\x02\u026C\x87\x03\x02\x02\x02\u026D\u026E\x07~\x02\x02\u026E\u026F" +
		"\bB#\x02\u026F\x89\x03\x02\x02\x02\u0270\u0271\x05,\x14\x02\u0271\u0272" +
		"\bC$\x02\u0272\x8B\x03\x02\x02\x02\u0273\u0274\x05<\x1C\x02\u0274\u0275" +
		"\bD%\x02\u0275\x8D\x03\x02\x02\x02\u0276\u0278\n\x16\x02\x02\u0277\u0276" +
		"\x03\x02\x02\x02\u0278\u0279\x03\x02\x02\x02\u0279\u027A\x03\x02\x02\x02" +
		"\u0279\u0277\x03\x02\x02\x02\u027A\u027B\x03\x02\x02\x02\u027B\u027C\b" +
		"E&\x02\u027C\x8F\x03\x02\x02\x02?\x02\x03\x04\x05\x06\x07\xB2\xBB\xBD" +
		"\xC5\xC7\xCB\xD1\xD3\xDA\xE0\xE9\xEF\xF7\xFC\u0112\u0114\u0118\u0124\u0126" +
		"\u0129\u0134\u013C\u0148\u014D\u0158\u015D\u015F\u016D\u0172\u0182\u018F" +
		"\u019D\u01A5\u01B3\u01C3\u01D1\u01E2\u01F2\u0207\u020B\u020D\u0214\u0219" +
		"\u0225\u022A\u022C\u0232\u0238\u023C\u0246\u024D\u025C\u0261\u0263\u0279" +
		"\'\b\x02\x02\x03\x19\x02\x07\x03\x02\x03\x1A\x03\x07\x04\x02\x07\x06\x02" +
		"\x03\x1E\x04\x03\x1F\x05\x03!\x06\x06\x02\x02\x03)\x07\x07\x05\x02\x03" +
		"*\b\x03+\t\x03,\n\x03-\v\x03.\f\x03/\r\x030\x0E\x031\x0F\x032\x10\x03" +
		"3\x11\x034\x12\t\x1F\x02\t \x02\t!\x02\x039\x13\x039\x14\x07\x07\x02\x03" +
		">\x15\x03?\x16\x03@\x17\x03A\x18\x03B\x19\x03C\x1A\x03D\x1B\x03E\x1C";
	public static readonly _serializedATN: string = Utils.join(
		[
			LGFileLexer._serializedATNSegment0,
			LGFileLexer._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LGFileLexer.__ATN) {
			LGFileLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(LGFileLexer._serializedATN));
		}

		return LGFileLexer.__ATN;
	}

}

