module.exports = {
    status: "Testing",
    name: "Panel Control",
    description: "Panel control controls a wall panel",

    actions: {
        set: {
            request: 0xE3D8,
            answerBack: 0xE3D9,
            processData: function(data) {
              var functions = require("./values.js").list.PanelValues;

              var func = functions[data[0]];
              //console.log(func);

              if(func === undefined) {
                return {
                  "function": data[0],
                  "value": data
                }
              }
              else {
                console.log(func.name);
                console.log(func.process);
                console.log({
                  "function": func.name || data[0],
                  "value": func.process(data) || data
                });
              }
            },
            generateData: function(data) {
              var functions = require("./values.js").list.PanelValues;
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
            processData: function(data) {
              var functions = require("./values.js").list.PanelValues;

              var func = functions[data[0]];
              //console.log(func);

              if(func === undefined) {
                return {
                  "function": data[0],
                  "value": data
                }
              }
              else {
                console.log(func.name);
                console.log(func.process);
                console.log({
                  "function": func.name || data[0],
                  "value": func.process(data) || data
                });
              }
            },
            generateData: function(data, func) {
              var functions = require("./values.js").list.PanelValues;
              var func = undefined;
              var values = [];

              //Find the function
              for(var i in functions) {
                if(functions[i].name == data.function){func = parseInt(i); break;}
              }
              if(func === undefined){return "Could not find the function: " + data.function;}

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
