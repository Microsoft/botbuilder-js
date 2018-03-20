[Bot Builder SDK](../README.md) > [CardFactory](../classes/botbuilder.cardfactory.md)



# Class: CardFactory


:package: **botbuilder-core-extensions**

A set of utility functions designed to assist with the formatting of the various card types a bot can return. All of these functions return an `Attachment` which can be added to an `Activity` directly or passed as input to a `MessageStyler` function.

**Usage Example**

    const card = CardFactory.heroCard(
         'White T-Shirt',
         ['https://example.com/whiteShirt.jpg'],
         ['buy']
    );

## Index

### Properties

* [contentTypes](botbuilder.cardfactory.md#contenttypes)


### Methods

* [actions](botbuilder.cardfactory.md#actions)
* [adaptiveCard](botbuilder.cardfactory.md#adaptivecard-1)
* [animationCard](botbuilder.cardfactory.md#animationcard-1)
* [audioCard](botbuilder.cardfactory.md#audiocard-1)
* [heroCard](botbuilder.cardfactory.md#herocard-1)
* [images](botbuilder.cardfactory.md#images)
* [media](botbuilder.cardfactory.md#media)
* [receiptCard](botbuilder.cardfactory.md#receiptcard-1)
* [signinCard](botbuilder.cardfactory.md#signincard-1)
* [thumbnailCard](botbuilder.cardfactory.md#thumbnailcard-1)
* [videoCard](botbuilder.cardfactory.md#videocard-1)



---
## Properties
<a id="contenttypes"></a>

### «Static» contentTypes

**●  contentTypes**:  *`object`* 

*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:28](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L28)*



List of content types for each card style.

#### Type declaration




 adaptiveCard: `string`






 animationCard: `string`






 audioCard: `string`






 heroCard: `string`






 receiptCard: `string`






 signinCard: `string`






 thumbnailCard: `string`






 videoCard: `string`







___


## Methods
<a id="actions"></a>

### «Static» actions

► **actions**(actions: *`any`[]⎮`undefined`*): [CardAction](../interfaces/botbuilder.cardaction.md)[]



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:129](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L129)*



Returns a properly formatted array of actions. Supports converting strings to `messageBack` actions (note: using 'imBack' for now as 'messageBack' doesn't work properly in emulator.)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| actions | `any`[]⎮`undefined`   |  Array of card actions or strings. Strings will be converted to `messageBack` actions. |





**Returns:** [CardAction](../interfaces/botbuilder.cardaction.md)[]





___

<a id="adaptivecard-1"></a>

### «Static» adaptiveCard

► **adaptiveCard**(card: *`any`*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:53](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L53)*



Returns an attachment for an adaptive card. The attachment will contain the card and the appropriate `contentType`.

Adaptive Cards are a new way for bots to send interactive and immersive card content to users. For channels that don't yet support Adaptive Cards natively, the Bot Framework will down render the card to an image that's been styled to look good on the target channel. For channels that support [hero cards](#herocards) you can continue to include Adaptive Card actions and they will be sent as buttons along with the rendered version of the card.

For more information about Adaptive Cards and to download the latest SDK, visit [adaptivecards.io](http://adaptivecards.io/).


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| card | `any`   |  The adaptive card to return as an attachment. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="animationcard-1"></a>

### «Static» animationCard

► **animationCard**(title: *`string`*, media: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[AnimationCard](../interfaces/botbuilder.animationcard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:62](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L62)*



Returns an attachment for an animation card.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  The cards title. |
| media | `any`[]   |  Media URL's for the card. |
| buttons | `any`[]   |  (Optional) set of buttons to include on the card. |
| other | [Partial]()[AnimationCard](../interfaces/botbuilder.animationcard.md)   |  (Optional) additional properties to include on the card. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="audiocard-1"></a>

### «Static» audioCard

► **audioCard**(title: *`string`*, media: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[AnimationCard](../interfaces/botbuilder.animationcard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:71](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L71)*



Returns an attachment for an audio card.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  The cards title. |
| media | `any`[]   |  Media URL's for the card. |
| buttons | `any`[]   |  (Optional) set of buttons to include on the card. |
| other | [Partial]()[AnimationCard](../interfaces/botbuilder.animationcard.md)   |  (Optional) additional properties to include on the card. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="herocard-1"></a>

### «Static» heroCard

► **heroCard**(title: *`string`*, images?: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[HeroCard](../interfaces/botbuilder.herocard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)

► **heroCard**(title: *`string`*, text: *`string`*, images?: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[HeroCard](../interfaces/botbuilder.herocard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:82](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L82)*



Returns an attachment for a hero card. Hero cards tend to have one dominant full width image and the cards text & buttons can usually be found below the image.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  The cards title. |
| images | `any`[]   |  (Optional) set of images to include on the card. |
| buttons | `any`[]   |  (Optional) set of buttons to include on the card. |
| other | [Partial]()[HeroCard](../interfaces/botbuilder.herocard.md)   |  (Optional) additional properties to include on the card. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:83](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L83)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  - |
| text | `string`   |  - |
| images | `any`[]   |  - |
| buttons | `any`[]   |  - |
| other | [Partial]()[HeroCard](../interfaces/botbuilder.herocard.md)   |  - |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="images"></a>

### «Static» images

► **images**(images: *`any`[]⎮`undefined`*): [CardImage](../interfaces/botbuilder.cardimage.md)[]



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:135](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L135)*



Returns a properly formatted array of card images.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| images | `any`[]⎮`undefined`   |  Array of card images or strings. Strings will be converted to card images. |





**Returns:** [CardImage](../interfaces/botbuilder.cardimage.md)[]





___

<a id="media"></a>

### «Static» media

► **media**(links: *`any`[]⎮`undefined`*): [MediaUrl](../interfaces/botbuilder.mediaurl.md)[]



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:141](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L141)*



Returns a properly formatted array of media url objects.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| links | `any`[]⎮`undefined`   |  Array of media url objects or strings. Strings will be converted to a media url object. |





**Returns:** [MediaUrl](../interfaces/botbuilder.mediaurl.md)[]





___

<a id="receiptcard-1"></a>

### «Static» receiptCard

► **receiptCard**(card: *[ReceiptCard](../interfaces/botbuilder.receiptcard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:90](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L90)*



Returns an attachment for a receipt card. The attachment will contain the card and the appropriate `contentType`.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| card | [ReceiptCard](../interfaces/botbuilder.receiptcard.md)   |  The adaptive card to return as an attachment. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="signincard-1"></a>

### «Static» signinCard

► **signinCard**(title: *`string`*, url: *`string`*, text?: *`undefined`⎮`string`*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:99](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L99)*



Returns an attachment for a signin card. For channels that don't natively support signin cards an alternative message will be rendered.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  The cards title. |
| url | `string`   |  The link to the signin page the user needs to visit. |
| text | `undefined`⎮`string`   |  (Optional) additional text to include on the card. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="thumbnailcard-1"></a>

### «Static» thumbnailCard

► **thumbnailCard**(title: *`string`*, images?: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[ThumbnailCard](../interfaces/botbuilder.thumbnailcard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)

► **thumbnailCard**(title: *`string`*, text: *`string`*, images?: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[ThumbnailCard](../interfaces/botbuilder.thumbnailcard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:112](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L112)*



Returns an attachment for a thumbnail card. Thumbnail cards are similar to [hero cards](#herocard) but instead of a full width image, they're typically rendered with a smaller thumbnail version of the image on either side and the text will be rendered in column next to the image. Any buttons will typically show up under the card.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  The cards title. |
| images | `any`[]   |  (Optional) set of images to include on the card. |
| buttons | `any`[]   |  (Optional) set of buttons to include on the card. |
| other | [Partial]()[ThumbnailCard](../interfaces/botbuilder.thumbnailcard.md)   |  (Optional) additional properties to include on the card. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:113](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L113)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  - |
| text | `string`   |  - |
| images | `any`[]   |  - |
| buttons | `any`[]   |  - |
| other | [Partial]()[ThumbnailCard](../interfaces/botbuilder.thumbnailcard.md)   |  - |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___

<a id="videocard-1"></a>

### «Static» videoCard

► **videoCard**(title: *`string`*, media: *`any`[]*, buttons?: *`any`[]*, other?: *[Partial]()[AnimationCard](../interfaces/botbuilder.animationcard.md)*): [Attachment](../interfaces/botbuilder.attachment.md)



*Defined in [libraries/botbuilder-core-extensions/lib/cardFactory.d.ts:122](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/cardFactory.d.ts#L122)*



Returns an attachment for a video card.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | `string`   |  The cards title. |
| media | `any`[]   |  Media URL's for the card. |
| buttons | `any`[]   |  (Optional) set of buttons to include on the card. |
| other | [Partial]()[AnimationCard](../interfaces/botbuilder.animationcard.md)   |  (Optional) additional properties to include on the card. |





**Returns:** [Attachment](../interfaces/botbuilder.attachment.md)





___


