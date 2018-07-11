/**
 * @todo Create new card sample for single launch
 */

require('dotenv').config()
const restify = require('restify')
const builder = require('botbuilder')

var SpacexController = require('./controllers/spacexApi.controller')
var companyInfoCard = require('./cards-samples/company.card')
var latestCard = require('./cards-samples/latest.card') 

//Initialize restify server
let server = restify.createServer();
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`)
})

//Initialize chatBot Controller with botbuilder

let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

//Set Api Route
server.post('/api/messages', connector.listen())

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, 'greetings');
            }
        });
    }
});
//Initialize in memory storage to save info locally
let inMemoryStorage = new builder.MemoryBotStorage()

//declare menus Items
let menuItems = {
    "SpaceX Info": {
        item: 'getCompanyInfo'
    },
    "Display launches by year": {
        item: 'launchesByYear'
    },
    "latest (coming soon)": {
        item: 'Dialog3'
    }
}

var yearItems = {
    "2012": {
        item: '2012'
    },
    "2013": {
        item: '2013'
    },
    "2014": {
        item: '2014'
    },
    "2015": {
        item: '2015'
    },
    "2016": {
        item: '2016'
    },
    "2017": {
        item: '2017'
    },
    "2018": {
        item: '2018'
    }
}

//Declare bot with Default dialog

let bot = new builder.UniversalBot(connector, [

    (session, results) => {
        
        if(session.userData.profile != undefined || results != undefined){
            session.userData.profile ? session.userData.profile : results.response
            
            session.beginDialog('menu', session.userData.profile)
        }else {
            session.beginDialog('greetings')
        }
    },
]).set('storage', inMemoryStorage)

/**
 * New dialog to get User name
 * Saved directly in session.userData 
 * 
 * @todo prefer session.dialogData
 */

bot.dialog('greetings', [
    // Step 1
    (session, results, skip) => {
        session.userData.profile = results || {}
        if (!session.userData.profile.name) {
            builder.Prompts.text(session, `**What is your name ?**`)
        } else {
            skip();
        }
    },
    //step2
    (session, results) => {
        if (results.response) {
            session.userData.profile.name = results.response
            session.send(`Hey ${session.userData.profile.name}`)
        }
        session.endDialogWithResult({ response: session.userData.profile })
    }
])

// Dialog Menu, choose option

bot.dialog('menu', [
    (session) => {

        builder.Prompts.choice(session, `Hey ${session.userData.profile.name}, please choose an option bellow`, menuItems, { listStyle: 3 })
    },
    (session, results) => {
        let choice = results.response.entity
        let item = menuItems[choice].item

        session.beginDialog(item)
    }
])

// Dialog, show Company infos
bot.dialog('getCompanyInfo', [
    (session) => {
        SpacexController.getCompanyInfo()
            .then((result) => {
                console.log(companyInfoCard.getCard(result))
                let msg = new builder.Message(session)
                    .addAttachment(companyInfoCard.getCard(result))
                session.endDialog(msg)
            }, (err) => {
                session.send("Oups, an error occured, " + err)
            })  
    }
])

/**
 * Dialog ask Year to display and display all launches for this Year. 
 * 
 * @todo Enable details button to display particular launch
 * 
 */

bot.dialog('launchesByYear', [

    (session) => {
        builder.Prompts.choice(session, 'Select which Year you want to display', yearItems, { listStyle: 3 })
    },

    (session, results) => {
        console.log(results.response)

        SpacexController.getLaunchesByYears(results.response.entity ? results.response.entity : "2018")
            .then((result) => {

                let msg = new builder.Message(session);
                let cardsAttachment = [];
                result.reverse()
                result.forEach((flight, index) => {
                    let success;
                    let color;
                    if(flight.launch_success){
                        success = "Successful"
                        color = "#11b92f"
                    }else{
                        success = "Failed"
                        color = "#FF0000"
                    }
                    let flightHero = new builder.HeroCard(session)
                        .title(`Flight n°${flight.flight_number}<font color=\"${color}"\> ${success} </font>`)
                        .subtitle(flight.details)
                        .images([builder.CardImage.create(session, flight.links.mission_patch_small)])
                        .buttons([
                            builder.CardAction.openUrl(session, flight.links.article_link, "To the full article"),
                            builder.CardAction.imBack(session, `launch${flight.flight_number}`, "Details (coming soon)")
                        ])

                    cardsAttachment.push(flightHero)
                })
                msg.attachmentLayout(builder.AttachmentLayout.carousel)
                msg.attachments(cardsAttachment)
                session.send(msg)       
                session.endDialogWithResult({ response: session.userData.profile })
            })
            .catch((err) => {
                session.send(err)
                session.endDialog()
            })

    }
])

/**
 * @todo Implement this Dialog
 * @todo display latest launch
 */

bot.dialog('Dialog3', (session) => {
    let latest = SpacexController.getLastLaunch()
        .then((result) => {
            console.log(result)
            let msg = new builder.Message(session)
                .addAttachment(latestCard.getCard(result))
            session.endDialog(msg)
        })
})

