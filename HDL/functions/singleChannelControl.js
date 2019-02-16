module.exports = {
    status: "To be tested",
    name: "Single Channel Control",
    description: "Controls a single channel",

    actions: {
        set: {
            request: 0x0031,
            answerBack: 0x0032,
            processData: function(data) {
                return {
                    "channelNo": data[0],
                    "sceneNumber": data[1],
                    "totalChannelNumber": data[2],
                    "channelStatusBit": channelBits
                }
            },
            generateData: function(data) {
                if (typeof data.channelNo != 'number'){ return "Invalid channel number: " + data.channelNo; }
                if (typeof data.channelLevel != 'number'){ return "Invalid channel level: " + data.channelLevel; }
                if (typeof data.runningTime != 'number'){ return "Invalid running time: " + data.runningTime; }
                var runningTime = Buffer.alloc(2);
                runningTime.writeUInt16BE(data.runningTime);
                return Buffer.from([data.channelNo, data.channelLevel, runningTime[0], runningTime[1]]);
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
                return Buffer.from([data.areaNumber]);
            }
        },

        broadcast: {
            request: 0xEFFFF,
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
