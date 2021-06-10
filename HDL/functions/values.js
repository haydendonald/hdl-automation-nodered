module.exports = {
    list: {
      //Version 2 AC Values
        ACValues: {
            "tempType": {0: "C", 1: "F"},
            "modes": {
                0: "cooling",
                1: "heating",
                2: "fan",
                3: "auto",
                4: "dry"
            },
            "fanSpeeds": {
                0: "auto",
                1: "high",
                2: "medium",
                3: "low"
            },
        },

        //Version 1 AC Values
        ACValuesV1: {
          //Mode values in data position 1, 2, 5, 8
          "modes": {
            "off": [32, 22], //Position 1, 5
            "cooling": {
              "auto": [1, 0, 150, 0],
              "high": [1, 1, 150, 1],
              "medium": [2, 2, 150, 2],
              "low": [3, 3, 150, 3],
            }
          },
        },

        //Panel values
        PanelValues: {
            //IR Control
            1: {
              "name": "ircontrol",
              "values": {
                0: "off",
                1: "on"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Lock Panel
            2: {
              "name": "lockpanel",
              "values": {
                0: "off",
                1: "on"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //AC Power
            3: {
              "name": "acpower",
              "values": {
                0: "off",
                1: "on"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
              }
            },
            //Cooling Temp
            4: {
              "name": "coolingtemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
              }
            },
            //Fan Speed
            5: {
              "name": "fanspeed",
              "values": {
                0: "auto",
                1: "high",
                2: "medium",
                3: "low"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
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
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
             }
            },
            //Heat Temp
            7: {
              "name": "heattemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
              }
            },
            //Auto Temp
            8: {
              "name": "autotemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
              }
            },
            //Rise Temp
            9: {
              "name": "risetemp",
              "values": {},
              "minValue": 0,
              "maxValue": 5,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
              }
            },
            //Decrease Temp
            10: {
              "name": "decreasetemp",
              "values": {},
              "minValue": 0,
              "maxValue": 5,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
              }
            },
            //Backlight status
            11: {
              "name": "backlightstatus",
              "values": {
                0: "off",
                1: "on"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Lock AC
            12: {
              "name": "lockac",
              "values": {
                0: "off",
                1: "on"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Backlight level
            13: {
              "name": "backlightlevel",
              "values": {},
              "minValue": 0,
              "maxValue": 100,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Status light level
            14: {
              "name": "statuslightlevel",
              "values": {},
              "minValue": 0,
              "maxValue": 100,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Shield button
            15: {
              "name": "shieldbutton",
              "values": {
                0: "off",
                1: "on"
              },
              "requiresSelector": true,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "temp": data
                }
              }
            },
            //Shield page
            16: {
              "name": "shieldpage",
              "values": {
                0: "off",
                1: "on"
              },
              "requiresSelector": true,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "selector": data[2]
                }
              }
            },
            //Control button LED
            17: {
              "name": "controlbuttonled",
              "values": {
                0: "off",
                1: "on"
              },
              "requiresSelector": true,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "selector": data[2]
                }
              }
            },
            //Control button
            18: {
              "name": "controlbutton",
              "values": {
                0: "off",
                1: "on"
              },
              "requiresSelector": true,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "selector": data[2]
                }
              }
            },
            //Dry temp
            19: {
              "name": "drytemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1],
                    "number": data[2]
                }
             }
            },
            //Temp status
            20: {
              "name": "tempstatus",
              "values": {
                0: "off",
                1: "on",
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
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
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
             }
            },
            //FR rise temp
            22: {
              "name": "fhrisetemp",
              "values": {},
              "minValue": 0,
              "maxValue": 5,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //FR decrease temp
            23: {
              "name": "fhdecreasetemp",
              "values": {},
              "minValue": 0,
              "maxValue": 5,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Lock setup page
            24: {
              "name": "locksetuppage",
              "values": {
                0: "off",
                1: "on"
              },
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Normal temp
            25: {
              "name": "normaltemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Day temp
            26: {
              "name": "daytemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Night temp
            27: {
              "name": "nighttemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
            //Away temp
            28: {
              "name": "awaytemp",
              "values": {},
              "minValue": 0,
              "maxValue": 84,
              process: function(data) {
                return {
                    "value": this.values[data[1]] || data[1]
                }
              }
            },
          },
    }
}