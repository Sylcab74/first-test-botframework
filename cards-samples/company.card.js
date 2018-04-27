//create sample card for companyin new file for better lisibility

exports.getCard = (data) => {
    

    var companyCard =
        {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data.name,
                                "weight": "bolder",
                                "size": "Large"
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "url": "https://www.stuffi.fr/wp-content/uploads/2016/09/spacex.png",
                                                "size": "large"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Founder: " + data.founder,
                                                "weight": "bolder",
                                                "wrap": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "spacing": "none",
                                                "text": "Founded " + data.founded,
                                                "isSubtle": true,
                                                "wrap": true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data.summary,
                                "wrap": true
                            },
                            {
                                "type": "FactSet",
                                "facts": [
                                    {
                                        "title": "CEO:",
                                        "value": data.ceo
                                    },
                                    {
                                        "title": "CTO:",
                                        "value": data.cto
                                    },
                                    {
                                        "title": "Valuation:",
                                        "value": data.valuation.toString()
                                    },
                                    {
                                        "title": "Adress:",
                                        "value": data.headquarters.address
                                    },
                                    {
                                        "title": "City:",
                                        "value": data.headquarters.city
                                    },
                                    {
                                        "title": "State:",
                                        "value": data.headquarters.state
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "actions": [
                    {
                      "type": "Action.OpenUrl",
                      "title": "Twitter",
                      "url": "https://twitter.com/spacex"
                    }
                ]
            }
        }

    return companyCard
}