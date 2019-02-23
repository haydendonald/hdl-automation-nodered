module.exports = {
    status: "Testing",
    name: "Single Channel Control",
    description: "Controls a single channel",

    actions: {
        set: {
            request: 0x0031,
            answerBack: 0x0032,
            processData: function(data) {
              var ret = {
                "channelNumber": data[0],
                "success": data[1] == 0x00F8,
                "channelLevel": data[2],
                "totalChannelNumber": data[3],
                "channels": undefined
              }

              //Find the channel status'
              var k = 1;
              //Loop though each chunk of 8 data bits. (16 channels would be 2 loops)
              for(var i = 0; i < data[3] % 8; i++) {
                //Convert each hex data bit to the 8 bit binary representation
                var binary = (parseInt(data[4 + i], 16).toString(2)).padStart(8, '0');
                for(var j = i * 8; j < 8; j++) {
                  //Each bit within the binary representation is the on state of a channel
                  var state = (binary[i] == "1");
                  if(binary[i] == "1") {
                    ret.channels[k++] = "on";
                  }
                  else {
                    ret.channels[k++] = "off";
                  }
                }
              }
              return ret;
            },
            generateData: function(data) {
                if (typeof data.channelNumber != 'number'){ return "Invalid channel number: " + data.channelNumber; }
                if (typeof data.channelLevel != 'number'){ return "Invalid channel level: " + data.channelLevel; }
                if (typeof data.runningTime != 'number'){ return "Invalid running time: " + data.runningTime; }
                if(data.channelNumber < 1 || data.channelNumber > 255){return "Invalid channel number: " + data.channelNumber + ". This is expected to be a number between 1 and 255";}
                if(data.channelLevel < 0 || data.channelNumber > 100){return "Invalid channel level: " + data.channelLevel + ". This is expected to be a number between 0 and 100";}
                if(data.runningTime < 0 || data.runningTime > 3600){return "Invalid running time: " + data.runningTime + ". This is expected to be a number between 0 and 3600(s)";}

                var runningTime = Buffer.alloc(2);
                runningTime.writeUInt16BE(data.runningTime);
                return Buffer.from([data.channelNumber, data.channelLevel, runningTime[0], runningTime[1]]);
            }
        },

        read: {
            request: 0x0033,
            answerBack: 0x0034,
            processData: function(data) {
              var ret = {
                "totalChannelNumber": data[0],
                "channels": undefined
              }

              //Get the channel values
              for(var i = 0; i < data[0]; i++) {
                ret.channels[i + 1] = data[i + 1];
              }

              return ret;
            },
            generateData: function(data) {
              //There is no parameters
              return Buffer.from([]);
            }
        },

        //In the HDL doc the read command is repeated for some reason so i'll just repeat it in the broadcast
        broadcast: {
            request: 0x0038,
            answerBack: 0x0039,
            processData: function(data) {
              var ret = {
                "totalChannelNumber": data[0],
                "channels": undefined
              }

              //Get the channel values
              for(var i = 0; i < data[0]; i++) {
                ret.channels[i + 1] = data[i + 1];
              }

              return ret;
            },
            generateData: function(data) {
              //There is no parameters
              return Buffer.from([]);
            }
        }
    }
}
