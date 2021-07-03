module.exports = {
  status: "Stable",
  name: "Panel Control",
  description: "Panel control controls a wall panel",

  actions: {
    set: {
      request: 0xE3D8,
      answerBack: 0xE3D9,
      processData: function (data) {
        var functions = require("./values.js").list.PanelValues;
        for(var i in functions) {
          if(functions[i].cmd == data[0]) {
            return {
              "function": i,
              "value": functions[i].process(data) || data
            }
          }
        }
      },
      generateData: function (data) {
        var functions = require("./values.js").list.PanelValues;

        //Find the function
        var func = functions[data.function];
        if(func === undefined){return "Invalid function";}

        //Get the value array
        var value = func.set(data.value);
        if(value === undefined){return "Invalid value";}
        return Buffer.concat([Buffer.from([func.cmd]), Buffer.from(value)]);
      }
    },

    get: {
      request: 0xE3DA,
      answerBack: 0xE3DB,
      processData: function (data) {
        var functions = require("./values.js").list.PanelValues;
        for(var i in functions) {
          if(functions[i].cmd == data[0]) {
            return {
              "function": i,
              "value": functions[i].process(data) || data
            }
          }
        }
      },
      generateData: function (data, func) {
        var functions = require("./values.js").list.PanelValues;

        //Find the function
        var func = functions[data.function];
        if(func === undefined){return "Invalid function";}
        return Buffer.concat([Buffer.from([func.cmd]), Buffer.from(func.get(data))]);
      }
  },

  broadcast: {
    request: 0xFFFF,
    answerBack: 0xFFFF,
    processData: function (data, func) {
      return null;
    },
    generateData: function (data, func) {
      return null;
    }
  }
}  
}
