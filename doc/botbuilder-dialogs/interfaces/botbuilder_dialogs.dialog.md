[Bot Builder SDK - Dialogs](../README.md) > [Dialog](../interfaces/botbuilder_dialogs.dialog.md)



# Interface: Dialog


Interface of Dialog objects that can be added to a `DialogSet`. The dialog should generally be a singleton and added to a dialog set using `DialogSet.add()` at which point it will be assigned a unique ID.

## Type parameters
#### C :  `BotContext`
## Implemented by

* [AttachmentPrompt](../classes/botbuilder_dialogs.attachmentprompt.md)
* [ChoicePrompt](../classes/botbuilder_dialogs.choiceprompt.md)
* [CompositeControl](../classes/botbuilder_dialogs.compositecontrol.md)
* [ConfirmPrompt](../classes/botbuilder_dialogs.confirmprompt.md)
* [Control](../classes/botbuilder_dialogs.control.md)
* [DatetimePrompt](../classes/botbuilder_dialogs.datetimeprompt.md)
* [NumberPrompt](../classes/botbuilder_dialogs.numberprompt.md)
* [Prompt](../classes/botbuilder_dialogs.prompt.md)
* [TextPrompt](../classes/botbuilder_dialogs.textprompt.md)
* [Waterfall](../classes/botbuilder_dialogs.waterfall.md)


## Methods
<a id="dialogbegin"></a>

###  dialogBegin

► **dialogBegin**(dc: *[DialogContext](../classes/botbuilder_dialogs.dialogcontext.md)`C`*, dialogArgs?: *`any`*): `Promiseable`.<`any`>



*Defined in [libraries/botbuilder-dialogs/lib/dialog.d.ts:21](https://github.com/Microsoft/botbuilder-js/blob/f596b7c/libraries/botbuilder-dialogs/lib/dialog.d.ts#L21)*



Method called when a new dialog has been pushed onto the stack and is being activated.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](../classes/botbuilder_dialogs.dialogcontext.md)`C`   |  The dialog context for the current turn of conversation. |
| dialogArgs | `any`   |  (Optional) arguments that were passed to the dialog during `begin()` call that started the instance. |





**Returns:** `Promiseable`.<`any`>





___

<a id="dialogcontinue"></a>

### «Optional» dialogContinue

► **dialogContinue**(dc: *[DialogContext](../classes/botbuilder_dialogs.dialogcontext.md)`C`*): `Promiseable`.<`any`>



*Defined in [libraries/botbuilder-dialogs/lib/dialog.d.ts:31](https://github.com/Microsoft/botbuilder-js/blob/f596b7c/libraries/botbuilder-dialogs/lib/dialog.d.ts#L31)*



(Optional) method called when an instance of the dialog is the "current" dialog and the user replies with a new activity. The dialog will generally continue to receive the users replies until it calls either `DialogSet.end()` or `DialogSet.begin()`.

If this method is NOT implemented then the dialog will automatically be ended when the user replies.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](../classes/botbuilder_dialogs.dialogcontext.md)`C`   |  The dialog context for the current turn of conversation. |





**Returns:** `Promiseable`.<`any`>





___

<a id="dialogresume"></a>

### «Optional» dialogResume

► **dialogResume**(dc: *[DialogContext](../classes/botbuilder_dialogs.dialogcontext.md)`C`*, result?: *`any`*): `Promiseable`.<`any`>



*Defined in [libraries/botbuilder-dialogs/lib/dialog.d.ts:42](https://github.com/Microsoft/botbuilder-js/blob/f596b7c/libraries/botbuilder-dialogs/lib/dialog.d.ts#L42)*



(Optional) method called when an instance of the dialog is being returned to from another dialog that was started by the current instance using `DialogSet.begin()`.

If this method is NOT implemented then the dialog will be automatically ended with a call to `DialogSet.endDialogWithResult()`. Any result passed from the called dialog will be passed to the current dialogs parent.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dc | [DialogContext](../classes/botbuilder_dialogs.dialogcontext.md)`C`   |  The dialog context for the current turn of conversation. |
| result | `any`   |  (Optional) value returned from the dialog that was called. The type of the value returned is dependant on the dialog that was called. |





**Returns:** `Promiseable`.<`any`>





___


