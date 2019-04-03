// Generated from Expression.g4 by ANTLR 4.6-SNAPSHOT


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


export class ExpressionLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly NUMBER = 23;
	public static readonly WHITESPACE = 24;
	public static readonly IDENTIFIER = 25;
	public static readonly NEWLINE = 26;
	public static readonly STRING = 27;
	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
		"T__17", "T__18", "T__19", "T__20", "T__21", "LETTER", "DIGIT", "NUMBER", 
		"WHITESPACE", "IDENTIFIER", "NEWLINE", "STRING",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'!'", "'^'", "'*'", "'/'", "'%'", "'+'", "'-'", "'=='", "'!='", 
		"'<>'", "'<'", "'<='", "'>'", "'>='", "'&&'", "'||'", "'('", "')'", "'.'", 
		"'['", "']'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, "NUMBER", "WHITESPACE", "IDENTIFIER", "NEWLINE", 
		"STRING",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ExpressionLexer._LITERAL_NAMES, ExpressionLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ExpressionLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(ExpressionLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Expression.g4"; }

	// @Override
	public get ruleNames(): string[] { return ExpressionLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return ExpressionLexer._serializedATN; }

	// @Override
	public get modeNames(): string[] { return ExpressionLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\x1D\xA1\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
		"\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04" +
		"\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03" +
		"\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\f\x03\f\x03\r\x03" +
		"\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10" +
		"\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03\x14\x03\x14" +
		"\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19" +
		"\x03\x19\x03\x1A\x06\x1Av\n\x1A\r\x1A\x0E\x1Aw\x03\x1A\x03\x1A\x06\x1A" +
		"|\n\x1A\r\x1A\x0E\x1A}\x05\x1A\x80\n\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1C\x03\x1C\x05\x1C\x88\n\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C\x8D" +
		"\n\x1C\f\x1C\x0E\x1C\x90\v\x1C\x03\x1D\x05\x1D\x93\n\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x07\x1E\x9B\n\x1E\f\x1E\x0E\x1E\x9E\v" +
		"\x1E\x03\x1E\x03\x1E\x02\x02\x02\x1F\x03\x02\x03\x05\x02\x04\x07\x02\x05" +
		"\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17" +
		"\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13" +
		"%\x02\x14\'\x02\x15)\x02\x16+\x02\x17-\x02\x18/\x02\x021\x02\x023\x02" +
		"\x195\x02\x1A7\x02\x1B9\x02\x1C;\x02\x1D\x03\x02\x07\x04\x02C\\c|\x03" +
		"\x022;\x04\x02\v\v\"\"\x04\x02//aa\x03\x02))\xA7\x02\x03\x03\x02\x02\x02" +
		"\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02" +
		"\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02" +
		"\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02" +
		"\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02" +
		"\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02" +
		"#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03" +
		"\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x023\x03\x02\x02" +
		"\x02\x025\x03\x02\x02\x02\x027\x03\x02\x02\x02\x029\x03\x02\x02\x02\x02" +
		";\x03\x02\x02\x02\x03=\x03\x02\x02\x02\x05?\x03\x02\x02\x02\x07A\x03\x02" +
		"\x02\x02\tC\x03\x02\x02\x02\vE\x03\x02\x02\x02\rG\x03\x02\x02\x02\x0F" +
		"I\x03\x02\x02\x02\x11K\x03\x02\x02\x02\x13N\x03\x02\x02\x02\x15Q\x03\x02" +
		"\x02\x02\x17T\x03\x02\x02\x02\x19V\x03\x02\x02\x02\x1BY\x03\x02\x02\x02" +
		"\x1D[\x03\x02\x02\x02\x1F^\x03\x02\x02\x02!a\x03\x02\x02\x02#d\x03\x02" +
		"\x02\x02%f\x03\x02\x02\x02\'h\x03\x02\x02\x02)j\x03\x02\x02\x02+l\x03" +
		"\x02\x02\x02-n\x03\x02\x02\x02/p\x03\x02\x02\x021r\x03\x02\x02\x023u\x03" +
		"\x02\x02\x025\x81\x03\x02\x02\x027\x87\x03\x02\x02\x029\x92\x03\x02\x02" +
		"\x02;\x98\x03\x02\x02\x02=>\x07#\x02\x02>\x04\x03\x02\x02\x02?@\x07`\x02" +
		"\x02@\x06\x03\x02\x02\x02AB\x07,\x02\x02B\b\x03\x02\x02\x02CD\x071\x02" +
		"\x02D\n\x03\x02\x02\x02EF\x07\'\x02\x02F\f\x03\x02\x02\x02GH\x07-\x02" +
		"\x02H\x0E\x03\x02\x02\x02IJ\x07/\x02\x02J\x10\x03\x02\x02\x02KL\x07?\x02" +
		"\x02LM\x07?\x02\x02M\x12\x03\x02\x02\x02NO\x07#\x02\x02OP\x07?\x02\x02" +
		"P\x14\x03\x02\x02\x02QR\x07>\x02\x02RS\x07@\x02\x02S\x16\x03\x02\x02\x02" +
		"TU\x07>\x02\x02U\x18\x03\x02\x02\x02VW\x07>\x02\x02WX\x07?\x02\x02X\x1A" +
		"\x03\x02\x02\x02YZ\x07@\x02\x02Z\x1C\x03\x02\x02\x02[\\\x07@\x02\x02\\" +
		"]\x07?\x02\x02]\x1E\x03\x02\x02\x02^_\x07(\x02\x02_`\x07(\x02\x02` \x03" +
		"\x02\x02\x02ab\x07~\x02\x02bc\x07~\x02\x02c\"\x03\x02\x02\x02de\x07*\x02" +
		"\x02e$\x03\x02\x02\x02fg\x07+\x02\x02g&\x03\x02\x02\x02hi\x070\x02\x02" +
		"i(\x03\x02\x02\x02jk\x07]\x02\x02k*\x03\x02\x02\x02lm\x07_\x02\x02m,\x03" +
		"\x02\x02\x02no\x07.\x02\x02o.\x03\x02\x02\x02pq\t\x02\x02\x02q0\x03\x02" +
		"\x02\x02rs\t\x03\x02\x02s2\x03\x02\x02\x02tv\x051\x19\x02ut\x03\x02\x02" +
		"\x02vw\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02\x02x\x7F\x03\x02" +
		"\x02\x02y{\x070\x02\x02z|\x051\x19\x02{z\x03\x02\x02\x02|}\x03\x02\x02" +
		"\x02}{\x03\x02\x02\x02}~\x03\x02\x02\x02~\x80\x03\x02\x02\x02\x7Fy\x03" +
		"\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x804\x03\x02\x02\x02\x81\x82\t\x04" +
		"\x02\x02\x82\x83\x03\x02\x02\x02\x83\x84\b\x1B\x02\x02\x846\x03\x02\x02" +
		"\x02\x85\x88\x05/\x18\x02\x86\x88\x07a\x02\x02\x87\x85\x03\x02\x02\x02" +
		"\x87\x86\x03\x02\x02\x02\x88\x8E\x03\x02\x02\x02\x89\x8D\x05/\x18\x02" +
		"\x8A\x8D\x051\x19\x02\x8B\x8D\t\x05\x02\x02\x8C\x89\x03\x02\x02\x02\x8C" +
		"\x8A\x03\x02\x02\x02\x8C\x8B\x03\x02\x02\x02\x8D\x90\x03\x02\x02\x02\x8E" +
		"\x8C\x03\x02\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F8\x03\x02\x02\x02\x90" +
		"\x8E\x03\x02\x02\x02\x91\x93\x07\x0F\x02\x02\x92\x91\x03\x02\x02\x02\x92" +
		"\x93\x03\x02\x02\x02\x93\x94\x03\x02\x02\x02\x94\x95\x07\f\x02\x02\x95" +
		"\x96\x03\x02\x02\x02\x96\x97\b\x1D\x02\x02\x97:\x03\x02\x02\x02\x98\x9C" +
		"\x07)\x02\x02\x99\x9B\n\x06\x02\x02\x9A\x99\x03\x02\x02\x02\x9B\x9E\x03" +
		"\x02\x02\x02\x9C\x9A\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9F\x03" +
		"\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9F\xA0\x07)\x02\x02\xA0<\x03\x02" +
		"\x02\x02\v\x02w}\x7F\x87\x8C\x8E\x92\x9C\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ExpressionLexer.__ATN) {
			ExpressionLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ExpressionLexer._serializedATN));
		}

		return ExpressionLexer.__ATN;
	}

}

