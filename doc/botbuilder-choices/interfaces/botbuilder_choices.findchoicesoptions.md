[Bot Builder SDK - Choices](../README.md) > [FindChoicesOptions](../interfaces/botbuilder_choices.findchoicesoptions.md)



# Interface: FindChoicesOptions


:package: **botbuilder-choices**

Options to control the recognition performed by `findChoices()`.

## Hierarchy


 [FindValuesOptions](botbuilder_choices.findvaluesoptions.md)

**↳ FindChoicesOptions**








## Properties
<a id="allowpartialmatches"></a>

### «Optional» allowPartialMatches

**●  allowPartialMatches**:  *`boolean`* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[allowPartialMatches](botbuilder_choices.findvaluesoptions.md#allowpartialmatches)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:20](https://github.com/Microsoft/botbuilder-js/blob/fbf16f5/libraries/botbuilder-choices/lib/findValues.d.ts#L20)*



(Optional) if true, then only some of the tokens in a value need to exist to be considered a match. The default value is "false".




___

<a id="locale"></a>

### «Optional» locale

**●  locale**:  *`string`* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[locale](botbuilder_choices.findvaluesoptions.md#locale)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:24](https://github.com/Microsoft/botbuilder-js/blob/fbf16f5/libraries/botbuilder-choices/lib/findValues.d.ts#L24)*



(Optional) locale/culture code of the utterance. The default is `en-US`.




___

<a id="maxtokendistance"></a>

### «Optional» maxTokenDistance

**●  maxTokenDistance**:  *`number`* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[maxTokenDistance](botbuilder_choices.findvaluesoptions.md#maxtokendistance)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:31](https://github.com/Microsoft/botbuilder-js/blob/fbf16f5/libraries/botbuilder-choices/lib/findValues.d.ts#L31)*



(Optional) maximum tokens allowed between two matched tokens in the utterance. So with a max distance of 2 the value "second last" would match the utterance "second from the last" but it wouldn't match "Wait a second. That's not the last one is it?". The default value is "2".




___

<a id="noaction"></a>

### «Optional» noAction

**●  noAction**:  *`boolean`* 

*Defined in [libraries/botbuilder-choices/lib/findChoices.d.ts:71](https://github.com/Microsoft/botbuilder-js/blob/fbf16f5/libraries/botbuilder-choices/lib/findChoices.d.ts#L71)*



(Optional) If `true`, the the choices `action.title` field will NOT be searched over. Defaults to `false`.




___

<a id="novalue"></a>

### «Optional» noValue

**●  noValue**:  *`boolean`* 

*Defined in [libraries/botbuilder-choices/lib/findChoices.d.ts:66](https://github.com/Microsoft/botbuilder-js/blob/fbf16f5/libraries/botbuilder-choices/lib/findChoices.d.ts#L66)*



(Optional) If `true`, the choices `value` field will NOT be search over. Defaults to `false`.




___

<a id="tokenizer"></a>

### «Optional» tokenizer

**●  tokenizer**:  *[TokenizerFunction](../#tokenizerfunction)* 

*Inherited from [FindValuesOptions](botbuilder_choices.findvaluesoptions.md).[tokenizer](botbuilder_choices.findvaluesoptions.md#tokenizer)*

*Defined in [libraries/botbuilder-choices/lib/findValues.d.ts:35](https://github.com/Microsoft/botbuilder-js/blob/fbf16f5/libraries/botbuilder-choices/lib/findValues.d.ts#L35)*



(Optional) tokenizer to use when parsing the utterance and values being recognized.




___


