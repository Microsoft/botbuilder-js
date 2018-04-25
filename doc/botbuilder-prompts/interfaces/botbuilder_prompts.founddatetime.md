[Bot Builder SDK - Prompts](../README.md) > [FoundDatetime](../interfaces/botbuilder_prompts.founddatetime.md)



# Interface: FoundDatetime


:package: **botbuilder-prompts**

Datetime result returned by `DatetimePrompt`. For more details see the LUIS docs for [builtin.datetimev2](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-prebuilt-entities#builtindatetimev2).


## Properties
<a id="timex"></a>

###  timex

**●  timex**:  *`string`* 

*Defined in [libraries/botbuilder-prompts/lib/datetimePrompt.d.ts:20](https://github.com/Microsoft/botbuilder-js/blob/b50d910/libraries/botbuilder-prompts/lib/datetimePrompt.d.ts#L20)*



TIMEX expression representing ambiguity of the recognized time.




___

<a id="type"></a>

###  type

**●  type**:  *`string`* 

*Defined in [libraries/botbuilder-prompts/lib/datetimePrompt.d.ts:25](https://github.com/Microsoft/botbuilder-js/blob/b50d910/libraries/botbuilder-prompts/lib/datetimePrompt.d.ts#L25)*



Type of time recognized. Possible values are 'date', 'time', 'datetime', 'daterange', 'timerange', 'datetimerange', 'duration', or 'set'.




___

<a id="value"></a>

###  value

**●  value**:  *`string`* 

*Defined in [libraries/botbuilder-prompts/lib/datetimePrompt.d.ts:30](https://github.com/Microsoft/botbuilder-js/blob/b50d910/libraries/botbuilder-prompts/lib/datetimePrompt.d.ts#L30)*



Value of the specified [type](#type) that's a reasonable approximation given the ambiguity of the [timex](#timex).




___


