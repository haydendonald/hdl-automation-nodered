module.exports = {
    status: "Testing",
    name: "AC Control",
    description: "Controls AC units",

    actions: {
        set: {
            request: 0x193A,
            answerBack: 0x193B,
            processData: function(data) {
              var values = require("./values.js").list.ACValues;

              var getBinVal = function(input, from, to) {
                var bin = (input >>> 0).toString(2).padStart(8, '0');
                var splitBin = bin.substring(from, to + 1).padStart(8, '0');
                return parseInt(splitBin, 2);
              }


              var ret = {
                "number":  data[0],
                "temperatureType": values.tempType[data[1]],
                "currentTemperature": data[2],
                "setTemperature": {
                  "cooling": data[3],
                  "heating": data[4],
                  "auto": data[5],
                  "dry": data[6],
                },
                "mode": values.modes[getBinVal(data[7], 0, 3)],
                "fan": values.fanSpeeds[getBinVal(data[7], 4, 7)],
                "state": data[8],
                "setupMode": data[9],
                "setupSpeed": data[10],
                "currentMode": values.modes[getBinVal(data[11], 0, 3)],
                "currentFan": values.fanSpeeds[getBinVal(data[11], 4, 7)],
                "sweep": {
                  "enabled": getBinVal(data[12], 0, 3) == 1,
                  "state": getBinVal(data[12], 4, 7)
                }
              };

              return ret;
            },
            generateData: function(data, originalMsg, requester) {
              var values = require("./values.js").list.ACValues;

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
                    console.log(result);
                    var buffer = result.payload.contents;
                    console.log(data);

                    if(data.temperatureType !== undefined) {
                      for(var i in values.tempType) {
                        if(values.tempType[i] == data.temperatureType){buffer[1] = parseInt(i); break;}
                      }
                    }
                    if(data.currentTemperature !== undefined) {
                      if(typeof(data.currentTemperature) != "number" || data.currentTemperature < 0 || data.currentTemperature > 99){reject("Invalid current temperature. Must be a number between 0 and 99"); return;}
                      data[2] = parseInt(data.currentTemperature);
                    }
                    if(data.setTemperature !== undefined) {
                      if(data.setTemperature.cooling !== undefined) {
                        if(typeof(data.setTemperature.cooling) != "number" || data.setTemperature.cooling < 0 || data.setTemperature.cooling > 86){reject("Invalid set temperature (cooling). Must be a number between 0 and 86"); return;}
                         data[3] = parseInt(data.data.setTemperature.cooling);
                      }
                      if(data.setTemperature.heating !== undefined) {
                        if(typeof(data.setTemperature.heating) != "number" || data.setTemperature.heating < 0 || data.setTemperature.heating > 86){reject("Invalid set temperature (heating). Must be a number between 0 and 86"); return;}
                         data[4] = parseInt(data.data.setTemperature.heating);
                      }
                      if(data.setTemperature.auto !== undefined) {
                        if(typeof(data.setTemperature.auto) != "number" || data.setTemperature.auto < 0 || data.setTemperature.auto > 86){reject("Invalid set temperature (auto). Must be a number between 0 and 86"); return;}
                         data[5] = parseInt(data.data.setTemperature.auto);
                      }
                      if(data.setTemperature.dry !== undefined) {
                        if(typeof(data.setTemperature.dry) != "number" || data.setTemperature.dry < 0 || data.setTemperature.dry > 86){reject("Invalid set temperature (dry). Must be a number between 0 and 86"); return;}
                         data[6] = parseInt(data.data.setTemperature.dry);
                      }
                    }

                    
                    if(data.mode !== undefined) {
                      //TODO
                    }
                    if(data.fan !== undefined) {
                      //TODO
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
                    if(data.currentMode !== undefined) {
                      //TODO
                    }
                    if(data.currentFan !== undefined) {
                      //TODO
                    }
                    if(data.sweep !== undefined) {
                      //TODO
                    }

                    console.log(buffer);
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

              var getBinVal = function(input, from, to) {
                var bin = (input >>> 0).toString(2).padStart(8, '0');
                var splitBin = bin.substring(from, to + 1).padStart(8, '0');
                return parseInt(splitBin, 2);
              }

              var ret = {
                "number":  data[0],
                "temperatureType": values.tempType[data[1]],
                "currentTemperature": data[2],
                "setTemperature": {
                  "cooling": data[3],
                  "heating": data[4],
                  "auto": data[5],
                  "dry": data[6],
                },
                "mode": values.modes[getBinVal(data[7], 0, 3)],
                "fan": values.fanSpeeds[getBinVal(data[7], 4, 7)],
                "state": data[8],
                "setupMode": data[9],
                "setupSpeed": data[10],
                "currentMode": values.modes[getBinVal(data[11], 0, 3)],
                "currentFan": values.fanSpeeds[getBinVal(data[11], 4, 7)],
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

              var getBinVal = function(input, from, to) {
                var bin = (input >>> 0).toString(2).padStart(8, '0');
                var splitBin = bin.substring(from, to + 1).padStart(8, '0');
                return parseInt(splitBin, 2);
              }

              console.log(data[7]);

              var ret = {
                "number":  data[0],
                "temperatureType": values.tempType[data[1]],
                "currentTemperature": data[2],
                "setTemperature": {
                  "cooling": data[3],
                  "heating": data[4],
                  "auto": data[5],
                  "dry": data[6],
                },
                "mode": values.modes[getBinVal(data[7], 0, 3)],
                "fan": values.fanSpeeds[getBinVal(data[7], 4, 7)],
                "state": data[8],
                "setupMode": data[9],
                "setupSpeed": data[10],
                "currentMode": values.modes[getBinVal(data[11], 0, 3)],
                "currentFan": values.fanSpeeds[getBinVal(data[11], 4, 7)],
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
