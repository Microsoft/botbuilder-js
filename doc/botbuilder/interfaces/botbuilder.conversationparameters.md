[Bot Builder SDK - Core](../README.md) > [ConversationParameters](../interfaces/botbuilder.conversationparameters.md)



# Interface: ConversationParameters

*__interface__*: An interface representing ConversationParameters. Parameters for creating a new conversation



## Properties
<a id="activity"></a>

###  activity

**●  activity**:  *[Activity](botbuilder.activity.md)* 

*Defined in libraries/botbuilder/node_modules/botframework-schema/lib/index.d.ts:482*


*__member__*: {Activity} [activity] (Optional) When creating a new conversation, use this activity as the intial message to the conversation





___

<a id="bot"></a>

###  bot

**●  bot**:  *[ChannelAccount](botbuilder.channelaccount.md)* 

*Defined in libraries/botbuilder/node_modules/botframework-schema/lib/index.d.ts:468*


*__member__*: {ChannelAccount} [bot] The bot address for this conversation





___

<a id="channeldata"></a>

###  channelData

**●  channelData**:  *`any`* 

*Defined in libraries/botbuilder/node_modules/botframework-schema/lib/index.d.ts:487*


*__member__*: {any} [channelData] Channel specific payload for creating the conversation





___

<a id="isgroup"></a>

###  isGroup

**●  isGroup**:  *`boolean`* 

*Defined in libraries/botbuilder/node_modules/botframework-schema/lib/index.d.ts:464*


*__member__*: {boolean} [isGroup] IsGroup





___

<a id="members"></a>

### «Optional» members

**●  members**:  *[ChannelAccount](botbuilder.channelaccount.md)[]* 

*Defined in libraries/botbuilder/node_modules/botframework-schema/lib/index.d.ts:472*


*__member__*: {ChannelAccount[]} [members] Members to add to the conversation





___

<a id="topicname"></a>

### «Optional» topicName

**●  topicName**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder/node_modules/botframework-schema/lib/index.d.ts:477*


*__member__*: {string} [topicName] (Optional) Topic of the conversation (if supported by the channel)





___


