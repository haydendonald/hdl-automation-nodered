module.exports = {
    status: "Stable",
    name: "Panel Control",
    description: "Panel control controls a wall panel",

    actions: {
        set: {
            request: 0xE3D8,
            answerBack: 0xE3D9,
            processData: function(data) {
              var panelFunction = null;
              var msg = {};
              switch(data[0]) {
                case 0: {
                  panelFunction = "invalid";
                  break;
                }
                case 1: {
                  panelFunction = "ircontrol";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 2: {
                  panelFunction = "lockpanel";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 3: {
                  panelFunction = "acpower";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 4: {
                  panelFunction = "coolingtemp";
                  msg.panelData = data[1];
                  break;
                }
                case 5: {
                  panelFunction = "fanspeed";
                  switch(data[1]) {
                    case 0: {msg.panelData = "auto"; break;}
                    case 1: {msg.panelData = "high"; break;}
                    case 2: {msg.panelData = "medium"; break;}
                    case 3: {msg.panelData = "low"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 6: {
                  panelFunction = "acmode";
                  switch(data[1]) {
                    case 0: {msg.panelData = "cooling"; break;}
                    case 1: {msg.panelData = "heating"; break;}
                    case 2: {msg.panelData = "fan"; break;}
                    case 3: {msg.panelData = "auto"; break;}
                    case 4: {msg.panelData = "dehumidfy"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 7: {
                  panelFunction = "heattemp";
                  msg.panelData = data[1];
                  break;
                }
                case 8: {
                  panelFunction = "autotemp";
                  msg.panelData = data[1];
                  break;
                }
                case 9: {
                  panelFunction = "risetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 10: {
                  panelFunction = "decreasetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 11: {
                  panelFunction = "backlightstatus";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 12: {
                  panelFunction = "lockac";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 13: {
                  panelFunction = "backlightlevel";
                  msg.panelData = data[1];
                  break;
                }
                case 14: {
                  panelFunction = "statuslightlevel";
                  msg.panelData = data[1];
                  break;
                }
                case 15: {
                  panelFunction = "shieldbutton";
                  msg.button = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 16: {
                  panelFunction = "shieldpage";
                  msg.page = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 17: {
                  panelFunction = "controlbuttonled";
                  msg.button = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 18: {
                  panelFunction = "controlbutton";
                  msg.button = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 19: {
                  panelFunction = "drytemp";
                  msg.panelData = data[1];
                  break;
                }
                case 20: {
                  panelFunction = "tempstatus";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 21: {
                  panelFunction = "tempmode";
                  switch(data[1]) {
                    case 0: {msg.panelData = "normal"; break;}
                    case 1: {msg.panelData = "day"; break;}
                    case 2: {msg.panelData = "night"; break;}
                    case 3: {msg.panelData = "away"; break;}
                    case 4: {msg.panelData = "timer"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 22: {
                  panelFunction = "fhrisetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 23: {
                  panelFunction = "fhdecreasetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 24: {
                  panelFunction = "locksetuppage";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 25: {
                  panelFunction = "normaltemp";
                  msg.panelData = data[1];
                  break;
                }
                case 26: {
                  panelFunction = "daytemp";
                  msg.panelData = data[1];
                  break;
                }
                case 27: {
                  panelFunction = "nighttemp";
                  msg.panelData = data[1];
                  break;
                }
                case 28: {
                  panelFunction = "awaytemp";
                  msg.panelData = data[1];
                  break;
                }
                default: {
                  console.log("Internal Error: Panel function " + data[0] + " is not supported!");
                  panelFunction = "invalid";
                  break;
                }
              }

              msg.panelFunction = panelFunction;
              return msg;
            },
            generateData: function(data) {
                if(data.panelFunction === null || data.panelFunction === undefined){return "panelFunction cannot be null";}

                 var panelFunction = null;
                 var panelData = null;
                 switch(data.panelFunction.toLowerCase()) {
                   case "invalid": {
                     panelFunction = 0;
                     break;
                   }
                   case "ircontrol": {
                     panelFunction = 1;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "lockpanel": {
                     panelFunction = 2;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "acpower": {
                     panelFunction = 3;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "coolingtemp": {
                     panelFunction = 4;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }

                   case "fanspeed": {
                     panelFunction = 5;
                     switch(data.panelData.toLowerCase()) {
                       case "auto": {panelData = [0]; break;}
                       case "high": {panelData = [1]; break;}
                       case "medium": {panelData = [2]; break;}
                       case "low": {panelData = [3]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'auto', 'high', 'medium', or 'low'";
                       }
                     }
                     break;
                   }
                   case "acmode": {
                     panelFunction = 6;
                     switch(data.panelData.toLowerCase()) {
                       case "cooling": {panelData = [0]; break;}
                       case "heating": {panelData = [1]; break;}
                       case "fan": {panelData = [2]; break;}
                       case "auto": {panelData = [3]; break;}
                       case "dehumidfy": {panelData = [4]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'cooling', 'heating', 'fan', 'auto', or 'dehumify'";
                       }
                     }
                     break;
                   }
                   case "heattemp": {
                     panelFunction = 7;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "autotemp": {
                     panelFunction = 8;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "risetemp": {
                     panelFunction = 9;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "decreasetemp": {
                     panelFunction = 10;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "backlightstatus": {
                     panelFunction = 11;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "lockac": {
                     panelFunction = 12;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "backlightlevel": {
                     panelFunction = 13;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 100){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 100";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "statuslightlevel": {
                     panelFunction = 14;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 100){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 100";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "shieldbutton": {
                     panelFunction = 15;
                     if(typeof data.button != 'number' || data.button < 1 || data.button > 255){return "Invalid button: " + data.button + ". Expected a number between 1 and 255";}
                     switch(data.status) {
                       case "on": {panelData = [data.button, 1]; break;}
                       case "off": {panelData = [data.button, 0]; break;}
                       default: {
                         return "Invalid status: " + data.status + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "shieldpage": {
                     panelFunction = 16;
                     if(typeof data.page != 'number' || data.page < 1 || data.page > 255){return "Invalid page: " + data.page + ". Expected a number between 1 and 255";}
                     switch(data.status.toLowerCase()) {
                       case "on": {panelData = [data.page, 1]; break;}
                       case "off": {panelData = [data.page, 0]; break;}
                       default: {
                         return "Invalid status: " + data.status + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "controlbuttonled": {
                     panelFunction = 17;
                     if(typeof data.button != 'number' || data.button < 1 || data.button > 255){return "Invalid button: " + data.button + ". Expected a number between 1 and 255";}
                     switch(data.status.toLowerCase()) {
                       case "on": {panelData = [data.button, 1]; break;}
                       case "off": {panelData = [data.button, 0]; break;}
                       default: {
                         return "Invalid status: " + data.status + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "controlbutton": {
                     panelFunction = 18;
                     if(typeof data.button != 'number' || data.button < 1 || data.button > 255){return "Invalid button: " + data.button + ". Expected a number between 1 and 255";}
                     switch(data.status.toLowerCase()) {
                       case "on": {panelData = [data.button, 1]; break;}
                       case "off": {panelData = [data.button, 0]; break;}
                       default: {
                         return "Invalid status: " + data.status + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "drytemp": {
                     panelFunction = 19;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "tempstatus": {
                     panelFunction = 20;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "tempmode": {
                     panelFunction = 21;
                     switch(data.panelData.toLowerCase()) {
                       case "normal": {panelData = [0]; break;}
                       case "day": {panelData = [1]; break;}
                       case "night": {panelData = [2]; break;}
                       case "away": {panelData = [3]; break;}
                       case "timer": {panelData = [4]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'normal', 'day', 'night', or 'away'";
                       }
                     }
                     break;
                   }
                   case "fhrisetemp": {
                     panelFunction = 22;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 5){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 5";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "fhdecreasetemp": {
                     panelFunction = 23;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 5){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 5";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "locksetuppage": {
                     panelFunction = 24;
                     switch(data.panelData.toLowerCase()) {
                       case "on": {panelData = [1]; break;}
                       case "off": {panelData = [0]; break;}
                       default: {
                         return "Invalid panelData: " + data.panelData + ". Expected 'on' or 'off'";
                       }
                     }
                     break;
                   }
                   case "normaltemp": {
                     panelFunction = 25;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "daytemp": {
                     panelFunction = 26;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "nighttemp": {
                     panelFunction = 27;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   case "awaytemp": {
                     panelFunction = 28;
                     if(typeof data.panelData != 'number' || data.panelData < 0 || data.panelData > 84){return "Invalid panelData: " + data.panelData + ". Expected a number between 0 and 84";}
                     panelData = [data.panelData];
                     break;
                   }
                   default: {
                     return "Panel Function not Found: " + data.panelFunction;
                   }
                 }

                 if(typeof panelFunction != 'number'){return "Internal Error: Panel Function: " + panelFunction + " Not Found";}
                 if(panelData.length < 1){return "Internal Error: Panel Data: " + panelData + " is in the wrong format";}

                 return Buffer.concat([Buffer.from([panelFunction]), Buffer.from(panelData)]);
            }
        },

        get: {
            request: 0xE3DA,
            answerBack: 0xE3DB,
            processData: function(data) {
              var panelFunction = null;
              var msg = {"panelFunction":null};
              switch(data[0]) {
                case 0: {
                  panelFunction = "invalid";
                  break;
                }
                case 1: {
                  panelFunction = "ircontrol";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 2: {
                  panelFunction = "lockpanel";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 3: {
                  panelFunction = "acpower";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 4: {
                  panelFunction = "coolingtemp";
                  msg.panelData = data[1];
                  break;
                }
                case 5: {
                  panelFunction = "fanspeed";
                  switch(data[1]) {
                    case 0: {msg.panelData = "auto"; break;}
                    case 1: {msg.panelData = "high"; break;}
                    case 2: {msg.panelData = "medium"; break;}
                    case 3: {msg.panelData = "low"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 6: {
                  panelFunction = "acmode";
                  switch(data[1]) {
                    case 0: {msg.panelData = "cooling"; break;}
                    case 1: {msg.panelData = "heating"; break;}
                    case 2: {msg.panelData = "fan"; break;}
                    case 3: {msg.panelData = "auto"; break;}
                    case 4: {msg.panelData = "dehumidfy"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 7: {
                  panelFunction = "heattemp";
                  msg.panelData = data[1];
                  break;
                }
                case 8: {
                  panelFunction = "autotemp";
                  msg.panelData = data[1];
                  break;
                }
                case 9: {
                  panelFunction = "risetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 10: {
                  panelFunction = "decreasetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 11: {
                  panelFunction = "backlightstatus";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 12: {
                  panelFunction = "lockac";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 13: {
                  panelFunction = "backlightlevel";
                  msg.panelData = data[1];
                  break;
                }
                case 14: {
                  panelFunction = "statuslightlevel";
                  msg.panelData = data[1];
                  break;
                }
                case 15: {
                  panelFunction = "shieldbutton";
                  msg.button = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 16: {
                  panelFunction = "shieldpage";
                  msg.page = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 17: {
                  panelFunction = "controlbuttonled";
                  msg.button = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 18: {
                  panelFunction = "controlbutton";
                  msg.button = data[1];
                  switch(data[2]) {
                    case 0: {msg.status = "off"; break;}
                    case 1: {msg.status = "on"; break;}
                    default: {msg.status = data[1]; break;}
                  }
                  break;
                }
                case 19: {
                  panelFunction = "drytemp";
                  msg.panelData = data[1];
                  break;
                }
                case 20: {
                  panelFunction = "tempstatus";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 21: {
                  panelFunction = "tempmode";
                  switch(data[1]) {
                    case 0: {msg.panelData = "normal"; break;}
                    case 1: {msg.panelData = "day"; break;}
                    case 2: {msg.panelData = "night"; break;}
                    case 3: {msg.panelData = "away"; break;}
                    case 4: {msg.panelData = "timer"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 22: {
                  panelFunction = "fhrisetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 23: {
                  panelFunction = "fhdecreasetemp";
                  msg.panelData = data[1];
                  break;
                }
                case 24: {
                  panelFunction = "locksetuppage";
                  switch(data[1]) {
                    case 0: {msg.panelData = "off"; break;}
                    case 1: {msg.panelData = "on"; break;}
                    default: {msg.panelData = data[1]; break;}
                  }
                  break;
                }
                case 25: {
                  panelFunction = "normaltemp";
                  msg.panelData = data[1];
                  break;
                }
                case 26: {
                  panelFunction = "daytemp";
                  msg.panelData = data[1];
                  break;
                }
                case 27: {
                  panelFunction = "nighttemp";
                  msg.panelData = data[1];
                  break;
                }
                case 28: {
                  panelFunction = "awaytemp";
                  msg.panelData = data[1];
                  break;
                }
                default: {
                  console.log("Internal Error: Panel function " + data[0] + " is not supported!");
                  panelFunction = "invalid";
                  break;
                }
              }

              msg.panelFunction = panelFunction;
              return msg;
            },
            generateData: function(data) {
              if(data.panelFunction === null || data.panelFunction === undefined){return "panelFunction cannot be null";}
              var panelFunction = null;
              var panelData = [];
              switch(data.panelFunction.toLowerCase()) {
                case "invalid": {panelFunction = 0; break;}
                case "ircontrol": {panelFunction = 1; break;}
                case "lockpanel": {panelFunction = 2; break;}
                case "acpower": {panelFunction = 3; break;}
                case "coolingtemp": {panelFunction = 4; break;}
                case "fanspeed": {panelFunction = 5; break;}
                case "acmode": {panelFunction = 6; break;}
                case "heattemp": {panelFunction = 7; break;}
                case "autotemp": {panelFunction = 8; break;}
                case "risetemp": {panelFunction = 9; break;}
                case "decreasetemp": {panelFunction = 10; break;}
                case "backlightstatus": {panelFunction = 11; break;}
                case "lockac": {panelFunction = 12; break;}
                case "backlightlevel": {panelFunction = 13; break;}
                case "statuslightlevel": {panelFunction = 14; break;}
                case "shieldbutton": {
                  panelFunction = 15;
                  if(typeof data.button != 'number' || data.button < 1 || data.button > 255){return "Invalid button: " + data.button + ". Expected a number between 1 and 255";}
                  panelData = [data.button];
                  break;
                }
                case "shieldpage": {
                  panelFunction = 16;
                  if(typeof data.page != 'number' || data.page < 1 || data.page > 255){return "Invalid page: " + data.button + ". Expected a number between 1 and 255";}
                  panelData = [data.page];
                  break;
                 }
                case "controlbuttonled": {
                  if(typeof data.button != 'number' || data.button < 1 || data.button > 255){return "Invalid button: " + data.button + ". Expected a number between 1 and 255";}
                  panelData = [data.button];
                  panelFunction = 17;
                   break;
                 }
                case "controlbutton": {
                  if(typeof data.button != 'number' || data.button < 1 || data.button > 255){return "Invalid button: " + data.button + ". Expected a number between 1 and 255";}
                  panelData = [data.button];
                  panelFunction = 18;
                  break;
                 }
                case "drytemp": {panelFunction = 19; break;}
                case "tempstatus": {panelFunction = 20; break;}
                case "tempmode": {panelFunction = 21; break;}
                case "fhrisetemp": {panelFunction = 22; break;}
                case "fhdecreasetemp": {panelFunction = 23; break;}
                case "locksetuppage": {panelFunction = 24; break;}
                case "normaltemp": {panelFunction = 25; break;}
                case "daytemp": {panelFunction = 26; break;}
                case "nighttemp": {panelFunction = 27; break;}
                case "awaytemp": {panelFunction = 28; break;}
                default: {
                  return "Panel Function not Found: " + data.panelFunction;
                }
              }

              return Buffer.from([panelFunction, panelData]);
            }
        },

        broadcast: {
            request: 0xFFFF,
            answerBack: 0xFFFF,
            processData: function(data) {
                return null;
            },
            generateData: function(data) {
                return null;
            }
        }
    }
}
