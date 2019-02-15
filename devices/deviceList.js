/*
    The currently supported devices linked to their relevent source
*/

var deviceList = {
    list: {
        65534: {
            "status": "Not Supported",
            "name": "PC",
            "description": "PC",
            "functions": {
                sceneControl: require("./functions/sceneControl.js"),
                UVSwitch: require("./functions/UVSwitch.js"),
                dateTime: require("./functions/dateTime.js")
            }
        }
    }
}