module.exports = {
    status: "Testing",
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
                if(data.areaNumber < 1 || data.areaNumber > 255){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255"}
                if(data.sequenceNumber < 0 || data.sequenceNumber > 255){return "Invalid sequence number: " + data.sequenceNumber + ". This is expected to be a number between 0 and 255"}

                return Buffer.from([data.areaNumber, data.sequenceNumber]);
            }
        },

        get: {
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
                if(data.areaNumber < 1 || data.areaNumber > 255){return "Invalid area number: " + data.areaNumber + ". This is expected to be a number between 1 and 255"}
                return Buffer.from([data.areaNumber]);
            }
        },

        broadcast: {
            request: 0xF036,
            answerBack: 0xFFFF,
            processData: function(data) {
              var areaSequences = {
                "sequenceInArea": undefined
              };

              //Get area scenes
              for(var i = 0; true; i++) {
                if(data[i] === null || data[i] === undefined){break;}
                areaSequences.sequenceInArea[(i + 1)] = data[i];
              }

                return areaSequences
            },
            generateData: function(data) {
                return "Not Supported"
            }
        }
    }
}
