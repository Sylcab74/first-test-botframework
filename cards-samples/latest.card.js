

exports.getCard = (data) => {

    var latestCard = {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "0.5",
        "backgroundImage": "https://download-ssl.msgamestudios.com/content/mgs/ce/production/SolitaireWin10/dev/adapative_card_assets/v1/card_background.png",
        "body": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": 1,
                        "items": [
                            {
                                "type": "Image",
                                "url": "https://download-ssl.msgamestudios.com/content/mgs/ce/production/SolitaireWin10/dev/adapative_card_assets/v1/tile_spider.png",
                                "size": "stretch"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": 1,
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Click here to play another game of Spider in Microsoft Solitaire Collection!",
                                "color": "light",
                                "weight": "bolder",
                                "wrap": true,
                                "size": "default",
                                "horizontalAlignment": "center"
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return latestCard
}