[Bot Builder SDK - Dialogs](../README.md) > [FoundDatetime](../interfaces/botbuilder_dialogs.founddatetime.md)



# Interface: FoundDatetime


Datetime result returned by `DatetimePrompt`. For more details see the LUIS docs for [builtin.datetimev2](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-prebuilt-entities#builtindatetimev2).


## Properties
<a id="timex"></a>

###  timex

**●  timex**:  *`string`* 

*Defined in [libraries/botbuilder-dialogs/lib/prompts/datetimePrompt.d.ts:19](https://github.com/Microsoft/botbuilder-js/blob/071de25/libraries/botbuilder-dialogs/lib/prompts/datetimePrompt.d.ts#L19)*



TIMEX expression representing ambiguity of the recognized time.




___

<a id="type"></a>

###  type

**●  type**:  *`string`* 

*Defined in [libraries/botbuilder-dialogs/lib/prompts/datetimePrompt.d.ts:24](https://github.com/Microsoft/botbuilder-js/blob/071de25/libraries/botbuilder-dialogs/lib/prompts/datetimePrompt.d.ts#L24)*



Type of time recognized. Possible values are 'date', 'time', 'datetime', 'daterange', 'timerange', 'datetimerange', 'duration', or 'set'.




___

<a id="value"></a>

###  value

**●  value**:  *`string`* 

*Defined in [libraries/botbuilder-dialogs/lib/prompts/datetimePrompt.d.ts:29](https://github.com/Microsoft/botbuilder-js/blob/071de25/libraries/botbuilder-dialogs/lib/prompts/datetimePrompt.d.ts#L29)*



Value of the specified [type](#type) that's a reasonable approximation given the ambiguity of the [timex](#timex).




___


