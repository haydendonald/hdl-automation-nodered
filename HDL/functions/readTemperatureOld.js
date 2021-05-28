module.exports = {
    status: "Development",
    name: "Read Temperature Old",
    description: "Read the temperature",

    actions: {
        set: {
            request: 0xFFFF,
            answerBack: 0xFFFF,
            processData: function(data) {return null;},
            generateData: function(data) {return null;}
        },

        get: {
            request: 0xE3E7,
            answerBack: 0xE3E8,
            processData: function(data) {
                return {
                    "channel": data[0],
                    "temperature": data[1].readInt8(1)
                }
            },
            generateData: function(data) {
                if(data.channel === undefined) {
                    return "A channel is required";
                }
                return Buffer.from([parseInt(data.channel)]);
            }
        },

        broadcast: {
            request: 0xFFFF,
            answerBack: 0xE3E5,
            processData: function(data) {
                var temps = [];
                for(var i = 0; i < data[0]; i++){temps[i] = data[i + 1];}
                return {
                    "channels": data[0],
                    "temperatures": temps
                }
            },
            generateData: function(data) {
                return null;
            }
        }
    }
}
