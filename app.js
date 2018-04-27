require('dotenv').config()
const restify = require('restify')
const builder = require('botbuilder')

const AdaptiveCards = require('adaptivecards')
var adaptiveCard = new AdaptiveCards.AdaptiveCard()

const SpaceXAPI = require('SpaceX-API-Wrapper')

var SpacexController = require('./controllers/spacexApi.controller')

let server = restify.createServer();
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`)
})

let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

server.post('/api/messages', connector.listen())

let inMemoryStorage = new builder.MemoryBotStorage()

let bot = new builder.UniversalBot(connector, [

    (session) => {
        session.send(`Hey Bro`)
        session.beginDialog('menu', session.userData.profile)
    },

    /*(session, results) => {
        if(!session.userData.profile){
            session.userData.profile = results.response 
        }

        session.send(`How are you ${session.userData.profile.name}`)
    }*/

]).set('storage', inMemoryStorage)

bot.dialog('greetings', [
    // Step 1
    function (session, results, skip) {
        session.dialogData.profile = results || {}
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, `**What is your name ?**`)
        } else {
            skip();
        }
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.profile.name = results.response
        }
        session.endDialogWithResult({ response: session.dialogData.profile })
    }
])

var menuItems = {
    "latest launch": {
        item: 'getLatest'
    },
    "titi": {
        item: 'Dialog2'
    },
    "tutu": {
        item: 'Dialog3'
    }

}

bot.dialog('menu', [
    (session) => {
        //builder.Prompts.choice(session, 'select an option', ['option1', 'option2', 'option3'], { listStyle : 3 })
        builder.Prompts.choice(session, 'select an option', menuItems, { listStyle: 3 })
    },
    (session, results) => {
        let choice = results.response.entity
        let item = menuItems[choice].item

        session.beginDialog(item)
    }
])

bot.dialog('getLatest', [
    (session) => {
        SpacexController.getLastLaunch()
            .then((result) => {
                console.log(result.details)

                var card = {
                    'contentType': 'application/vnd.microsoft.card.adaptive',
                    'content': {
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "version": "1.0",
                        "type": "AdaptiveCard",
                        "lang": "en",
                        "speak": "<s>Your flight is confirmed for you and 3 other passengers from San Francisco to Amsterdam on {{DATE(2017-10-10T08:30:00Z, LONG)}} {{TIME(2017-10-10T08:30:00Z)}}</s>",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": "Passengers",
                                "weight": "bolder",
                                "isSubtle": false
                            },
                            {
                                "type": "TextBlock",
                                "text": "Sarah Hum",
                                "separator": true
                            },
                            {
                                "type": "TextBlock",
                                "text": "Jeremy Goldberg",
                                "spacing": "none"
                            },
                            {
                                "type": "TextBlock",
                                "text": "Evan Litvak",
                                "spacing": "none"
                            },
                            {
                                "type": "TextBlock",
                                "text": "2 Stops",
                                "weight": "bolder",
                                "spacing": "medium"
                            },
                            {
                                "type": "TextBlock",
                                "text": "{{TIME(2017-10-10T08:30:00Z)}}",
                                "weight": "bolder",
                                "spacing": "none"
                            },
                            {
                                "type": "ColumnSet",
                                "separator": true,
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": 1,
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "San Francisco",
                                                "isSubtle": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "size": "extraLarge",
                                                "color": "accent",
                                                "text": "SFO",
                                                "spacing": "none"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "&nbsp;"
                                            },
                                            {
                                                "type": "Image",
                                                "url": "http://messagecardplayground.azurewebsites.net/assets/airplane.png",
                                                "size": "small",
                                                "spacing": "none"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": 1,
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "horizontalAlignment": "right",
                                                "text": "Amsterdam",
                                                "isSubtle": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "horizontalAlignment": "right",
                                                "size": "extraLarge",
                                                "color": "accent",
                                                "text": "AMS",
                                                "spacing": "none"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Non-Stop",
                                "weight": "bolder",
                                "spacing": "medium"
                            },
                            {
                                "type": "TextBlock",
                                "text": "{{TIME(2017-10-18T21:50:00Z)}}",
                                "weight": "bolder",
                                "spacing": "none"
                            },
                            {
                                "type": "ColumnSet",
                                "separator": true,
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": 1,
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Amsterdam",
                                                "isSubtle": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "size": "extraLarge",
                                                "color": "accent",
                                                "text": "AMS",
                                                "spacing": "none"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "&nbsp;"
                                            },
                                            {
                                                "type": "Image",
                                                "url": "http://messagecardplayground.azurewebsites.net/assets/airplane.png",
                                                "size": "small",
                                                "spacing": "none"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": 1,
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "horizontalAlignment": "right",
                                                "text": "San Francisco",
                                                "isSubtle": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "horizontalAlignment": "right",
                                                "size": "extraLarge",
                                                "color": "accent",
                                                "text": "SFO",
                                                "spacing": "none"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "spacing": "medium",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "1",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Total",
                                                "size": "medium",
                                                "isSubtle": true
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": 1,
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "horizontalAlignment": "right",
                                                "text": "$4,032.54",
                                                "size": "medium",
                                                "weight": "bolder"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                };

                var msg = new builder.Message(session).addAttachment(card)
                session.send(msg)
            }, (err) => {
                session.send("Oups, an error occured, " + err)
            })
    }
])

bot.dialog('Dialog2', (session) => {
    
    SpacexController.getAllLaunches()
        .then((result) => {
            
            let msg = new builder.Message(session);
            let cardsAttachment = [];
            result.reverse()
            result.forEach((flight, index) => {
                    console.log(flight)
                    var test = new builder.HeroCard(session)
                    .title(JSON.stringify(flight.flight_number))
                    .subtitle(flight.details)
                    .images([builder.CardImage.create(session, flight.links.mission_patch_small)])
                    .buttons([builder.CardAction.openUrl(session, flight.links.article_link, "To the full article")]) 

                    cardsAttachment.push(test)
            })
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments(cardsAttachment)
            session.send(msg)
            
        })
        .catch((err) => {
            session.send(err)
        })
    
})
bot.dialog('Dialog3', (session) => session.endDialog("You are in the third dialog"))

