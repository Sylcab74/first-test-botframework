

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
                                    "text": "Mission Name: " + data.mission_name,
                                    "weight": "bolder",
                                    "isTitle": true,
                                    "size": "large",
                                    "color": "light",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "spacing": "none",
                                    "text": "Date: " + "{{DATE(" + data.launch_date_local + ", SHORT)}}",
                                    "wrap": true,
                                    "color": "light",
                                    "size": "default"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": data.details,
                                    "color": "light",
                                    "weight": "bolder",
                                    "wrap": true,
                                    "size": "default",
                                    "horizontalAlignment": "center"
                                },
                            ]
                        }
                    ]
                }
            ],
            "actions": [
                {
                "type": "Action.ShowCard",
                "title": "Details",
                "color": "light",
                "card": {
                    "type": "AdaptiveCard",
                    "body": [
                    {
                        "type": "TextBlock",
                        "spacing": "none",
                        "text": "Site: " + data.launch_site.site_name_long,
                        "wrap": true,
                        "color": "light",
                        "size": "default"
                }
            ],
        }
    
    }
]  
        }
    }

    return latestCard
}