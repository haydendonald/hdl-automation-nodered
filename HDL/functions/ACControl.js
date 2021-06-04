module.exports = {
    status: "Stable",
    name: "AC Control",
    description: "Controls AC units",

    actions: {
        set: {
            request: 0x193A,
            answerBack: 0x193B,
            processData: function(data) {
              var values = require("./values.js").list.ACValues;
              var getBinVal = require("./functionList.js").getBinVal;


              var ret = {
                "number":  data[0],
                "temperatureType": values.tempType[data[1]] || data[1],
                "currentTemperature": data[2],
                "setTemperature": {
                  "cooling": data[3],
                  "heating": data[4],
                  "auto": data[5],
                  "dry": data[6],
                },
                "mode": values.modes[getBinVal(data[7], 0, 3)],
                "fan": values.fanSpeeds[getBinVal(data[7], 4, 7)],
                "state": data[8] == 1,
                "setupMode": values.modes[data[9]] || data[9],
                "setupSpeed": values.fanSpeeds[data[10]] || data[10],
                "currentMode": values.modes[getBinVal(data[11], 0, 3)] || getBinVal(data[11], 0, 3),
                "currentFan": values.fanSpeeds[getBinVal(data[11], 4, 7)] || getBinVal(data[11], 4, 7),
                "sweep": {
                  "enabled": getBinVal(data[12], 0, 3) == 1,
                  "state": getBinVal(data[12], 4, 7)
                }
              };

              return ret;
            },
            generateData: function(data, originalMsg, requester) {
              var values = require("./values.js").list.ACValues;
              var functionList = require("./functionList.js");

              return new Promise((resolve, reject) => {
                if(typeof(data.number) != "number" || data.number < 1 || data.number > 128){reject("Invalid number must be between 1-128"); return;}

                //First request the current values from the bus
                requester.send(undefined, {
                  "payload": {
                    "operate": "ACControl",
                    "mode": "get",
                    "direction": "request",
                    "data": {"number": data.number},
                    "subnetId": originalMsg.payload.subnetId,
                    "deviceId": originalMsg.payload.deviceId
                }}, function(success, result) {
                  if(!success) {
                    reject("Could not get the current state from the bus");
                  }
                  else {
                    var buffer = result.payload.contents;

                    if(data.temperatureType !== undefined) {
                      for(var i in values.tempType) {
                        if(values.tempType[i].toUpperCase() == data.temperatureType.toUpperCase()){buffer[1] = parseInt(i); break;}
                      }
                    }
                    if(data.currentTemperature !== undefined) {
                      if(typeof(data.currentTemperature) != "number" || data.currentTemperature < 0 || data.currentTemperature > 99){reject("Invalid current temperature. Must be a number between 0 and 99"); return;}
                      buffer[2] = parseInt(data.currentTemperature);
                    }

                    //If set temperature is an integer replace the set temp with the current setup mode
                    if(typeof(data.setTemperature) == "number") {
                      var val = data.setTemperature;
                      data.setTemperature = {};
                      if(data.setupMode === undefined) {
                        data.setTemperature[values.modes[buffer[9]]] = parseInt(val);
                      }
                      else {
                        data.setTemperature[data.setupMode] = parseInt(val);
                      }
                    }

                    console.log(data.setTemperature);


                    if(data.setTemperature !== undefined) {
                      if(data.setTemperature.cooling !== undefined) {
                        if(typeof(data.setTemperature.cooling) != "number" || data.setTemperature.cooling < 0 || data.setTemperature.cooling > 86){reject("Invalid set temperature (cooling). Must be a number between 0 and 86"); return;}
                        buffer[3] = parseInt(data.setTemperature.cooling);
                      }
                      if(data.setTemperature.heating !== undefined) {
                        if(typeof(data.setTemperature.heating) != "number" || data.setTemperature.heating < 0 || data.setTemperature.heating > 86){reject("Invalid set temperature (heating). Must be a number between 0 and 86"); return;}
                        buffer[4] = parseInt(data.setTemperature.heating);
                      }
                      if(data.setTemperature.auto !== undefined) {
                        if(typeof(data.setTemperature.auto) != "number" || data.setTemperature.auto < 0 || data.setTemperature.auto > 86){reject("Invalid set temperature (auto). Must be a number between 0 and 86"); return;}
                        buffer[5] = parseInt(data.setTemperature.auto);
                      }
                      if(data.setTemperature.dry !== undefined) {
                        if(typeof(data.setTemperature.dry) != "number" || data.setTemperature.dry < 0 || data.setTemperature.dry > 86){reject("Invalid set temperature (dry). Must be a number between 0 and 86"); return;}
                        buffer[6] = parseInt(data.setTemperature.dry);
                      }
                    }

                    
                    if(data.mode !== undefined || data.fan !== undefined) {
                      var modeBin = "";
                      var fanBin = "";

                      //Attempt to find the values
                      if(data.mode !== undefined) {
                        for(var i in values.modes){if(values.modes[i].toUpperCase() == data.mode.toUpperCase()){modeBin = functionList.intToBin(i, 4); break;}}
                      }
                      if(data.fan !== undefined) {
                        for(var i in values.fanSpeeds){if(values.fanSpeeds[i].toUpperCase() == data.fan.toUpperCase()){fanBin = functionList.intToBin(i, 4); break;}}
                      }

                      //If they passed an int set the int value
                      if(modeBin == "" && typeof(data.mode) == "number"){modeBin = functionList.intToBin(parseInt(data.mode), 4);}
                      if(fanBin == "" && typeof(data.fan) == "number"){fanBin = functionList.intToBin(parseInt(data.fan), 4);}
                      
                      if(modeBin == "" && fanBin == "") {reject("Mode or Fan was not valid. These should be a string value"); return;}
                      if(modeBin == ""){modeBin = functionList.intToBin(functionList.getBinVal(buffer[7], 0, 3), 4);}
                      if(fanBin == ""){fanBin = functionList.intToBin(functionList.getBinVal(buffer[7], 4, 7), 4);}
                      buffer[7] = functionList.binToInt(modeBin + fanBin);
                    }


                    if(data.state !== undefined) {
                      if(data.state == true){buffer[8] = 1;}
                      else if(data.state == false) {buffer[8] = 0;}
                      else {reject("Invalid state must be a boolean"); return;}
                    }
                    if(data.setupMode !== undefined) {
                      for(var i in values.modes) {
                        if(values.modes[i] == data.setupMode){buffer[9] = parseInt(i); break;}
                      }
                    }
                    if(data.setupSpeed !== undefined) {
                      for(var i in values.fanSpeeds) {
                        if(values.fanSpeeds[i] == data.setupSpeed){buffer[10] = parseInt(i); break;}
                      }  
                    }
                    
                    //Not sure if this works or not
                    if(data.currentMode !== undefined || data.currentFan !== undefined) {
                      var modeBin = "";
                      var fanBin = "";

                      //Attempt to find the values
                      if(data.currentMode !== undefined) {
                        for(var i in values.modes){if(values.modes[i].toUpperCase() == data.currentMode.toUpperCase()){modeBin = functionList.intToBin(i, 4); break;}}
                      }
                      if(data.currentFan !== undefined) {
                        for(var i in values.fanSpeeds){if(values.fanSpeeds[i].toUpperCase() == data.currentFan.toUpperCase()){fanBin = functionList.intToBin(i, 4); break;}}
                      }

                      //If they passed an int set the int value
                      if(modeBin == "" && typeof(data.currentMode) == "number"){modeBin = functionList.intToBin(parseInt(data.currentMode), 4);}
                      if(fanBin == "" && typeof(data.currentFan) == "number"){fanBin = functionList.intToBin(parseInt(data.currentFan), 4);}

                      if(modeBin == "" && fanBin == "") {reject("Mode or Fan was not valid. These should be a string value"); return;}
                      if(modeBin == ""){modeBin = functionList.intToBin(functionList.getBinVal(buffer[11], 0, 3), 4);}
                      if(fanBin == ""){fanBin = functionList.intToBin(functionList.getBinVal(buffer[11], 4, 7), 4);}
                      buffer[11] = functionList.binToInt(modeBin + fanBin);
                    }

                    if(data.sweep !== undefined) {
                      if(data.sweep.enabled !== undefined && data.sweep.state !== undefined) {
                        var enabledBin = "";
                        var stateBin = "";

                        if(data.sweep.enabled !== undefined){enabledBin = functionList.intToBin(data.sweep.enabled == true ? 1 : 0);}
                        if(data.sweep.state !== undefined){stateBin = functionList.intToBin(parseInt(data.sweep.state));}

                        if(enabledBin == "" && stateBin == "") {reject("Sweep was not valid. These should be a object value with enabled and state"); return;}
                        if(enabledBin == ""){enabledBin = functionList.intToBin(functionList.getBinVal(buffer[12], 0, 3), 4);}
                        if(stateBin == ""){stateBin = functionList.intToBin(functionList.getBinVal(buffer[12], 4, 7), 4);}
                        buffer[12] = functionList.binToInt(enabledBin + stateBin);
                      }
                    }

                    resolve(buffer);
                  }
                });
              });
            }
        },

        get: {
            request: 0x1938,
            answerBack: 0x1939,
            processData: function(data) {
              var values = require("./values.js").list.ACValues;
              var getBinVal = require("./functionList.js").getBinVal;

              var ret = {
                "number":  data[0],
                "temperatureType": values.tempType[data[1]] || data[1],
                "currentTemperature": data[2],
                "setTemperature": {
                  "cooling": data[3],
                  "heating": data[4],
                  "auto": data[5],
                  "dry": data[6],
                },
                "mode": values.modes[getBinVal(data[7], 0, 3)],
                "fan": values.fanSpeeds[getBinVal(data[7], 4, 7)],
                "state": data[8] == 1,
                "setupMode": values.modes[data[9]] || data[9],
                "setupSpeed": values.fanSpeeds[data[10]] || data[10],
                "currentMode": values.modes[getBinVal(data[11], 0, 3)] || getBinVal(data[11], 0, 3),
                "currentFan": values.fanSpeeds[getBinVal(data[11], 4, 7)] || getBinVal(data[11], 4, 7),
                "sweep": {
                  "enabled": getBinVal(data[12], 0, 3) == 1,
                  "state": getBinVal(data[12], 4, 7)
                }
              };

              return ret;
            },
            generateData: function(data) {
              if (typeof data.number != 'number'){ return "Invalid number: " + data.number + ". Expected a number from 1 to 128"; }
              if (data.number < 1 || data.number > 128){return "Invalid number: " + data.number + ". This is expected to be a number between 1 and 128";}
              return Buffer.from([data.number]);
            }
        },

        broadcast: {
            request: 0x193B,
            answerBack: 0x193B,
            processData: function(data) {
              var values = require("./values.js").list.ACValues;
              var getBinVal = require("./functionList.js").getBinVal;

              var ret = {
                "number":  data[0],
                "temperatureType": values.tempType[data[1]] || data[1],
                "currentTemperature": data[2],
                "setTemperature": {
                  "cooling": data[3],
                  "heating": data[4],
                  "auto": data[5],
                  "dry": data[6],
                },
                "mode": values.modes[getBinVal(data[7], 0, 3)],
                "fan": values.fanSpeeds[getBinVal(data[7], 4, 7)],
                "state": data[8] == 1,
                "setupMode": values.modes[data[9]] || data[9],
                "setupSpeed": values.fanSpeeds[data[10]] || data[10],
                "currentMode": values.modes[getBinVal(data[11], 0, 3)] || getBinVal(data[11], 0, 3),
                "currentFan": values.fanSpeeds[getBinVal(data[11], 4, 7)] || getBinVal(data[11], 4, 7),
                "sweep": {
                  "enabled": getBinVal(data[12], 0, 3) == 1,
                  "state": getBinVal(data[12], 4, 7)
                }
              };

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
