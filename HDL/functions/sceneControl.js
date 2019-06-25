module.exports = {
    status: "Stable",
    name: "Scene Control",
    description: "Scene control selects a scene within a area",

    actions: {
        set: {
            request: 0x0002,
            answerBack: 0x0003,
            processData: function(data) {
              var channelBits = {};
              for(var i = 1; i < data[2]; i++) {
                channelBits["channel" + i] = data[2 + i];
              }

                return {
                    "areaNumber": data[0],
                    "sceneNumber": data[1],
                    "totalChannelNumber": data[2],
                    "channelStatusBit": channelBits
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255";}
                if (typeof data.sceneNumber != 'number'){return "Invalid scene number: " + data.sceneNumber + ". This is expected to be a number between 0 and 255";}
                if(data.areaNumber < 1 || data.areaNumber > 255){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255";}
                if(data.sceneNumber < 0 || data.sceneNumber > 255){return "Invalid scene number: " + data.sceneNumber + ". This is expected to be a number between 0 and 255";}
                return Buffer.from([data.areaNumber, data.sceneNumber]);
            }
        },

        get: {
            request: 0x000C,
            answerBack: 0x000D,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "sceneNumber": data[1]
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255";}
                if(data.areaNumber < 1 || data.areaNumber > 255){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255"}
                return Buffer.from([data.areaNumber]);
            }
        },

        broadcast: {
            request: 0xEFFF,
            answerBack: 0xFFFF,
            processData: function(data) {
              var areaScenes = {};
              var channelLevels = {};

              //Get area scenes
              for(var i = 1; i < data[0]; i++) {
                areaScenes["area" + i] = data[i];
              }

              //Get channel channeLevels
              for(var i = 1; i < data[1 + data[0]]; i++) {
                channelLevels["channel" + i] = data[1 + data[0] + i];
              }

                return {
                    "totalAreaNumber": data[0],
                    "areaScenes": areaScenes,
                    "totalChannelNumber": data[1 + data[0]],
                    "channelLevels": channelLevels
                }
            },
            generateData: function(data) {
                return "Not Supported"
            }
        }
    }
}
