
exports.getCard = (flights) => {

    var testCard = {
        "type": "message",
        "text": "Here are all launches of the selected year",
        "attachmentLayout": "carousel",
        "attachments": getAll(flights)
    }

    return testCard

}

getAll = (flights) => {
    console.log(flights)
    let attachments = []
    flights.forEach(flight => {
        attachments.push(getAdaptative(flight))
    });

    return attachments
}

getAdaptative = (flight) => {
    let adaptive =
        {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "size": "auto",
                                "items": [
                                    {
                                        "type": "Image",
                                        "size": "large",
                                        "url": flight.links.mission_patch,
                                        "horizontalAlignment": "center",
                                        "selectAction": {
                                            "type": "Action.OpenUrl",
                                            "title": "Web link",
                                            "url": flight.links.article_link
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "TextBlock",
                        "text": flight.launch_success ? "success" : "failed",
                        "weight": "bolder",
                        "color": flight.launch_success ? "good" : "warning"
                    },
                    {
                        "type": "TextBlock",
                        "text": flight.details,
                        "separation": "true",
                        "wrap": "false"
                    }
                ],
                "actions": [
                    {
                        "type": "Action.ShowCard",
                        "title": "Details",
                        "card": {
                            "type": "AdaptiveCard",
                            "body": [
                                {
                                    "type": "FactSet",
                                    "facts": [
                                        {
                                            "title": "Mission :",
                                            "value":  flight.mission_name
                                        },
                                        {
                                            "title": "Site :",
                                            "value": flight.launch_site.site_name_long
                                        },
                                        
                                    ]
                                }
                            ],
                        }

                    }
                ]
            }
        }

    return adaptive
}