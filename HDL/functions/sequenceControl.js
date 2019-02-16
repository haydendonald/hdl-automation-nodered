module.exports = {
    status: "To be tested",
    name: "Sequence Control",
    description: "Control sequences",
    actions: {
        set: {
            request: 0x001A,
            answerBack: 0x001B,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "sequenceNumber": data[1]
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){ return "Invalid area number: " + data.areaNumber; }
                if (typeof data.sequenceNumber != 'number'){ return "Invalid sequence number: " + data.sequence; }
                return Buffer.from([data.areaNumber, data.sequence]);
            }
        },

        read: {
            request: 0xE014,
            answerBack: 0xE015,
            processData: function(data) {
                return {
                    "areaNumber": data[0],
                    "sequenceNumber": data[1]
                }
            },
            generateData: function(data) {
                if (typeof data.areaNumber != 'number'){ return "Invalid area number: " + data.areaNumber; }
                return Buffer.from([data.areaNumber]);
            }
        },

        broadcast: {
            request: 0xF036,
            answerBack: 0xFFFF,
            processData: function(data) {
              var areaSequences = {};

              //Get area scenes
              for(var i = 0; true; i++) {
                if(data[i] === null || data[i] === undefined){break;}
                areaScenes["area" + (i + 1)] = data[i];
              }

                return areaSequences
            },
            generateData: function(data) {
                return "Not Supported"
            }
        }
    }
}
