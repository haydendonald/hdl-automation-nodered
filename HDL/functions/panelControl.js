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
              //// TODO: Check for null
                 // if (typeof data.panelFunction != 'string'){ return "Invalid panel function: " + data.panelFunction; }
                 // if (typeof data.panelData != 'string'){ return "Invalid panel data: " + data.panelData; }

                 var panelFunction = null;
                 var panelData = null;
                 switch(data.panelFunction) {
                   case "invalid": {
                     panelFunction = 0;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid Invalid: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "IRControl": {
                     panelFunction = 1;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid IRControl: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "LockPanel": {
                     panelFunction = 2;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid LockPanel: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "ACPower": {
                     panelFunction = 3;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid ACPower: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "CoolingTemp": {
                     panelFunction = 4;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid CoolingTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }

                   case "FanSpeed": {
                     panelFunction = 5;
                     switch(data.panelData) {
                       "auto": {panelData = [0]; break;}
                       "high": {panelData = [0]; break;}
                       "medium": {panelData = [0]; break;}
                       "low": {panelData = [0]; break;}
                       default {
                         return "Invalid FanSpeed: " + data.panelData + ". Expected 'auto', 'high', 'medium', or 'low'";
                       }
                     }
                     break;
                   }
                   case "ACMode": {
                     panelFunction = 6;
                     break;
                   }
                   case "HeatTemp": {
                     panelFunction = 7;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid HeatTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "AutoTemp": {
                     panelFunction = 8;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid AutoTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "RiseTemp": {
                     panelFunction = 9;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid RiseTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "DecreaseTemp": {
                     panelFunction = 10;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid DecreaseTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "BacklightStatus": {
                     panelFunction = 11;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid BacklightStatus: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "LockAC": {
                     panelFunction = 12;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid LockAC: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "BacklightLevel": {
                     panelFunction = 13;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 100){return "Invalid BacklightLevel: " + data.panelData + ". Expected a number between 0 and 100";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "StatusLightLevel": {
                     panelFunction = 14;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 100){return "Invalid StatusLightLevel: " + data.panelData + ". Expected a number between 0 and 100";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "ShieldButton": {
                     panelFunction = 15;
                     break;
                   }
                   case "ShieldPage": {
                     panelFunction = 16;
                     break;
                   }
                   case "ControlButtonLED": {
                     panelFunction = 17;
                     break;
                   }
                   case "ControlButton": {
                     panelFunction = 18;
                     break;
                   }
                   case "DryTemp": {
                     panelFunction = 19;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid DryTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "TempStatus": {
                     panelFunction = 20;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid TempStatus: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "TempMode": {
                     panelFunction = 21;
                     break;
                   }
                   case "FHRiseTemp": {
                     panelFunction = 22;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 5){return "Invalid FHRiseTemp: " + data.panelData + ". Expected a number between 0 and 5";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "FHDecreaseTemp": {
                     panelFunction = 23;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 5){return "Invalid FHDecreaseTemp: " + data.panelData + ". Expected a number between 0 and 5";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "LockSetupPage": {
                     panelFunction = 24;
                     switch(data.panelData) {
                       "on": {panelData = [1]; break;}
                       "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid LockSetupPage: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "NormalTemp": {
                     panelFunction = 25;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid NormalTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "DayTemp": {
                     panelFunction = 26;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid DayTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "NightTemp": {
                     panelFunction = 27;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid NightTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "AwayTemp": {
                     panelFunction = 28;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid AwayTemp: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
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
