module.exports = {
    status: "Testing",
    name: "AC Control",
    description: "Controls AC units",

    actions: {
        set: {
            request: 0x193A,
            answerBack: 0x193B,
            processData: function(data) {
              var tempType = "unknown";
              if(data[1] == 0){tempType = "C";}else if(data[1] == 1){tempType = "F";}else{tempType = data[1];}
              var ret = {
                "ACNumber": data[0],
                "temperatureType": tempType,
                "currentTemperature": data[2],
                "coolingTemperaturePoint": data[3],
                "heatingTemperaturePoint": data[4],
                "autoTemperaturePoint": data[5],
                "dryTemperaturePoint": data[6],
              }

              //Split mode and fan byte into their parts
              var modeFanBinary = (parseInt(data[7], 16).toString(2)).padStart(8, '0');

              //Get fan
              var fanHex = parseInt(modeFanBinary.split(0, 4), 2).toString(16).toUpperCase();
              var fan = null;
              switch(fanHex) {
                case 0: {fan = "auto"; break; }
                case 1: {fan = "high"; break; }
                case 2: {fan = "medium"; break; }
                case 3: {fan = "low"; break; }
                default: {fan = fanHex; break;}
              }
              ret["fan"] = fan;

              //Get mode
              var modeHex = parseInt(modeFanBinary.split(5, 8), 2).toString(16).toUpperCase();
              var mode = null;
              switch(modeHex) {
                case 0: {mode = "cooling"; break; }
                case 1: {mode = "heating"; break; }
                case 2: {mode = "fan"; break; }
                case 3: {mode = "auto"; break; }
                case 4: {mode = "dry"; break; }
                default: {mode = modeHex; break;}
              }
              ret["mode"] = mode;

              //AC Status
              switch(data[8]) {
                case 0: {ret["ACStatus"] = "off"; break;}
                case 1: {ret["ACStatus"] = "on"; break;}
                default: {ret["ACStatus"] = data[8]; break;}
              }

              //Setup mode
              switch(data[9]) {
                case 0: {ret["SetupMode"] = "cooling"; break;}
                case 1: {ret["SetupMode"] = "heating"; break;}
                case 2: {ret["SetupMode"] = "fan"; break;}
                case 3: {ret["SetupMode"] = "auto"; break;}
                case 4: {ret["SetupMode"] = "dry"; break;}
                default: {ret["SetupMode"] = data[9]; break;}
              }

              //Setup Speed
              switch(data[10]) {
                case 0: {ret["SetupSpeed"] = "auto"; break;}
                case 1: {ret["SetupSpeed"] = "high"; break;}
                case 2: {ret["SetupSpeed"] = "medium"; break;}
                case 3: {ret["SetupSpeed"] = "low"; break;}
                default: {ret["SetupSpeed"] = data[10]; break;}
              }

              //Split mode and fan byte into their parts
              var currentModeFanBinary = (parseInt(data[11], 16).toString(2)).padStart(8, '0');

              //Get fan
              switch(parseInt(currentModeFanBinary.split(0, 4), 2).toString(16).toUpperCase()) {
                case 0: {ret["currentFan"] = "auto"; break; }
                case 1: {ret["currentFan"] = "high"; break; }
                case 2: {ret["currentFan"] = "medium"; break; }
                case 3: {ret["currentFan"] = "low"; break; }
                default: {ret["currentFan"] = parseInt(currentModeFanBinary.split(0, 4), 2).toString(16).toUpperCase(); break;}
              }

              //Get mode
              switch(parseInt(currentModeFanBinary.split(5, 8), 2).toString(16).toUpperCase()) {
                case 0: {ret["currentMode"] = "cooling"; break; }
                case 1: {ret["currentMode"] = "heating"; break; }
                case 2: {ret["currentMode"] = "fan"; break; }
                case 3: {ret["currentMode"] = "auto"; break; }
                case 4: {ret["currentMode"] = "dry"; break; }
                default: {ret["currentMode"] = parseInt(currentModeFanBinary.split(5, 8), 2).toString(16).toUpperCase(); break;}
              }

              //Split sweep byte into their parts
              var sweepBinary = (parseInt(data[12], 16).toString(2)).padStart(8, '0');

              //Get enable sweep
              switch(parseInt(sweepBinary.split(0, 4), 2).toString(16).toUpperCase()) {
                case 0: {ret["sweepEnable"] = "off"; break; }
                case 1: {ret["sweepEnable"] = "on"; break; }
                default: {ret["sweepEnable"] = parseInt(sweepBinary.split(0, 4), 2).toString(16).toUpperCase(); break;}
              }

              //Get sweep
              switch(parseInt(sweepBinary.split(5, 8), 2).toString(16).toUpperCase()) {
                case 0: {ret["sweepNow"] = "off"; break; }
                case 1: {ret["sweepNow"] = "on"; break; }
                default: {ret["sweepNow"] = parseInt(sweepBinary.split(5, 8), 2).toString(16).toUpperCase(); break;}
              }

              return ret;
            },
            generateData: function(data) {
              if (typeof data.ACNumber != 'number' || data.ACNumber < 1 || data.ACNumber > 128) {
                return "Invalid AC number: " + data.ACNumber + ". Expects a number between 1 and 128";
              }
              if (typeof data.coolingTemperaturePoint != 'number' || data.coolingTemperaturePoint < 0 || data.coolingTemperaturePoint > 86) {
                return "Invalid cooling temperature point: " + data.coolingTemperaturePoint + ". Expects a number between 0 and 86";
              }
              if (typeof data.heatingTemperaturePoint != 'number' || data.heatingTemperaturePoint < 0 || data.heatingTemperaturePoint > 86) {
                return "Invalid heating temperature point: " + data.heatingTemperaturePoint + ". Expects a number between 0 and 86";
              }
              if (typeof data.autoTemperaturePoint != 'number' || data.autoTemperaturePoint < 0 || data.autoTemperaturePoint > 86) {
                return "Invalid auto temperature point: " + data.autoTemperaturePoint + ". Expects a number between 0 and 86";
              }
              if (typeof data.dryTemperaturePoint != 'number' || data.dryTemperaturePoint < 0 || data.dryTemperaturePoint > 86) {
                return "Invalid dry temperature point: " + data.dryTemperaturePoint + ". Expects a number between 0 and 86";
              }

              var temperatureType = 0;
              if(data.temperatureType == null || data.temperatureType == undefined) {
                return "Invalid temperature type: " + data.temperatureType + ". Expects 'C' or 'F'";
              }
              switch(data.temperatureType.toLowerCase()) {
                case "c": {temperatureType = 0; break;}
                case "f": {temperatureType = 1; break;}
                default: {
                  return "Invalid temperature type: " + data.temperatureType + ". Expects 'C' or 'F'";
                }
              }

              var mode = 0;
              var fan = 0;
              if(data.mode == null || data.mode == undefined) {
                return "Invalid mode: " + data.mode + ". Expects 'cooling', 'heating', 'fan', 'auto', or 'dry'";
              }
              switch(data.mode.toLowerCase()) {
                case "cooling": {mode = 0; break;}
                case "heating": {mode = 1; break;}
                case "fan": {mode = 2; break;}
                case "auto": {mode = 3; break;}
                case "dry": {mode = 4; break;}
                default: {
                  return "Invalid mode: " + data.mode + ". Expects 'cooling', 'heating', 'fan', 'auto', or 'dry'";
                }
              }

              if(data.fan == null || data.fan == undefined) {
                return "Invalid fan: " + data.fan + ". Expects 'auto', 'high', 'medium', or 'low'";
              }
              switch(data.fan.toLowerCase()) {
                case "auto": {fan = 0; break;}
                case "high": {fan = 1; break;}
                case "medium": {fan = 2; break;}
                case "low": {fan = 3; break;}
                default: {
                  return "Invalid fan: " + data.fan + ". Expects 'auto', 'high', 'medium', or 'low'";
                }
              }
              var encodedModeFanByte = fan + (mode << 5); //may or may not work

              if(data.ACStatus == null || data.ACStatus == undefined) {
                return "Invalid AC status: " + data.ACStatus + ". Expects 'on', or 'off'";
              }
              var acStatus = 0;
              switch(data.ACStatus.toLowerCase()) {
                case "off": {acStatus = 0; break;}
                case "on": {acStatus = 1; break;}
                default: {
                  return "Invalid AC status: " + data.ACStatus + ". Expects 'on', or 'off'";
                }
              }

              if(data.setupMode == null || data.setupMode == undefined) {
                return "Invalid setup mode: " + data.setupMode + ". Expects 'cooling', 'heating', 'fan', 'auto', or 'dry'";
              }
              var setupMode = 0;
              switch(data.setupMode.toLowerCase()) {
                case "cooling": {setupMode = 0; break;}
                case "heating": {setupMode = 1; break;}
                case "fan": {setupMode = 2; break;}
                case "auto": {setupMode = 3; break;}
                case "dry": {setupMode = 4; break;}
                default: {
                  return "Invalid setup mode: " + data.setupMode + ". Expects 'cooling', 'heating', 'fan', 'auto', or 'dry'";
                }
              }

              if(data.setupSpeed == null || data.setupSpeed == undefined) {
                return "Invalid setup speed: " + data.setupSpeed + ". Expects 'auto', 'high', 'medium', or 'low'";
              }
              var setupSpeed = 0;
              switch(data.setupSpeed.toLowerCase()) {
                case "auto": {setupSpeed = 0; break;}
                case "high": {setupSpeed = 1; break;}
                case "medium": {setupSpeed = 2; break;}
                case "low": {setupSpeed = 3; break;}
                default: {
                  return "Invalid setup speed: " + data.setupSpeed + ". Expects 'auto', 'high', 'medium', or 'low'";
                }
              }

              return Buffer.from([data.ACNumber, temperatureType, data.coolingTemperaturePoint, data.heatingTemperaturePoint, data.autoTemperaturePoint, data.dryTemperaturePoint, mode, fan, acStatus, setupMode, setupSpeed]);
            }
        },

        read: {
            request: 0x1938,
            answerBack: 0x1939,
            processData: function(data) {
              var tempType = "unknown";
              if(data[1] == 0){tempType = "C";}else if(data[1] == 1){tempType = "F";}else{tempType = data[1];}
              var ret = {
                "ACNumber": data[0],
                "temperatureType": tempType,
                "currentTemperature": data[2],
                "coolingTemperaturePoint": data[3],
                "heatingTemperaturePoint": data[4],
                "autoTemperaturePoint": data[5],
                "dryTemperaturePoint": data[6],
              }

              //Split mode and fan byte into their parts
              var modeFanBinary = (parseInt(data[7], 16).toString(2)).padStart(8, '0');

              //Get fan
              var fanHex = parseInt(modeFanBinary.split(0, 4), 2).toString(16).toUpperCase();
              var fan = null;
              switch(fanHex) {
                case 0: {fan = "auto"; break; }
                case 1: {fan = "high"; break; }
                case 2: {fan = "medium"; break; }
                case 3: {fan = "low"; break; }
                default: {fan = fanHex; break;}
              }
              ret["fan"] = fan;

              //Get mode
              var modeHex = parseInt(modeFanBinary.split(5, 8), 2).toString(16).toUpperCase();
              var mode = null;
              switch(modeHex) {
                case 0: {mode = "cooling"; break; }
                case 1: {mode = "heating"; break; }
                case 2: {mode = "fan"; break; }
                case 3: {mode = "auto"; break; }
                case 4: {mode = "dry"; break; }
                default: {mode = modeHex; break;}
              }
              ret["mode"] = mode;

              //AC Status
              switch(data[8]) {
                case 0: {ret["ACStatus"] = "off"; break;}
                case 1: {ret["ACStatus"] = "on"; break;}
                default: {ret["ACStatus"] = data[8]; break;}
              }

              //Setup mode
              switch(data[9]) {
                case 0: {ret["SetupMode"] = "cooling"; break;}
                case 1: {ret["SetupMode"] = "heating"; break;}
                case 2: {ret["SetupMode"] = "fan"; break;}
                case 3: {ret["SetupMode"] = "auto"; break;}
                case 4: {ret["SetupMode"] = "dry"; break;}
                default: {ret["SetupMode"] = data[9]; break;}
              }

              //Setup Speed
              switch(data[10]) {
                case 0: {ret["SetupSpeed"] = "auto"; break;}
                case 1: {ret["SetupSpeed"] = "high"; break;}
                case 2: {ret["SetupSpeed"] = "medium"; break;}
                case 3: {ret["SetupSpeed"] = "low"; break;}
                default: {ret["SetupSpeed"] = data[10]; break;}
              }

              //Split mode and fan byte into their parts
              var currentModeFanBinary = (parseInt(data[11], 16).toString(2)).padStart(8, '0');

              //Get fan
              switch(parseInt(currentModeFanBinary.split(0, 4), 2).toString(16).toUpperCase()) {
                case 0: {ret["currentFan"] = "auto"; break; }
                case 1: {ret["currentFan"] = "high"; break; }
                case 2: {ret["currentFan"] = "medium"; break; }
                case 3: {ret["currentFan"] = "low"; break; }
                default: {ret["currentFan"] = parseInt(currentModeFanBinary.split(0, 4), 2).toString(16).toUpperCase(); break;}
              }

              //Get mode
              switch(parseInt(currentModeFanBinary.split(5, 8), 2).toString(16).toUpperCase()) {
                case 0: {ret["currentMode"] = "cooling"; break; }
                case 1: {ret["currentMode"] = "heating"; break; }
                case 2: {ret["currentMode"] = "fan"; break; }
                case 3: {ret["currentMode"] = "auto"; break; }
                case 4: {ret["currentMode"] = "dry"; break; }
                default: {ret["currentMode"] = parseInt(currentModeFanBinary.split(5, 8), 2).toString(16).toUpperCase(); break;}
              }

              //Split sweep byte into their parts
              var sweepBinary = (parseInt(data[12], 16).toString(2)).padStart(8, '0');

              //Get enable sweep
              switch(parseInt(sweepBinary.split(0, 4), 2).toString(16).toUpperCase()) {
                case 0: {ret["sweepEnable"] = "off"; break; }
                case 1: {ret["sweepEnable"] = "on"; break; }
                default: {ret["sweepEnable"] = parseInt(sweepBinary.split(0, 4), 2).toString(16).toUpperCase(); break;}
              }

              //Get sweep
              switch(parseInt(sweepBinary.split(5, 8), 2).toString(16).toUpperCase()) {
                case 0: {ret["sweepNow"] = "off"; break; }
                case 1: {ret["sweepNow"] = "on"; break; }
                default: {ret["sweepNow"] = parseInt(sweepBinary.split(5, 8), 2).toString(16).toUpperCase(); break;}
              }

              return ret;
            },
            generateData: function(data) {
              if (typeof data.ACNumber != 'number'){ return "Invalid AC number: " + data.ACNumber + ". Expected a number from 1 to 128"; }
              if (data.ACNumber < 1 || data.ACNumber > 128){return "Invalid AC number: " + data.ACNumber + ". This is expected to be a number between 1 and 128";}
              return Buffer.from([data.ACNumber]);
            }
        },

        broadcast: {
            request: 0x193B,
            answerBack: 0x193B,
            processData: function(data) {
              var tempType = "unknown";
              if(data[1] == 0){tempType = "C";}else if(data[1] == 1){tempType = "F";}else{tempType = data[1];}
              var ret = {
                "ACNumber": data[0],
                "temperatureType": tempType,
                "currentTemperature": data[2],
                "coolingTemperaturePoint": data[3],
                "heatingTemperaturePoint": data[4],
                "autoTemperturePoint": data[5],
                "dryTemperaturePoint": data[6],
              }

              //Split mode and fan byte into their parts
              var modeFanBinary = (parseInt(data[7], 16).toString(2)).padStart(8, '0');

              //Get fan
              var fanHex = parseInt(modeFanBinary.split(0, 4), 2).toString(16).toUpperCase();
              var fan = null;
              switch(fanHex) {
                case 0: {fan = "auto"; break; }
                case 1: {fan = "high"; break; }
                case 2: {fan = "medium"; break; }
                case 3: {fan = "low"; break; }
                default: {fan = fanHex; break;}
              }
              ret["fan"] = fan;

              //Get mode
              var modeHex = parseInt(modeFanBinary.split(5, 8), 2).toString(16).toUpperCase();
              var mode = null;
              switch(modeHex) {
                case 0: {mode = "cooling"; break; }
                case 1: {mode = "heating"; break; }
                case 2: {mode = "fan"; break; }
                case 3: {mode = "auto"; break; }
                case 4: {mode = "dry"; break; }
                default: {mode = modeHex; break;}
              }
              ret["mode"] = mode;

              //AC Status
              switch(data[8]) {
                case 0: {ret["ACStatus"] = "off"; break;}
                case 1: {ret["ACStatus"] = "on"; break;}
                default: {ret["ACStatus"] = data[8]; break;}
              }

              //Setup mode
              switch(data[9]) {
                case 0: {ret["SetupMode"] = "cooling"; break;}
                case 1: {ret["SetupMode"] = "heating"; break;}
                case 2: {ret["SetupMode"] = "fan"; break;}
                case 3: {ret["SetupMode"] = "auto"; break;}
                case 4: {ret["SetupMode"] = "dry"; break;}
                default: {ret["SetupMode"] = data[9]; break;}
              }

              //Setup Speed
              switch(data[10]) {
                case 0: {ret["SetupSpeed"] = "auto"; break;}
                case 1: {ret["SetupSpeed"] = "high"; break;}
                case 2: {ret["SetupSpeed"] = "medium"; break;}
                case 3: {ret["SetupSpeed"] = "low"; break;}
                default: {ret["SetupSpeed"] = data[10]; break;}
              }

              //Split mode and fan byte into their parts
              var currentModeFanBinary = (parseInt(data[11], 16).toString(2)).padStart(8, '0');

              //Get fan
              switch(parseInt(currentModeFanBinary.split(0, 4), 2).toString(16).toUpperCase()) {
                case 0: {ret["currentFan"] = "auto"; break; }
                case 1: {ret["currentFan"] = "high"; break; }
                case 2: {ret["currentFan"] = "medium"; break; }
                case 3: {ret["currentFan"] = "low"; break; }
                default: {ret["currentFan"] = parseInt(currentModeFanBinary.split(0, 4), 2).toString(16).toUpperCase(); break;}
              }

              //Get mode
              switch(parseInt(currentModeFanBinary.split(5, 8), 2).toString(16).toUpperCase()) {
                case 0: {ret["currentMode"] = "cooling"; break; }
                case 1: {ret["currentMode"] = "heating"; break; }
                case 2: {ret["currentMode"] = "fan"; break; }
                case 3: {ret["currentMode"] = "auto"; break; }
                case 4: {ret["currentMode"] = "dry"; break; }
                default: {ret["currentMode"] = parseInt(currentModeFanBinary.split(5, 8), 2).toString(16).toUpperCase(); break;}
              }

              //Split sweep byte into their parts
              var sweepBinary = (parseInt(data[12], 16).toString(2)).padStart(8, '0');

              //Get enable sweep
              switch(parseInt(sweepBinary.split(0, 4), 2).toString(16).toUpperCase()) {
                case 0: {ret["sweepEnable"] = "off"; break; }
                case 1: {ret["sweepEnable"] = "on"; break; }
                default: {ret["sweepEnable"] = parseInt(sweepBinary.split(0, 4), 2).toString(16).toUpperCase(); break;}
              }

              //Get sweep
              switch(parseInt(sweepBinary.split(5, 8), 2).toString(16).toUpperCase()) {
                case 0: {ret["sweepNow"] = "off"; break; }
                case 1: {ret["sweepNow"] = "on"; break; }
                default: {ret["sweepNow"] = parseInt(sweepBinary.split(5, 8), 2).toString(16).toUpperCase(); break;}
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
