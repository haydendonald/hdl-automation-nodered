module.exports = {
    status: "Not done",
    name: "Panel Control",
    description: "Panel control controls a wall panel",

    actions: {
        set: {
            request: 0xE3D8,
            answerBack: 0xE3D9,
            processData: function(data) {
              return {
                "panelFunction": data[0],
                "panelData": data[1]
              }
            },
            generateData: function(data) {
                 if (typeof data.panelFunction != 'string'){ return "Invalid panel function: " + data.panelFunction; }
                 if (typeof data.panelData != 'string'){ return "Invalid panel data: " + data.panelData; }

                 var panelFunction = 0;
                 var panelData = 0;
                 switch(data.panelFunction) {
                   case "invalid": {
                     panelFunction = 0;
                     switch(data.panelData) {
                       "on": {panelData = 1; break;}
                       "off": {panelData = 0; break;}
                     }
                     break;
                   }
                   case "IRControl": {
                     panelFunction = 1;
                     switch(data.panelData) {
                       "on": {panelData = 1; break;}
                       "off": {panelData = 0; break;}
                     }
                     break;
                   }
                   case "LockPanel": {panelFunction = 2; break;}
                   case "ACPower": {panelFunction = 3; break;}
                   case "CoolingTemp": {panelFunction = 4; break;}
                   case "FanSpeed": {panelFunction = 5; break;}
                   case "ACMode": {panelFunction = 6; break;}
                   case "HeatTemp": {panelFunction = 7; break;}
                   case "AutoTemp": {panelFunction = 8; break;}
                   case "RiseTemp": {panelFunction = 9; break;}
                   case "DecreaseTemp": {panelFunction = 10; break;}
                   case "BacklightStatus": {panelFunction = 11; break;}
                   case "LockAC": {panelFunction = 12; break;}
                   case "BacklightStatus": {panelFunction = 13; break;}
                   case "StatusLightLevel": {panelFunction = 14; break;}
                   case "ShieldButton": {panelFunction = 15; break;}
                   case "ShieldPage": {panelFunction = 16; break;}
                   case "ControlButtonLED": {panelFunction = 17; break;}
                   case "ControlButton": {panelFunction = 18; break;}
                   case "DryTemp": {panelFunction = 19; break;}
                   case "TempStatus": {panelFunction = 20; break;}
                   case "TempMode": {panelFunction = 21; break;}
                   case "FHRiseTemp": {panelFunction = 22; break;}
                   case "FHDecreaseTemp": {panelFunction = 23; break;}
                   case "LockSetupPage": {panelFunction = 24; break;}
                   case "NormalTemp": {panelFunction = 25; break;}
                   case "DayTemp": {panelFunction = 26; break;}
                   case "NightTemp": {panelFunction = 27; break;}
                   case "AwayTemp": {panelFunction = 28; break;}
                   default {
                     return "Panel Function not Found: " + data.panelFunction;
                   }
                 }


                // return Buffer.from([data.areaNumber, data.sceneNumber]);
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
