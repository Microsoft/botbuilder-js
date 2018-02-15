[Bot Builder SDK - Core](../README.md) > [Bot](../classes/botbuilder.bot.md)



# Class: Bot


Manages all communication between the bot and a user.

**Usage Example**

    import { Bot } from 'botbuilder'; // typescript

    const bot = new Bot(adapter); // init bot and bind to adapter

    bot.onReceive((context) => { // define the bot's onReceive handler
      context.reply(`Hello World`); // send message to user
    });

## Hierarchy


 [MiddlewareSet](botbuilder.middlewareset.md)

**↳ Bot**







## Implements

* [Middleware](../interfaces/botbuilder.middleware.md)

## Index

### Constructors

* [constructor](botbuilder.bot.md#constructor)


### Properties

* [adapter](botbuilder.bot.md#adapter)
* [middleware](botbuilder.bot.md#middleware)


### Methods

* [contextCreated](botbuilder.bot.md#contextcreated)
* [createContext](botbuilder.bot.md#createcontext)
* [onReceive](botbuilder.bot.md#onreceive)
* [post](botbuilder.bot.md#post)
* [postActivity](botbuilder.bot.md#postactivity)
* [receive](botbuilder.bot.md#receive)
* [receiveActivity](botbuilder.bot.md#receiveactivity)
* [use](botbuilder.bot.md#use)
* [useTemplateRenderer](botbuilder.bot.md#usetemplaterenderer)
* [useTemplates](botbuilder.bot.md#usetemplates)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Bot**(adapter: *[ActivityAdapter](../interfaces/botbuilder.activityadapter.md)*): [Bot](botbuilder.bot.md)


*Defined in [libraries/botbuilder/lib/bot.d.ts:31](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L31)*



Creates a new instance of a bot


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| adapter | [ActivityAdapter](../interfaces/botbuilder.activityadapter.md)   |  Connector used to link the bot to the user communication wise. |





**Returns:** [Bot](botbuilder.bot.md)

---


## Properties
<a id="adapter"></a>

###  adapter

**●  adapter**:  *[ActivityAdapter](../interfaces/botbuilder.activityadapter.md)* 

*Defined in [libraries/botbuilder/lib/bot.d.ts:39](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L39)*



Returns the current adapter.




___

<a id="middleware"></a>

###  middleware

**●  middleware**:  *[Middleware](../interfaces/botbuilder.middleware.md)[]* 

*Inherited from [MiddlewareSet](botbuilder.middlewareset.md).[middleware](botbuilder.middlewareset.md#middleware)*

*Defined in [libraries/botbuilder/lib/middlewareSet.d.ts:20](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/middlewareSet.d.ts#L20)*



Returns the underlying array of middleware.




___


## Methods
<a id="contextcreated"></a>

###  contextCreated

► **contextCreated**(context: *[BotContext](../interfaces/botbuilder.__global.botcontext.md)*, next: *`function`*): `Promise`.<`void`>



*Inherited from [MiddlewareSet](botbuilder.middlewareset.md).[contextCreated](botbuilder.middlewareset.md#contextcreated)*

*Defined in [libraries/botbuilder/lib/middlewareSet.d.ts:27](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/middlewareSet.d.ts#L27)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | [BotContext](../interfaces/botbuilder.__global.botcontext.md)   |  - |
| next | `function`   |  - |





**Returns:** `Promise`.<`void`>





___

<a id="createcontext"></a>

###  createContext

► **createContext**(activityOrReference: *[Activity]()⎮[ConversationReference]()*, onReady: *`function`*): `Promise`.<`void`>



*Defined in [libraries/botbuilder/lib/bot.d.ts:59](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L59)*



Creates a new context object given an activity or conversation reference. The context object will be disposed of automatically once the callback completes or the promise it returns completes.

**Usage Example**

    subscribers.forEach((subscriber) => {
         bot.createContext(subscriber.savedReference, (context) => {
             context.reply(`Hi ${subscriber.name}... Here's what's new with us.`)
                    .reply(newsFlash);
         });
    });


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activityOrReference | [Activity]()⎮[ConversationReference]()   |  Activity or ConversationReference to initialize the context object with. |
| onReady | `function`   |  Function that will use the created context object. |





**Returns:** `Promise`.<`void`>





___

<a id="onreceive"></a>

###  onReceive

► **onReceive**(...receivers: *`function`[]*): `this`



*Defined in [libraries/botbuilder/lib/bot.d.ts:76](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L76)*



Registers a new receiver with the bot. All incoming activities are routed to receivers in the order they're registered. The first receiver to return `{ handled: true }` prevents the receivers after it from being called.

**Usage Example**

    const bot = new Bot(adapter)
         .onReceive((context) => {
            context.reply(`Hello World`);
         });


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| receivers | `function`[]   |  One or more receivers to register. |





**Returns:** `this`





___

<a id="post"></a>

###  post

► **post**(context: *[BotContext](../interfaces/botbuilder.__global.botcontext.md)*, ...activities: *[Partial]()[Activity]()[]*): `Promise`.<[ResourceResponse]()[]>



*Defined in [libraries/botbuilder/lib/bot.d.ts:94](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L94)*



INTERNAL sends an outgoing set of activities to the user. Calling `context.flushResponses()` achieves the same effect and is the preferred way of sending activities to the user.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | [BotContext](../interfaces/botbuilder.__global.botcontext.md)   |  Context for the current turn of the conversation. |
| activities | [Partial]()[Activity]()[]   |  Set of activities to send. |





**Returns:** `Promise`.<[ResourceResponse]()[]>





___

<a id="postactivity"></a>

###  postActivity

► **postActivity**(context: *[BotContext](../interfaces/botbuilder.__global.botcontext.md)*, activities: *[Partial]()[Activity]()[]*, next: *`function`*): `Promise`.<[ResourceResponse]()[]>



*Inherited from [MiddlewareSet](botbuilder.middlewareset.md).[postActivity](botbuilder.middlewareset.md#postactivity)*

*Defined in [libraries/botbuilder/lib/middlewareSet.d.ts:29](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/middlewareSet.d.ts#L29)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | [BotContext](../interfaces/botbuilder.__global.botcontext.md)   |  - |
| activities | [Partial]()[Activity]()[]   |  - |
| next | `function`   |  - |





**Returns:** `Promise`.<[ResourceResponse]()[]>





___

<a id="receive"></a>

###  receive

► **receive**(activity: *[Activity]()*): `Promise`.<`void`>



*Defined in [libraries/botbuilder/lib/bot.d.ts:102](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L102)*



Dispatches an incoming set of activities. This method can be used to dispatch an activity to the bot as if a user had sent it which is sometimes useful.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| activity | [Activity]()   |  The activity that was received. |





**Returns:** `Promise`.<`void`>
`{ handled: true }` if the activity was handled by a middleware plugin or one of the bots receivers.






___

<a id="receiveactivity"></a>

###  receiveActivity

► **receiveActivity**(context: *[BotContext](../interfaces/botbuilder.__global.botcontext.md)*, next: *`function`*): `Promise`.<`void`>



*Inherited from [MiddlewareSet](botbuilder.middlewareset.md).[receiveActivity](botbuilder.middlewareset.md#receiveactivity)*

*Defined in [libraries/botbuilder/lib/middlewareSet.d.ts:28](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/middlewareSet.d.ts#L28)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| context | [BotContext](../interfaces/botbuilder.__global.botcontext.md)   |  - |
| next | `function`   |  - |





**Returns:** `Promise`.<`void`>





___

<a id="use"></a>

###  use

► **use**(...middleware: *[Middleware](../interfaces/botbuilder.middleware.md)[]*): `this`



*Inherited from [MiddlewareSet](botbuilder.middlewareset.md).[use](botbuilder.middlewareset.md#use)*

*Defined in [libraries/botbuilder/lib/middlewareSet.d.ts:26](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/middlewareSet.d.ts#L26)*



Registers middleware plugin(s) with the bot or set.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| middleware | [Middleware](../interfaces/botbuilder.middleware.md)[]   |  One or more middleware plugin(s) to register. |





**Returns:** `this`





___

<a id="usetemplaterenderer"></a>

###  useTemplateRenderer

► **useTemplateRenderer**(templateRenderer: *[TemplateRenderer](../interfaces/botbuilder.templaterenderer.md)*): [Bot](botbuilder.bot.md)



*Defined in [libraries/botbuilder/lib/bot.d.ts:81](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L81)*



Register template renderer as middleware


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| templateRenderer | [TemplateRenderer](../interfaces/botbuilder.templaterenderer.md)   |  templateRenderer |





**Returns:** [Bot](botbuilder.bot.md)





___

<a id="usetemplates"></a>

###  useTemplates

► **useTemplates**(templates: *[TemplateDictionary](../#templatedictionary)*): [Bot](botbuilder.bot.md)



*Defined in [libraries/botbuilder/lib/bot.d.ts:86](https://github.com/Microsoft/botbuilder-js/blob/6102823/libraries/botbuilder/lib/bot.d.ts#L86)*



Register TemplateDictionary as templates


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| templates | [TemplateDictionary](../#templatedictionary)   |  templateDictionary to register |





**Returns:** [Bot](botbuilder.bot.md)





___


