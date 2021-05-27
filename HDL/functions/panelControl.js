module.exports = {
    status: "Stable",
    name: "Panel Control",
    description: "Panel control controls a wall panel",

    commands: {
      //IR Control
      1: {
        "name": "ircontrol",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //Lock Panel
      2: {
        "name": "lockpanel",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //AC Power
      3: {
        "name": "acpower",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //Cooling Temp
      4: {
        "name": "coolingtemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Fan Speed
      5: {
        "name": "fanspeed",
        "values": {
          0: "auto",
          1: "high",
          2: "medium",
          3: "low"
        }
      },
      //AC Mode
      6: {
        "name": "acmode",
        "values": {
          0: "cooling",
          1: "heating",
          2: "fan",
          3: "auto",
          4: "dehumidify"
        }
      },
      //Heat Temp
      7: {
        "name": "heattemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Auto Temp
      8: {
        "name": "autotemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Rise Temp
      9: {
        "name": "risetemp",
        "values": {},
        "minValue": 0,
        "maxValue": 5
      },
      //Decrease Temp
      10: {
        "name": "decreasetemp",
        "values": {},
        "minValue": 0,
        "maxValue": 5
      },
      //Backlight status
      11: {
        "name": "backlightstatus",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //Lock AC
      12: {
        "name": "lockac",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //Backlight level
      13: {
        "name": "backlightlevel",
        "values": {},
        "minValue": 0,
        "maxValue": 100
      },
      //Status light level
      14: {
        "name": "statuslightlevel",
        "values": {},
        "minValue": 0,
        "maxValue": 100
      },
      //Shield button
      15: {
        "name": "shieldbutton",
        "values": {
          0: "off",
          1: "on"
        },
        "requiresSelector": true
      },
      //Shield page
      16: {
        "name": "shieldpage",
        "values": {
          0: "off",
          1: "on"
        },
        "requiresSelector": true
      },
      //Control button LED
      17: {
        "name": "controlbuttonled",
        "values": {
          0: "off",
          1: "on"
        },
        "requiresSelector": true
      },
      //Control button
      18: {
        "name": "controlbutton",
        "values": {
          0: "off",
          1: "on"
        },
        "requiresSelector": true
      },
      //Dry temp
      19: {
        "name": "drytemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Temp status
      20: {
        "name": "tempstatus",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //Temp status
      21: {
        "name": "tempmode",
        "values": {
          1: "normal",
          2: "day",
          3: "night",
          4: "away",
          5: "night"
        }
      },
      //FR rise temp
      22: {
        "name": "frrisetemp",
        "values": {},
        "minValue": 0,
        "maxValue": 5
      },
      //FR decrease temp
      23: {
        "name": "frdecreasetemp",
        "values": {},
        "minValue": 0,
        "maxValue": 5
      },
      //Lock setup page
      24: {
        "name": "locksetuppage",
        "values": {
          0: "off",
          1: "on"
        }
      },
      //Normal temp
      25: {
        "name": "normaltemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Day temp
      26: {
        "name": "daytemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Night temp
      27: {
        "name": "nighttemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
      //Away temp
      28: {
        "name": "awaytemp",
        "values": {},
        "minValue": 0,
        "maxValue": 84
      },
    },

    actions: {
        set: {
            request: 0xE3D8,
            answerBack: 0xE3D9,
            processData: function(data, func) {


              console.log(func);

              if(data.length == 2) {
                return {
                  "function": functions[data[0]].name || data[0],
                  "value": functions[data[0]].values[data[1]] || data[1]
                }
              }
              else {
                return {
                  "function": functions[data[0]].name || data[0],
                  "selector": data[1],
                  "value": functions[data[0]].values[data[2]] || data[2]
                }      
              }
            },
            generateData: function(data, func) {
              var func = undefined;
              var values = [];
              
              //Find the function
              for(var i in functions) {
                if(functions[i].name == data.function){func = parseInt(i); break;}
              }
              if(func === undefined){return "Could not find the function..";}

              //If there is a selector add it
              if(functions[func].requiresSelector) {
                if(data.selector === undefined){return "This function requires a selector value";}
                else {values.push(parseInt(data.selector));}
              }

              //Find the value or validate the value if required
              if(functions[func].values === {}) {
                if(functions[func].minValue !== undefined && parseInt(data.value) < functions[func].minValue) {return "Value must be more than " + functions[func].minValue;}
                if(functions[func].maxValue !== undefined && parseInt(data.value) > functions[func].maxValue) {return "Value must be less than " + functions[func].maxValue;}
              }
              else {
                for(var i in functions[func].values) {
                  if(functions[func].values[i] == data.value){values.push(parseInt(i)); break;}
                }
              }

              //Send it if we have a function and value!
              if(values.length > 0) {
                return Buffer.concat([Buffer.from([func]), Buffer.from(values)]);
              }
              else {
                return "Could not find the value";
              }
            }
        },

        get: {
            request: 0xE3DA,
            answerBack: 0xE3DB,
            processData: function(data, func) {
              if(data.length == 2) {
                return {
                  "function": functions[data[0]].name || data[0],
                  "value": functions[data[0]].values[data[1]] || data[1]
                }
              }
              else {
                return {
                  "function": functions[data[0]].name || data[0],
                  "selector": data[1],
                  "value": functions[data[0]].values[data[2]] || data[2]
                }      
              }
            },
            generateData: function(data, func) {
              var func = undefined;
              var values = [];
              
              //Find the function
              for(var i in functions) {
                if(functions[i].name == data.function){func = parseInt(i); break;}
              }
              if(func === undefined){return "Could not find the function..";}

              //If there is a selector add it
              if(functions[func].requiresSelector) {
                if(data.selector === undefined){return "This function requires a selector value";}
                else {values.push(parseInt(data.selector));}
              }

              return Buffer.concat([Buffer.from([func]), Buffer.from(values)]);
            }
        },

        broadcast: {
            request: 0xFFFF,
            answerBack: 0xFFFF,
            processData: function(data, func) {
                return null;
            },
            generateData: function(data, func) {
                return null;
            }
        }
    }
}
