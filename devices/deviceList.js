/*
    The currently supported devices linked to their relevent source
*/

module.exports = {
    65534: {
        "status": "Not Supported",
        "name": "PC",
        "description": "PC",
        "functions": {
            sceneControl: require("./functions/sceneControl.js")
        }
    }
}