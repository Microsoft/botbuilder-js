[Bot Builder SDK - Dialogs](../README.md) > [AttachmentPrompt](../classes/botbuilder_dialogs.attachmentprompt.md)



# Class: AttachmentPrompt


:package: **botbuilder-dialogs**

Prompts a user to upload attachments like images. By default the prompt will return to the calling dialog a `Attachment[]` but this can be overridden using a custom `PromptValidator`.

The prompt can be used either as a dialog added to your bots `DialogSet` or on its own as a control if your bot is using some other conversation management system.

### Dialog Usage

When used with your bots `DialogSet` you can simply add a new instance of the prompt as a named dialog using `DialogSet.add()`. You can then start the prompt from a waterfall step using either `DialogContext.begin()` or `DialogContext.prompt()`. The user will be prompted to upload one or more attachments which will be passed as an argument to the callers next waterfall step:

    const { DialogSet, AttachmentPrompt } = require('botbuilder-dialogs');

    const dialogs = new DialogSet();

    dialogs.add('attachmentPrompt', new AttachmentPrompt());

    dialogs.add('uploadImage', [
         async function (dc) {
             await dc.prompt('attachmentPrompt', `Send me image(s)`);
         },
         async function (dc, attachments) {
             await dc.context.sendActivity(`Processing ${attachments.length} images.`);
             await dc.end();
         }
    ]);

If the users response to the prompt fails to be recognized they will be automatically re-prompted to try again. By default the original prompt is re-sent to the user but you can provide an alternate prompt to send by passing in additional options:

    await dc.prompt('attachmentPrompt', `Send me image(s)`, { retryPrompt: `I didn't get anything. Send me an image.` });

The prompts retry logic can also be completely customized by passing the prompts constructor a custom validator:

    dialogs.add('imagePrompt', new AttachmentPrompt(async (context, values) => {
       if (values && values.length > 0) {
          for (let i = 0; i < values.length; i++) {
             if (!values[i].contentType.startsWith('image')) {
                await context.sendActivity(`Only images are accepted.`);
                return undefined;
             }
          }
       } else {
          await context.sendActivity(`Please upload at least one image.`);
       }
       return values;
    }));

### Control Usage

If your bot isn't dialog based you can still use the prompt on its own as a control. You will just need start the prompt from somewhere within your bots logic by calling the prompts `begin()` method:

    const state = {};
    const prompt = new AttachmentPrompt();
    await prompt.begin(context, state, {
        prompt: `Send me image(s)`,
        retryPrompt: `I didn't get anything. Send me an image.`
    });

The prompt will populate the `state` object you passed in with information it needs to process the users response. You should save this off to your bots conversation state as you'll need to pass it to the prompts `continue()` method on the next turn of conversation with the user:

    const prompt = new AttachmentPrompt();
    const result = await prompt.continue(context, state);
    if (!result.active) {
        const attachments = result.result;
    }

The `continue()` method returns a `DialogResult` object which can be used to determine when the prompt is finished and then to access the results of the prompt. To interrupt or cancel the prompt simply delete the `state` object your bot is persisting.

## Type parameters
#### C :  `TurnContext`

The type of `TurnContext` being passed around. This simply lets the typing information for any context extensions flow through to dialogs and waterfall steps.

#### O 

(Optional) output type returned by prompt. This defaults to an `Attachment[]` but can be changed by a custom validator passed to the prompt.

#### R 
#### O 
## Hierarchy


↳  [Prompt](botbuilder_dialogs.prompt.md)`C`

**↳ AttachmentPrompt**







## Implements

* [Dialog](../interfaces/botbuilder_dialogs.dialog.md)`C`

## Index

### Constructors

* [constructor](botbuilder_dialogs.attachmentprompt.md#constructor)


### Properties

* [defaultOptions](botbuilder_dialogs.attachmentprompt.md#defaultoptions)


### Methods

* [begin](botbuilder_dialogs.attachmentprompt.md#begin)
* [continue](botbuilder_dialogs.attachmentprompt.md#continue)
* [dialogBegin](botbuilder_dialogs.attachmentprompt.md#dialogbegin)
* [dialogContinue](botbuilder_dialogs.attachmentprompt.md#dialogcontinue)
* [onPrompt](botbuilder_dialogs.attachmentprompt.md#onprompt)
* [onRecognize](botbuilder_dialogs.attachmentprompt.md#onrecognize)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new AttachmentPrompt**(validator?: *`PromptValidator`.<`Attachment`[]>,.<`O`>*): [AttachmentPrompt](botbuilder_dialogs.attachmentprompt.md)


*Overrides [Prompt](botbuilder_dialogs.prompt.md).[constructor](botbuilder_dialogs.prompt.md#constructor)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/attachmentPrompt.d.ts:107](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/prompts/attachmentPrompt.d.ts#L107)*



Creates a new `AttachmentPrompt` instance.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| validator | `PromptValidator`.<`Attachment`[]>,.<`O`>   |  (Optional) validator that will be called each time the user responds to the prompt. If the validator replies with a message no additional retry prompt will be sent. |





**Returns:** [AttachmentPrompt](botbuilder_dialogs.attachmentprompt.md)

---


## Properties
<a id="defaultoptions"></a>

### «Protected» defaultOptions

**●  defaultOptions**:  *`O`* 

*Inherited from [Control](botbuilder_dialogs.control.md).[defaultOptions](botbuilder_dialogs.control.md#defaultoptions)*

*Defined in [libraries/botbuilder-dialogs/lib/control.d.ts:27](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/control.d.ts#L27)*





___


## Methods
<a id="begin"></a>

###  begin

► **begin**(context: *`C`*, state: *`object`*, options?: *`O`*): `Promise`.<[DialogResult](../interfaces/botbuilder_dialogs.dialogresult.md)`R`>



*Inherited from [Control](botbuilder_dialogs.control.md).[begin](botbuilder_dialogs.control.md#begin)*

*Defined in [libraries/botbuilder-dialogs/lib/control.d.ts:51](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/control.d.ts#L51)*



Starts the control. Depending on the control, its possible for the control to finish immediately so it's advised to check the result object returned by `begin()` and ensure that the control is still active before continuing.

**Usage Example:**

    const state = {};
    const result = await control.begin(context, state);
    if (!result.active) {
        const value = result.result;
    }


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | `C`   |  Context for the current turn of the conversation with the user. |
| state | `object`   |  A state object that the control will use to persist its current state. This should be an empty object which the control will populate. The bot should persist this with its other conversation state for as long as the control is still active. |
| options | `O`   |  (Optional) additional options supported by the control. |





**Returns:** `Promise`.<[DialogResult](../interfaces/botbuilder_dialogs.dialogresult.md)`R`>





___

<a id="continue"></a>

###  continue

► **continue**(context: *`C`*, state: *`object`*): `Promise`.<[DialogResult](../interfaces/botbuilder_dialogs.dialogresult.md)`R`>



*Inherited from [Control](botbuilder_dialogs.control.md).[continue](botbuilder_dialogs.control.md#continue)*

*Defined in [libraries/botbuilder-dialogs/lib/control.d.ts:68](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/control.d.ts#L68)*



Passes a users reply to the control for further processing. The bot should keep calling `continue()` for future turns until the control returns a result with `Active == false`. To cancel or interrupt the prompt simply delete the `state` object being persisted.

**Usage Example:**

    const result = await control.continue(context, state);
    if (!result.active) {
        const value = result.result;
    }


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | `C`   |  Context for the current turn of the conversation with the user. |
| state | `object`   |  A state object that was previously initialized by a call to [begin()](#begin). |





**Returns:** `Promise`.<[DialogResult](../interfaces/botbuilder_dialogs.dialogresult.md)`R`>





___

<a id="dialogbegin"></a>

###  dialogBegin

► **dialogBegin**(dc: *[DialogContext](botbuilder_dialogs.dialogcontext.md)`C`*, options: *[PromptOptions](../interfaces/botbuilder_dialogs.promptoptions.md)*): `Promise`.<`any`>



*Inherited from [Prompt](botbuilder_dialogs.prompt.md).[dialogBegin](botbuilder_dialogs.prompt.md#dialogbegin)*

*Overrides [Control](botbuilder_dialogs.control.md).[dialogBegin](botbuilder_dialogs.control.md#dialogbegin)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts:38](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts#L38)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](botbuilder_dialogs.dialogcontext.md)`C`   |  - |
| options | [PromptOptions](../interfaces/botbuilder_dialogs.promptoptions.md)   |  - |





**Returns:** `Promise`.<`any`>





___

<a id="dialogcontinue"></a>

###  dialogContinue

► **dialogContinue**(dc: *[DialogContext](botbuilder_dialogs.dialogcontext.md)`C`*): `Promise`.<`any`>



*Implementation of [Dialog](../interfaces/botbuilder_dialogs.dialog.md).[dialogContinue](../interfaces/botbuilder_dialogs.dialog.md#dialogcontinue)*

*Inherited from [Prompt](botbuilder_dialogs.prompt.md).[dialogContinue](botbuilder_dialogs.prompt.md#dialogcontinue)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts:39](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/prompts/prompt.d.ts#L39)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](botbuilder_dialogs.dialogcontext.md)`C`   |  - |





**Returns:** `Promise`.<`any`>





___

<a id="onprompt"></a>

### «Protected» onPrompt

► **onPrompt**(dc: *[DialogContext](botbuilder_dialogs.dialogcontext.md)`C`*, options: *[PromptOptions](../interfaces/botbuilder_dialogs.promptoptions.md)*, isRetry: *`boolean`*): `Promise`.<`void`>



*Overrides [Prompt](botbuilder_dialogs.prompt.md).[onPrompt](botbuilder_dialogs.prompt.md#onprompt)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/attachmentPrompt.d.ts:113](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/prompts/attachmentPrompt.d.ts#L113)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](botbuilder_dialogs.dialogcontext.md)`C`   |  - |
| options | [PromptOptions](../interfaces/botbuilder_dialogs.promptoptions.md)   |  - |
| isRetry | `boolean`   |  - |





**Returns:** `Promise`.<`void`>





___

<a id="onrecognize"></a>

### «Protected» onRecognize

► **onRecognize**(dc: *[DialogContext](botbuilder_dialogs.dialogcontext.md)`C`*, options: *[PromptOptions](../interfaces/botbuilder_dialogs.promptoptions.md)*): `Promise`.<`O`⎮`undefined`>



*Overrides [Prompt](botbuilder_dialogs.prompt.md).[onRecognize](botbuilder_dialogs.prompt.md#onrecognize)*

*Defined in [libraries/botbuilder-dialogs/lib/prompts/attachmentPrompt.d.ts:114](https://github.com/Microsoft/botbuilder-js/blob/ad875d1/libraries/botbuilder-dialogs/lib/prompts/attachmentPrompt.d.ts#L114)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](botbuilder_dialogs.dialogcontext.md)`C`   |  - |
| options | [PromptOptions](../interfaces/botbuilder_dialogs.promptoptions.md)   |  - |





**Returns:** `Promise`.<`O`⎮`undefined`>





___


