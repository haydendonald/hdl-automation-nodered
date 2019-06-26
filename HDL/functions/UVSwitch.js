module.exports = {
    status: "Testing",
    name: "UV Switch",
    description: "Controls the status of the universal switches",

    actions: {
        set: {
            request: 0xE01C,
            answerBack: 0xE01D,
            processData: function(data) {
              // var state = "unknown";
              // if(data[1] == 0x01){state = "on";}else{state = "off";}


              return {
                    "switchNumber": data[0],
                    "state": data[1]
                }
            },
            generateData: function(data) {
              var switchState = 0;
              if (typeof data.switchNumber != 'number'){ return "Invalid switch number: " + data.switchNumber + ". Expected a number from 1 to 255"; }
              if (data.switchNumber < 1 || data.switchNumber > 255){return "Invalid switch number: " + data.switchNumber + ". This is expected to be a number between 1 and 255";}
              if (typeof data.switchState != 'number'){ return "Invalid switch state: " + data.switchState + ". Expected a number from 0 or 1"; }
              if(data.switchState == 1){data.switchState = 255;}

              // switch(data.switchState.toLowerCase()) {
              //   case "on": {switchState = 0x01; break;}
              //   case "off": {switchState = 0x00; break;}
              //   default: {return "Invalid switch state: " + data.switchState + ". Expected 'on' or 'off'";}
              // }

              return Buffer.from([data.switchNumber, data.switchState]);
            }
        },

        get: {
            request: 0xE018,
            answerBack: 0xE019,
            processData: function(data) {
              // var state = "unknown";
              // if(data[1] == 0x01){state = "on";}else{state = "off";}

              return {
                    "switchNumber": data[0],
                    "state": data[1]
                }
            },
            generateData: function(data) {
              if (typeof data.switchNumber != 'number'){ return "Invalid switch number: " + data.switchNumber + ". Expected a number from 1 to 255"; }
              if (data.switchNumber < 1 || data.switchNumber > 255){return "Invalid switch number: " + data.switchNumber + ". This is expected to be a number between 1 and 255";}
              return Buffer.from([data.switchNumber]);
            }
        },

        broadcast: {
            request: 0xE017,
            answerBack: 0xFFFF,
            processData: function(data) {
              var ret = {
                "totalUVSwitches": data[0],
                "UVSwitches": undefined
              };

              for(var i = 1; i <= data[0]; i++) {
                if(data[i] == 1) {
                  ret.UVSwitches[i] = "on";
                }
                else if(data[i] == 0) {
                  ret.UVSwitches[i] = "off";
                }
                else {
                  ret.UVSwitches[i] = data[i];
                }
              }

              return ret;
            },
            generateData: function(data) {
                return {
                    "error": "Not Supported"
                }
            }
        }
    }
}
