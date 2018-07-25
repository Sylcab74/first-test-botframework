exports.getCard = (error) => {
    var errorCard = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [

                {
                    "type": "Image",
                    "size": "small",
                    "url": "https://png.icons8.com/metro/1600/error.png",
                    "horizontalAlignment": "center"
                },
                {
                    "type": "TextBlock",
                    "text": error.message,
                    "horizontalAlignment": "center",
                    "color": "warning"
                }
            ],
        }
    }

    return errorCard
}