[Bot Builder SDK - Choices](../README.md) > [FindChoicesOptions](../interfaces/botbuilder_choices.findchoicesoptions.md)



# Interface: FindChoicesOptions

## Hierarchy


 [FindValuesOptions](botbuilder_choices.findvaluesoptions.md)

**↳ FindChoicesOptions**








## Properties
<a id="allowpartialmatches"></a>

### «Optional» allowPartialMatches

**●  allowPartialMatches**:  *`undefined`⎮`true`⎮`false`* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[allowPartialMatches](botbuilder_choices.findvaluesoptions.md#allowpartialmatches)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:12](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findValues.d.ts#L12)*



(Optional) if true, then only some of the tokens in a value need to exist to be considered a match. The default value is "false".




___

<a id="culture"></a>

### «Optional» culture

**●  culture**:  *`undefined`⎮`string`* 

*Defined in [libraries/botbuilder-choices/lib/findChoices.d.ts:21](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findChoices.d.ts#L21)*



(Optional) locale of the user preferred language. This is used when recognizing the numerical or ordinal index of the choice. The default is assumed to be `en-US`.




___

<a id="locale"></a>

### «Optional» locale

**●  locale**:  *`undefined`⎮`string`* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[locale](botbuilder_choices.findvaluesoptions.md#locale)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:16](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findValues.d.ts#L16)*



(Optional) locale/culture code of the utterance. The default is `en-US`.




___

<a id="maxtokendistance"></a>

### «Optional» maxTokenDistance

**●  maxTokenDistance**:  *`undefined`⎮`number`* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[maxTokenDistance](botbuilder_choices.findvaluesoptions.md#maxtokendistance)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:23](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findValues.d.ts#L23)*



(Optional) maximum tokens allowed between two matched tokens in the utterance. So with a max distance of 2 the value "second last" would match the utterance "second from the last" but it wouldn't match "Wait a second. That's not the last one is it?". The default value is "2".




___

<a id="noaction"></a>

### «Optional» noAction

**●  noAction**:  *`undefined`⎮`true`⎮`false`* 

*Defined in [libraries/botbuilder-choices/lib/findChoices.d.ts:29](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findChoices.d.ts#L29)*



(Optional) If `true`, the title of the choices action will NOT be searched over. The default is `false`.




___

<a id="novalue"></a>

### «Optional» noValue

**●  noValue**:  *`undefined`⎮`true`⎮`false`* 

*Defined in [libraries/botbuilder-choices/lib/findChoices.d.ts:25](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findChoices.d.ts#L25)*



(Optional) If `true`, the choices value will NOT be search over. The default is `false`.




___

<a id="tokenizer"></a>

### «Optional» tokenizer

**●  tokenizer**:  *[TokenizerFunction]()* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[tokenizer](botbuilder_choices.findvaluesoptions.md#tokenizer)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:27](https://github.com/Microsoft/botbuilder-js/blob/a28edbb/libraries/botbuilder-choices/lib/findValues.d.ts#L27)*



(Optional) tokenizer to use when parsing the utterance and values being recognized.




___


