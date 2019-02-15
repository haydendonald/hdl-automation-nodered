module.exports = {
    status: "To be tested",
    name: "Scene Control",
    description: "Scene control selects a scene within a area",

    actions: {
        set: {
            request: 0x0002,
            answerBack: 0x0003,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "sceneNumber": data[1]
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){ return "Invalid area number: " + data.areaNumber; }
                if (typeof data.sceneNumber != 'number'){ return "Invalid scene number: " + data.sceneNumber; }
                return Buffer.from([data.areaNumber, data.sceneNumber]);
            }
        },
    
        read: {
            request: 0x000C,
            answerBack: 0x000D,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "sceneNumber": data[1]
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){ return "Invalid area number: " + data.areaNumber; }
                if (typeof data.sceneNumber != 'number'){ return "Invalid scene number: " + data.sceneNumber; }
                return Buffer.from([data.areaNumber, data.sceneNumber]);
            }
        },
    
        broadcast: {
            request: 0xEFFFF,
            answerBack: 0xFFFF,
            processData: function(data) {
                return {
                    "error": "Not Supported"
                }
            },
            generateData: function(data) {
                return "Not Supported"
            }
        }
    }
}