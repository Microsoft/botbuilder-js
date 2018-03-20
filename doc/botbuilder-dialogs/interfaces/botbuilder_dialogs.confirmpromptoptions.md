[Bot Builder SDK - Dialogs](../README.md) > [ConfirmPromptOptions](../interfaces/botbuilder_dialogs.confirmpromptoptions.md)



# Interface: ConfirmPromptOptions


Additional options that can be used to configure a `ChoicePrompt`.

## Hierarchy


 [PromptOptions](botbuilder_dialogs.promptoptions.md)

**↳ ConfirmPromptOptions**








## Properties
<a id="prompt"></a>

### «Optional» prompt

**●  prompt**:  *`string`⎮[Partial]()[Activity]()* 

*Inherited from [PromptOptions](botbuilder_dialogs.promptoptions.md).[prompt](botbuilder_dialogs.promptoptions.md#prompt)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts:13](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts#L13)*



(Optional) Initial prompt to send the user.




___

<a id="retryprompt"></a>

### «Optional» retryPrompt

**●  retryPrompt**:  *`string`⎮[Partial]()[Activity]()* 

*Inherited from [PromptOptions](botbuilder_dialogs.promptoptions.md).[retryPrompt](botbuilder_dialogs.promptoptions.md#retryprompt)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts:17](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts#L17)*



(Optional) Retry prompt to send the user.




___

<a id="retryspeak"></a>

### «Optional» retrySpeak

**●  retrySpeak**:  *`undefined`⎮`string`* 

*Inherited from [PromptOptions](botbuilder_dialogs.promptoptions.md).[retrySpeak](botbuilder_dialogs.promptoptions.md#retryspeak)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts:19](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts#L19)*



(Optional) Retry SSML to send the user.




___

<a id="speak"></a>

### «Optional» speak

**●  speak**:  *`undefined`⎮`string`* 

*Inherited from [PromptOptions](botbuilder_dialogs.promptoptions.md).[speak](botbuilder_dialogs.promptoptions.md#speak)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts:15](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts#L15)*



(Optional) Initial SSML to send the user.




___

<a id="style"></a>

### «Optional» style

**●  style**:  *[ListStyle](../enums/botbuilder_dialogs.liststyle.md)* 

*Defined in [libraries/botbuilder-dialogs/lib/prompts/confirmPrompt.d.ts:21](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-dialogs/lib/prompts/confirmPrompt.d.ts#L21)*



Preferred style of the yes/no choices sent to the user. The default value is `ListStyle.auto`.




___


