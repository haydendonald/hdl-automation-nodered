module.exports = {
    status: "Not Supported",
    name: "UV Switch",
    description: "Controls the status of the universal switches",

    actions: {
        set: {
            request: 0xE01C,
            answerBack: 0xE01D,
            processData: function(data) {
                return {
                    "switchNumber": data[0],
                    "state": data[1]
                }
            },
            generateData: function(data) {
                return {
                    "error": "Not Supported"
                }
            }
        },
    
        read: {
            request: 0xE018,
            answerBack: 0xE019,
            processData: function(data) {
                return {
                    "switchNumber": data[0],
                    "state": data[1]
                }
            },
            generateData: function(data) {
                return {
                    "error": "Not Supported"
                }
            }
        },
    
        broadcast: {
            request: 0xE017,
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