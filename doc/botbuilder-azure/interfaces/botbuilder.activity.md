[Bot Builder SDK - Azure](../README.md) > [botbuilder](../modules/botbuilder.md) > [Activity](../interfaces/botbuilder.activity.md)



# Interface: Activity


An Activity is the basic communication type for the Bot Framework 3.0 protocol.


## Properties
<a id="action"></a>

### «Optional» action

**●  action**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:181*



ContactAdded/Removed action.




___

<a id="attachmentlayout"></a>

### «Optional» attachmentLayout

**●  attachmentLayout**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:151*



Hint for how to deal with multiple attachments. The default value is `AttachmentLayouts.list`




___

<a id="attachments"></a>

### «Optional» attachments

**●  attachments**:  *[Attachment](botbuilder.attachment.md)[]* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:173*



Attachments.




___

<a id="channeldata"></a>

### «Optional» channelData

**●  channelData**:  *`any`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:179*



Channel-specific payload.




___

<a id="channelid"></a>

### «Optional» channelId

**●  channelId**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:141*



ID of the channel where the activity was sent.




___

<a id="code"></a>

### «Optional» code

**●  code**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:191*



Code indicating why the conversation has ended.




___

<a id="conversation"></a>

### «Optional» conversation

**●  conversation**:  *[ConversationAccount](botbuilder.conversationaccount.md)* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:145*



Conversation.




___

<a id="entities"></a>

### «Optional» entities

**●  entities**:  *[Entity](botbuilder.entity.md)[]* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:177*



Collection of Entity objects, each of which contains metadata about this activity. Each Entity object is typed.




___

<a id="from"></a>

### «Optional» from

**●  from**:  *[ChannelAccount](botbuilder.channelaccount.md)* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:143*



Sender address.




___

<a id="historydisclosed"></a>

### «Optional» historyDisclosed

**●  historyDisclosed**:  *`undefined`⎮`true`⎮`false`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:159*



True if the previous history of the channel is disclosed.




___

<a id="id"></a>

### «Optional» id

**●  id**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:133*



ID of this activity.




___

<a id="inputhint"></a>

### «Optional» inputHint

**●  inputHint**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:167*



Indicates whether the bot is accepting, expecting, or ignoring input.




___

<a id="localtimestamp"></a>

### «Optional» localTimestamp

**●  localTimestamp**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:137*



Local time when message was sent (set by client, Ex: 2016-09-23T13:07:49.4714686-07:00).




___

<a id="locale"></a>

### «Optional» locale

**●  locale**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:161*



The language code of the Text field.




___

<a id="membersadded"></a>

### «Optional» membersAdded

**●  membersAdded**:  *[ChannelAccount](botbuilder.channelaccount.md)[]* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:153*



Array of address added.




___

<a id="membersremoved"></a>

### «Optional» membersRemoved

**●  membersRemoved**:  *[ChannelAccount](botbuilder.channelaccount.md)[]* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:155*



Array of addresses removed.




___

<a id="name"></a>

### «Optional» name

**●  name**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:187*



Name of the operation to invoke or the name of the event.




___

<a id="reactionsadded"></a>

### «Optional» reactionsAdded

**●  reactionsAdded**:  *[MessageReaction](botbuilder.messagereaction.md)[]* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:193*



Array of reactions added to an activity.




___

<a id="reactionsremoved"></a>

### «Optional» reactionsRemoved

**●  reactionsRemoved**:  *[MessageReaction](botbuilder.messagereaction.md)[]* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:195*



Array of reactions removed from an activity.




___

<a id="recipient"></a>

### «Optional» recipient

**●  recipient**:  *[ChannelAccount](botbuilder.channelaccount.md)* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:147*



(Outbound to bot only) Bot's address that received the message.




___

<a id="relatesto"></a>

### «Optional» relatesTo

**●  relatesTo**:  *[ConversationReference](botbuilder.conversationreference.md)* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:189*



Reference to another conversation or activity.




___

<a id="replytoid"></a>

### «Optional» replyToId

**●  replyToId**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:183*



The original ID this message is a response to.




___

<a id="serviceurl"></a>

### «Optional» serviceUrl

**●  serviceUrl**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:139*



Service endpoint where operations concerning the activity may be performed.




___

<a id="speak"></a>

### «Optional» speak

**●  speak**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:165*



SSML Speak for TTS audio response.




___

<a id="suggestedactions"></a>

### «Optional» suggestedActions

**●  suggestedActions**:  *[SuggestedActions](botbuilder.suggestedactions.md)* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:171*



SuggestedActions are used to provide keyboard/quickreply like behavior in many clients.




___

<a id="summary"></a>

### «Optional» summary

**●  summary**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:169*



Text to display if the channel cannot render cards.




___

<a id="text"></a>

### «Optional» text

**●  text**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:163*



Content for the message.




___

<a id="textformat"></a>

### «Optional» textFormat

**●  textFormat**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:149*



Format of text fields. The default value is `TextFormats.markdown`.




___

<a id="timestamp"></a>

### «Optional» timestamp

**●  timestamp**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:135*



UTC Time when message was sent (set by service).




___

<a id="topicname"></a>

### «Optional» topicName

**●  topicName**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:157*



Conversations new topic name.




___

<a id="type"></a>

### «Optional» type

**●  type**:  *`undefined`⎮`string`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:131*



The type of the activity.




___

<a id="value"></a>

### «Optional» value

**●  value**:  *`any`* 

*Defined in libraries/botbuilder-azure/node_modules/botbuilder/lib/index.d.ts:185*



Open-ended value.




___


