module.exports = {
    status: "Stable",
    name: "Dry Contact",
    description: "Dry contact from PIR sensor",

    actions: {
        set: {
            request: 0,
            answerBack: 0,
            processData: function(data) {
                return false;
            },
            generateData: function(data) {
                return "Not Supported";
            }
        },

        get: {
            request: 0x15CE,
            answerBack: 0x15CF,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "switchNumber": data[1],
                    "state": data[2] == 1
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255";}
                if (typeof data.switchNumber != 'number'){return "Invalid switch number: " + data.switchNumber + ". This is expected to be a number between 1 and 255";}
                if(data.areaNumber < 1 || data.areaNumber > 255){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255"}
                if(data.switchNumber < 1 || data.switchNumber > 255){return "Invalid switch number: " + data.switchNumber + ". This is expected to be a number between 1 and 255"}
                return Buffer.from([data.areaNumber, data.switchNumber]);
            }
        },

        broadcast: {
            request: 0x15D0,
            answerBack: 0x15D1,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "switchNumber": data[1],
                    "state": data[2] == 1
                }
            },
            generateData: function(data) {
                return "Not Supported"
            }
        }
    }
}
