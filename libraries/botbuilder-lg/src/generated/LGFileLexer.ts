// Generated from src/LGFileLexer.g4 by ANTLR 4.7.3-SNAPSHOT

/**
 * @module botbuilder-lg
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { NotNull } from 'antlr4ts/Decorators';
import { Override } from 'antlr4ts/Decorators';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

export class LGFileLexer extends Lexer {
    public static readonly NEWLINE = 1;
    public static readonly OPTION = 2;
    public static readonly COMMENT = 3;
    public static readonly IMPORT = 4;
    public static readonly TEMPLATE_NAME_LINE = 5;
    public static readonly INLINE_MULTILINE = 6;
    public static readonly MULTILINE_PREFIX = 7;
    public static readonly TEMPLATE_BODY = 8;
    public static readonly INVALID_LINE = 9;
    public static readonly MULTILINE_SUFFIX = 10;
    public static readonly ESCAPE_CHARACTER = 11;
    public static readonly MULTILINE_TEXT = 12;
    public static readonly MULTILINE_MODE = 1;

    // tslint:disable:no-trailing-whitespace
    public static readonly channelNames: string[] = ['DEFAULT_TOKEN_CHANNEL', 'HIDDEN'];

    // tslint:disable:no-trailing-whitespace
    public static readonly modeNames: string[] = ['DEFAULT_MODE', 'MULTILINE_MODE'];

    public static readonly ruleNames: string[] = [
        'WHITESPACE',
        'NEWLINE',
        'OPTION',
        'COMMENT',
        'IMPORT',
        'TEMPLATE_NAME_LINE',
        'INLINE_MULTILINE',
        'MULTILINE_PREFIX',
        'TEMPLATE_BODY',
        'INVALID_LINE',
        'MULTILINE_SUFFIX',
        'ESCAPE_CHARACTER',
        'MULTILINE_TEXT',
    ];

    private static readonly _LITERAL_NAMES: Array<string | undefined> = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "'```'",
    ];
    private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
        undefined,
        'NEWLINE',
        'OPTION',
        'COMMENT',
        'IMPORT',
        'TEMPLATE_NAME_LINE',
        'INLINE_MULTILINE',
        'MULTILINE_PREFIX',
        'TEMPLATE_BODY',
        'INVALID_LINE',
        'MULTILINE_SUFFIX',
        'ESCAPE_CHARACTER',
        'MULTILINE_TEXT',
    ];
    public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
        LGFileLexer._LITERAL_NAMES,
        LGFileLexer._SYMBOLIC_NAMES,
        []
    );

    // @Override
    // @NotNull
    public get vocabulary(): Vocabulary {
        return LGFileLexer.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace

    startTemplate = false;

    constructor(input: CharStream) {
        super(input);
        this._interp = new LexerATNSimulator(LGFileLexer._ATN, this);
    }

    // @Override
    public get grammarFileName(): string {
        return 'LGFileLexer.g4';
    }

    // @Override
    public get ruleNames(): string[] {
        return LGFileLexer.ruleNames;
    }

    // @Override
    public get serializedATN(): string {
        return LGFileLexer._serializedATN;
    }

    // @Override
    public get channelNames(): string[] {
        return LGFileLexer.channelNames;
    }

    // @Override
    public get modeNames(): string[] {
        return LGFileLexer.modeNames;
    }

    // @Override
    public action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void {
        switch (ruleIndex) {
            case 5:
                this.TEMPLATE_NAME_LINE_action(_localctx, actionIndex);
                break;
        }
    }
    private TEMPLATE_NAME_LINE_action(_localctx: RuleContext, actionIndex: number): void {
        switch (actionIndex) {
            case 0:
                this.startTemplate = true;
                break;
        }
    }
    // @Override
    public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
            case 2:
                return this.OPTION_sempred(_localctx, predIndex);

            case 3:
                return this.COMMENT_sempred(_localctx, predIndex);

            case 4:
                return this.IMPORT_sempred(_localctx, predIndex);

            case 5:
                return this.TEMPLATE_NAME_LINE_sempred(_localctx, predIndex);

            case 6:
                return this.INLINE_MULTILINE_sempred(_localctx, predIndex);

            case 7:
                return this.MULTILINE_PREFIX_sempred(_localctx, predIndex);

            case 8:
                return this.TEMPLATE_BODY_sempred(_localctx, predIndex);

            case 9:
                return this.INVALID_LINE_sempred(_localctx, predIndex);
        }
        return true;
    }
    private OPTION_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 0:
                return !this.startTemplate;
        }
        return true;
    }
    private COMMENT_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 1:
                return !this.startTemplate;
        }
        return true;
    }
    private IMPORT_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 2:
                return !this.startTemplate;
        }
        return true;
    }
    private TEMPLATE_NAME_LINE_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 3:
                return this._tokenStartCharPositionInLine == 0;
        }
        return true;
    }
    private INLINE_MULTILINE_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 4:
                return this.startTemplate && this._tokenStartCharPositionInLine == 0;
        }
        return true;
    }
    private MULTILINE_PREFIX_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 5:
                return this.startTemplate && this._tokenStartCharPositionInLine == 0;
        }
        return true;
    }
    private TEMPLATE_BODY_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 6:
                return this.startTemplate;
        }
        return true;
    }
    private INVALID_LINE_sempred(_localctx: RuleContext, predIndex: number): boolean {
        switch (predIndex) {
            case 7:
                return !this.startTemplate;
        }
        return true;
    }

    public static readonly _serializedATN: string =
        '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x0E\xD4\b\x01' +
        '\b\x01\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06' +
        '\t\x06\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f' +
        '\x04\r\t\r\x04\x0E\t\x0E\x03\x02\x03\x02\x03\x03\x05\x03"\n\x03\x03\x03' +
        "\x03\x03\x03\x04\x07\x04'\n\x04\f\x04\x0E\x04*\v\x04\x03\x04\x03\x04" +
        '\x07\x04.\n\x04\f\x04\x0E\x041\v\x04\x03\x04\x03\x04\x03\x04\x03\x04\x06' +
        '\x047\n\x04\r\x04\x0E\x048\x03\x04\x03\x04\x03\x05\x07\x05>\n\x05\f\x05' +
        '\x0E\x05A\v\x05\x03\x05\x03\x05\x07\x05E\n\x05\f\x05\x0E\x05H\v\x05\x03' +
        '\x05\x03\x05\x03\x06\x07\x06M\n\x06\f\x06\x0E\x06P\v\x06\x03\x06\x03\x06' +
        '\x07\x06T\n\x06\f\x06\x0E\x06W\v\x06\x03\x06\x03\x06\x03\x06\x07\x06\\' +
        '\n\x06\f\x06\x0E\x06_\v\x06\x03\x06\x03\x06\x07\x06c\n\x06\f\x06\x0E\x06' +
        'f\v\x06\x03\x06\x03\x06\x03\x07\x07\x07k\n\x07\f\x07\x0E\x07n\v\x07\x03' +
        '\x07\x03\x07\x07\x07r\n\x07\f\x07\x0E\x07u\v\x07\x03\x07\x03\x07\x03\x07' +
        '\x03\b\x07\b{\n\b\f\b\x0E\b~\v\b\x03\b\x03\b\x07\b\x82\n\b\f\b\x0E\b\x85' +
        '\v\b\x03\b\x03\b\x03\b\x03\b\x03\b\x07\b\x8C\n\b\f\b\x0E\b\x8F\v\b\x03' +
        '\b\x03\b\x03\b\x03\b\x03\b\x07\b\x96\n\b\f\b\x0E\b\x99\v\b\x03\b\x03\b' +
        '\x03\t\x07\t\x9E\n\t\f\t\x0E\t\xA1\v\t\x03\t\x03\t\x07\t\xA5\n\t\f\t\x0E' +
        '\t\xA8\v\t\x03\t\x03\t\x03\t\x03\t\x03\t\x07\t\xAF\n\t\f\t\x0E\t\xB2\v' +
        '\t\x03\t\x03\t\x03\t\x03\t\x03\n\x06\n\xB9\n\n\r\n\x0E\n\xBA\x03\n\x03' +
        '\n\x03\v\x06\v\xC0\n\v\r\v\x0E\v\xC1\x03\v\x03\v\x03\f\x03\f\x03\f\x03' +
        '\f\x03\f\x03\f\x03\r\x03\r\x05\r\xCE\n\r\x03\x0E\x06\x0E\xD1\n\x0E\r\x0E' +
        '\x0E\x0E\xD2\x05U]\xD2\x02\x02\x0F\x04\x02\x02\x06\x02\x03\b\x02\x04\n' +
        '\x02\x05\f\x02\x06\x0E\x02\x07\x10\x02\b\x12\x02\t\x14\x02\n\x16\x02\v' +
        '\x18\x02\f\x1A\x02\r\x1C\x02\x0E\x04\x02\x03\x06\x06\x02\v\v""\xA2\xA2' +
        '\uFF01\uFF01\x04\x02\f\f\x0F\x0F\x06\x02\f\f\x0F\x0F]]__\x05\x02\f\f\x0F' +
        '\x0F*+\x02\xE8\x02\x06\x03\x02\x02\x02\x02\b\x03\x02\x02\x02\x02\n\x03' +
        '\x02\x02\x02\x02\f\x03\x02\x02\x02\x02\x0E\x03\x02\x02\x02\x02\x10\x03' +
        '\x02\x02\x02\x02\x12\x03\x02\x02\x02\x02\x14\x03\x02\x02\x02\x02\x16\x03' +
        '\x02\x02\x02\x03\x18\x03\x02\x02\x02\x03\x1A\x03\x02\x02\x02\x03\x1C\x03' +
        '\x02\x02\x02\x04\x1E\x03\x02\x02\x02\x06!\x03\x02\x02\x02\b(\x03\x02\x02' +
        '\x02\n?\x03\x02\x02\x02\fN\x03\x02\x02\x02\x0El\x03\x02\x02\x02\x10|\x03' +
        '\x02\x02\x02\x12\x9F\x03\x02\x02\x02\x14\xB8\x03\x02\x02\x02\x16\xBF\x03' +
        '\x02\x02\x02\x18\xC5\x03\x02\x02\x02\x1A\xCB\x03\x02\x02\x02\x1C\xD0\x03' +
        '\x02\x02\x02\x1E\x1F\t\x02\x02\x02\x1F\x05\x03\x02\x02\x02 "\x07\x0F' +
        '\x02\x02! \x03\x02\x02\x02!"\x03\x02\x02\x02"#\x03\x02\x02\x02#$\x07' +
        "\f\x02\x02$\x07\x03\x02\x02\x02%'\x05\x04\x02\x02&%\x03\x02\x02\x02'" +
        '*\x03\x02\x02\x02(&\x03\x02\x02\x02()\x03\x02\x02\x02)+\x03\x02\x02\x02' +
        '*(\x03\x02\x02\x02+/\x07@\x02\x02,.\x05\x04\x02\x02-,\x03\x02\x02\x02' +
        '.1\x03\x02\x02\x02/-\x03\x02\x02\x02/0\x03\x02\x02\x0202\x03\x02\x02\x02' +
        '1/\x03\x02\x02\x0223\x07#\x02\x0234\x07%\x02\x0246\x03\x02\x02\x0257\n' +
        '\x03\x02\x0265\x03\x02\x02\x0278\x03\x02\x02\x0286\x03\x02\x02\x0289\x03' +
        '\x02\x02\x029:\x03\x02\x02\x02:;\x06\x04\x02\x02;\t\x03\x02\x02\x02<>' +
        '\x05\x04\x02\x02=<\x03\x02\x02\x02>A\x03\x02\x02\x02?=\x03\x02\x02\x02' +
        '?@\x03\x02\x02\x02@B\x03\x02\x02\x02A?\x03\x02\x02\x02BF\x07@\x02\x02' +
        'CE\n\x03\x02\x02DC\x03\x02\x02\x02EH\x03\x02\x02\x02FD\x03\x02\x02\x02' +
        'FG\x03\x02\x02\x02GI\x03\x02\x02\x02HF\x03\x02\x02\x02IJ\x06\x05\x03\x02' +
        'J\v\x03\x02\x02\x02KM\x05\x04\x02\x02LK\x03\x02\x02\x02MP\x03\x02\x02' +
        '\x02NL\x03\x02\x02\x02NO\x03\x02\x02\x02OQ\x03\x02\x02\x02PN\x03\x02\x02' +
        '\x02QU\x07]\x02\x02RT\n\x04\x02\x02SR\x03\x02\x02\x02TW\x03\x02\x02\x02' +
        'UV\x03\x02\x02\x02US\x03\x02\x02\x02VX\x03\x02\x02\x02WU\x03\x02\x02\x02' +
        'XY\x07_\x02\x02Y]\x07*\x02\x02Z\\\n\x05\x02\x02[Z\x03\x02\x02\x02\\_\x03' +
        '\x02\x02\x02]^\x03\x02\x02\x02][\x03\x02\x02\x02^`\x03\x02\x02\x02_]\x03' +
        '\x02\x02\x02`d\x07+\x02\x02ac\x05\x04\x02\x02ba\x03\x02\x02\x02cf\x03' +
        '\x02\x02\x02db\x03\x02\x02\x02de\x03\x02\x02\x02eg\x03\x02\x02\x02fd\x03' +
        '\x02\x02\x02gh\x06\x06\x04\x02h\r\x03\x02\x02\x02ik\x05\x04\x02\x02ji' +
        '\x03\x02\x02\x02kn\x03\x02\x02\x02lj\x03\x02\x02\x02lm\x03\x02\x02\x02' +
        'mo\x03\x02\x02\x02nl\x03\x02\x02\x02os\x07%\x02\x02pr\n\x03\x02\x02qp' +
        '\x03\x02\x02\x02ru\x03\x02\x02\x02sq\x03\x02\x02\x02st\x03\x02\x02\x02' +
        'tv\x03\x02\x02\x02us\x03\x02\x02\x02vw\x06\x07\x05\x02wx\b\x07\x02\x02' +
        'x\x0F\x03\x02\x02\x02y{\x05\x04\x02\x02zy\x03\x02\x02\x02{~\x03\x02\x02' +
        '\x02|z\x03\x02\x02\x02|}\x03\x02\x02\x02}\x7F\x03\x02\x02\x02~|\x03\x02' +
        '\x02\x02\x7F\x83\x07/\x02\x02\x80\x82\x05\x04\x02\x02\x81\x80\x03\x02' +
        '\x02\x02\x82\x85\x03\x02\x02\x02\x83\x81\x03\x02\x02\x02\x83\x84\x03\x02' +
        '\x02\x02\x84\x86\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02\x86\x87\x07b' +
        '\x02\x02\x87\x88\x07b\x02\x02\x88\x89\x07b\x02\x02\x89\x8D\x03\x02\x02' +
        '\x02\x8A\x8C\n\x03\x02\x02\x8B\x8A\x03\x02\x02\x02\x8C\x8F\x03\x02\x02' +
        '\x02\x8D\x8B\x03\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E\x90\x03\x02\x02' +
        '\x02\x8F\x8D\x03\x02\x02\x02\x90\x91\x07b\x02\x02\x91\x92\x07b\x02\x02' +
        '\x92\x93\x07b\x02\x02\x93\x97\x03\x02\x02\x02\x94\x96\x05\x04\x02\x02' +
        '\x95\x94\x03\x02\x02\x02\x96\x99\x03\x02\x02\x02\x97\x95\x03\x02\x02\x02' +
        '\x97\x98\x03\x02\x02\x02\x98\x9A\x03\x02\x02\x02\x99\x97\x03\x02\x02\x02' +
        '\x9A\x9B\x06\b\x06\x02\x9B\x11\x03\x02\x02\x02\x9C\x9E\x05\x04\x02\x02' +
        '\x9D\x9C\x03\x02\x02\x02\x9E\xA1\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02' +
        '\x9F\xA0\x03\x02\x02\x02\xA0\xA2\x03\x02\x02\x02\xA1\x9F\x03\x02\x02\x02' +
        '\xA2\xA6\x07/\x02\x02\xA3\xA5\x05\x04\x02\x02\xA4\xA3\x03\x02\x02\x02' +
        '\xA5\xA8\x03\x02\x02\x02\xA6\xA4\x03\x02\x02\x02\xA6\xA7\x03\x02\x02\x02' +
        '\xA7\xA9\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA9\xAA\x07b\x02\x02' +
        '\xAA\xAB\x07b\x02\x02\xAB\xAC\x07b\x02\x02\xAC\xB0\x03\x02\x02\x02\xAD' +
        '\xAF\n\x03\x02\x02\xAE\xAD\x03\x02\x02\x02\xAF\xB2\x03\x02\x02\x02\xB0' +
        '\xAE\x03\x02\x02\x02\xB0\xB1\x03\x02\x02\x02\xB1\xB3\x03\x02\x02\x02\xB2' +
        '\xB0\x03\x02\x02\x02\xB3\xB4\x06\t\x07\x02\xB4\xB5\x03\x02\x02\x02\xB5' +
        '\xB6\b\t\x03\x02\xB6\x13\x03\x02\x02\x02\xB7\xB9\n\x03\x02\x02\xB8\xB7' +
        '\x03\x02\x02\x02\xB9\xBA\x03\x02\x02\x02\xBA\xB8\x03\x02\x02\x02\xBA\xBB' +
        '\x03\x02\x02\x02\xBB\xBC\x03\x02\x02\x02\xBC\xBD\x06\n\b\x02\xBD\x15\x03' +
        '\x02\x02\x02\xBE\xC0\n\x03\x02\x02\xBF\xBE\x03\x02\x02\x02\xC0\xC1\x03' +
        '\x02\x02\x02\xC1\xBF\x03\x02\x02\x02\xC1\xC2\x03\x02\x02\x02\xC2\xC3\x03' +
        '\x02\x02\x02\xC3\xC4\x06\v\t\x02\xC4\x17\x03\x02\x02\x02\xC5\xC6\x07b' +
        '\x02\x02\xC6\xC7\x07b\x02\x02\xC7\xC8\x07b\x02\x02\xC8\xC9\x03\x02\x02' +
        '\x02\xC9\xCA\b\f\x04\x02\xCA\x19\x03\x02\x02\x02\xCB\xCD\x07^\x02\x02' +
        '\xCC\xCE\n\x03\x02\x02\xCD\xCC\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02' +
        '\xCE\x1B\x03\x02\x02\x02\xCF\xD1\v\x02\x02\x02\xD0\xCF\x03\x02\x02\x02' +
        '\xD1\xD2\x03\x02\x02\x02\xD2\xD3\x03\x02\x02\x02\xD2\xD0\x03\x02\x02\x02' +
        '\xD3\x1D\x03\x02\x02\x02\x1B\x02\x03!(/8?FNU]dls|\x83\x8D\x97\x9F\xA6' +
        '\xB0\xBA\xC1\xCD\xD2\x05\x03\x07\x02\x07\x03\x02\x06\x02\x02';
    public static __ATN: ATN;
    public static get _ATN(): ATN {
        if (!LGFileLexer.__ATN) {
            LGFileLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(LGFileLexer._serializedATN));
        }

        return LGFileLexer.__ATN;
    }
}
