module.exports = {
    status: "Not Supported",
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
                return {
                    "error": "Not Supported"
                }
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
                return {
                    "error": "Not Supported"
                }
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
                return {
                    "error": "Not Supported"
                }
            }
        }
    }
}