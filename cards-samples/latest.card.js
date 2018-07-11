

exports.getCard = (data) => {

    console.log("##########")
    console.log(data)
    console.log("##########")

    var latestCard = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "0.5",
            "backgroundImage": "https://pre00.deviantart.net/5b1d/th/pre/i/2013/141/1/6/mars_star_power__make_up_bg_by_nads6969-d661z6l.png",
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
                                    "url": data.links.mission_patch,
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
    }

    return latestCard
}