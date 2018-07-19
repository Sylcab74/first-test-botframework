
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
                                "url": flight.links.mission_patch
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
                "text": "510 N Yale Ave.",
                "separation": "none"
            },
            {
                "type": "TextBlock",
                "text": "Seattle, WA 98127",
                "separation": "none"
            }
        ]
    }
}

return adaptive
}