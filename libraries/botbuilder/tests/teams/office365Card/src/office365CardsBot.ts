// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
    Activity,
    Attachment,
    CardFactory,
    MessageFactory,
    O365ConnectorCardActionQuery,
    TeamsActivityHandler,
    TurnContext
} from 'botbuilder';

//
// You can install this bot in any scope. From the UI just @mention the bot.
//
export class Office365CardsBot extends TeamsActivityHandler {
    constructor() {
        super();

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            await this.sendO365CardAttachment(context);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    protected async onTeamsO365ConnectorCardAction(context: TurnContext, query: O365ConnectorCardActionQuery): Promise<void> {
        await context.sendActivity(MessageFactory.text(`O365ConnectorCardActionQuery event value: ${JSON.stringify(query)}`));
    }

    private async sendO365CardAttachment(context: TurnContext): Promise<void> {
        const card = CardFactory.o365ConnectorCard({
            "title": "card title",
            "text": "card text",
            "summary": "O365 card summary",
            "themeColor": "#E67A9E",
            "sections": [
                {
                "title": "**section title**",
                "text": "section text",
                "activityTitle": "activity title",
                "activitySubtitle": "activity subtitle",
                "activityText": "activity text",
                "activityImage": "http://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg",
                "activityImageType": "avatar",
                "markdown": true,
                "facts": [
                    {
                    "name": "Fact name 1",
                    "value": "Fact value 1"
                    },
                    {
                    "name": "Fact name 2",
                    "value": "Fact value 2"
                    }
                ],
                "images": [
                    {
                    "image": "http://connectorsdemo.azurewebsites.net/images/MicrosoftSurface_024_Cafe_OH-06315_VS_R1c.jpg",
                    "title": "image 1"
                    },
                    {
                    "image": "http://connectorsdemo.azurewebsites.net/images/WIN12_Scene_01.jpg",
                    "title": "image 2"
                    },
                    {
                    "image": "http://connectorsdemo.azurewebsites.net/images/WIN12_Anthony_02.jpg",
                    "title": "image 3"
                    }
                ],
                "potentialAction": null
                }
            ],
            "potentialAction": [
                {
                "@type": "ActionCard",
                "inputs": [
                    {
                    "@type": "MultichoiceInput",
                    "choices": [
                        {
                        "display": "Choice 1",
                        "value": "1"
                        },
                        {
                        "display": "Choice 2",
                        "value": "2"
                        },
                        {
                        "display": "Choice 3",
                        "value": "3"
                        }
                    ],
                    "style": "expanded",
                    "isMultiSelect": true,
                    "id": "list-1",
                    "isRequired": true,
                    "title": "Pick multiple options",
                    "value": null
                    },
                    {
                    "@type": "MultichoiceInput",
                    "choices": [
                        {
                        "display": "Choice 4",
                        "value": "4"
                        },
                        {
                        "display": "Choice 5",
                        "value": "5"
                        },
                        {
                        "display": "Choice 6",
                        "value": "6"
                        }
                    ],
                    "style": "compact",
                    "isMultiSelect": true,
                    "id": "list-2",
                    "isRequired": true,
                    "title": "Pick multiple options",
                    "value": null
                    },
                    {
                    "@type": "MultichoiceInput",
                    "choices": [
                        {
                        "display": "Choice a",
                        "value": "a"
                        },
                        {
                        "display": "Choice b",
                        "value": "b"
                        },
                        {
                        "display": "Choice c",
                        "value": "c"
                        }
                    ],
                    "style": "expanded",
                    "isMultiSelect": false,
                    "id": "list-3",
                    "isRequired": false,
                    "title": "Pick an option",
                    "value": null
                    },
                    {
                    "@type": "MultichoiceInput",
                    "choices": [
                        {
                        "display": "Choice x",
                        "value": "x"
                        },
                        {
                        "display": "Choice y",
                        "value": "y"
                        },
                        {
                        "display": "Choice z",
                        "value": "z"
                        }
                    ],
                    "style": "compact",
                    "isMultiSelect": false,
                    "id": "list-4",
                    "isRequired": false,
                    "title": "Pick an option",
                    "value": null
                    }
                ],
                "actions": [
                    {
                    "@type": "HttpPOST",
                    "body": "{\"text1\":\"{{text-1.value}}\", \"text2\":\"{{text-2.value}}\", \"text3\":\"{{text-3.value}}\", \"text4\":\"{{text-4.value}}\"}",
                    "name": "Send",
                    "@id": "card-1-btn-1"
                    }
                ],
                "name": "Multiple Choice",
                "@id": "card-1"
                },
                {
                "@type": "ActionCard",
                "inputs": [
                    {
                    "@type": "TextInput",
                    "isMultiline": true,
                    "maxLength": null,
                    "id": "text-1",
                    "isRequired": false,
                    "title": "multiline, no maxLength",
                    "value": null
                    },
                    {
                    "@type": "TextInput",
                    "isMultiline": false,
                    "maxLength": null,
                    "id": "text-2",
                    "isRequired": false,
                    "title": "single line, no maxLength",
                    "value": null
                    },
                    {
                    "@type": "TextInput",
                    "isMultiline": true,
                    "maxLength": 10.0,
                    "id": "text-3",
                    "isRequired": true,
                    "title": "multiline, max len = 10, isRequired",
                    "value": null
                    },
                    {
                    "@type": "TextInput",
                    "isMultiline": false,
                    "maxLength": 10.0,
                    "id": "text-4",
                    "isRequired": true,
                    "title": "single line, max len = 10, isRequired",
                    "value": null
                    }
                ],
                "actions": [
                    {
                    "@type": "HttpPOST",
                    "body": "{\"text1\":\"{{text-1.value}}\", \"text2\":\"{{text-2.value}}\", \"text3\":\"{{text-3.value}}\", \"text4\":\"{{text-4.value}}\"}",
                    "name": "Send",
                    "@id": "card-2-btn-1"
                    }
                ],
                "name": "Text Input",
                "@id": "card-2"
                },
                {
                "@type": "ActionCard",
                "inputs": [
                    {
                    "@type": "DateInput",
                    "includeTime": true,
                    "id": "date-1",
                    "isRequired": true,
                    "title": "date with time",
                    "value": null
                    },
                    {
                    "@type": "DateInput",
                    "includeTime": false,
                    "id": "date-2",
                    "isRequired": false,
                    "title": "date only",
                    "value": null
                    }
                ],
                "actions": [
                    {
                    "@type": "HttpPOST",
                    "body": "{\"date1\":\"{{date-1.value}}\", \"date2\":\"{{date-2.value}}\"}",
                    "name": "Send",
                    "@id": "card-3-btn-1"
                    }
                ],
                "name": "Date Input",
                "@id": "card-3"
                },
                {
                "@type": "ViewAction",
                "target": [ "http://microsoft.com" ],
                "name": "View Action",
                "@id": null
                },
                {
                "@type": "OpenUri",
                "targets": [
                    {
                    "os": "default",
                    "uri": "http://microsoft.com"
                    },
                    {
                    "os": "iOS",
                    "uri": "http://microsoft.com"
                    },
                    {
                    "os": "android",
                    "uri": "http://microsoft.com"
                    },
                    {
                    "os": "windows",
                    "uri": "http://microsoft.com"
                    }
                ],
                "name": "Open Uri",
                "@id": "open-uri"
                }
            ]
        });
        console.log(JSON.stringify(card));
        await context.sendActivity(MessageFactory.attachment(card));
    }
}
