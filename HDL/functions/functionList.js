module.exports = {
    list: {
        sceneControl: require("./sceneControl.js"),
        UVSwitch: require("./UVSwitch.js"),
        dateTime: require("./dateTime.js"),
        sequenceControl: require("./sequenceControl.js"),
        panelControl: require("./panelControl.js")
    },

    //Find the opCode of a function
    findOpCode: function(func, mode, direction) {
        for(var key in this.list) {
            if(key == func) {
                //Found the functions loop though the actions and find it
                for(var key2 in this.list[key].actions) {
                    if(key2 == mode) {
                        return this.list[key].actions[key2][direction];
                    }
                }
            }
        }
    },

    //Find a function based on its command
    findCommand: function(command) {
        var name = "unknown";
        var description = "unknown";
        var status = "unknown";
        var actions = null;
        var operate = "unknown";
        var mode = "unknown";
        var direction = "unknown";
        var replyCode = "unknown";

        //Loop though all possible functions and find the relevent codes
        for(var key in this.list) {
            for(var key2 in this.list[key].actions) {
                for(var key3 in this.list[key].actions[key2]) {
                    if(this.list[key].actions[key2][key3] == command) {
                        name = this.list[key].name;
                        description = this.list[key].description;
                        status = this.list[key].status;
                        actions = this.list[key].actions;
                        operate = key;
                        mode = key2;
                        direction = key3
                        replyCode = this.list[key].actions[key2].answerBack;
                        break;
                    }
                }
            }
         }

         if(name == "unknown"){return null;}
         if(actions == null){return null;}
         if(operate == "unknown"){return null;}
         if(mode == "unknown"){return null;}
         if(direction == "unknown"){return null;}
         if(replyCode == "unknown"){return null;}

         return {
             "operate": operate,
             "name": name,
             "description": description,
             "status": status,
             "mode": mode,
             "direction": direction,
             "actions": actions,
             "replyCode": replyCode
         }
    },

    generateContentsFromData: function(command, data) {
        for(var key in this.list) {
            for(var key2 in this.list[key].actions) {
                for(var key3 in this.list[key].actions[key2]) {
                    if(this.list[key].actions[key2][key3] == command) {
                        return this.list[key].actions[key2].generateData(data);
                    }
                }
            }
        }
    },

    //Find the reply code for a function
    findReplyCode: function(command) {
        for(var key in this.list) {
            for(var key2 in this.list[key].actions) {
                if(this.list[key].actions[key2].request == command) {
                    return this.list[key].actions[key2].answerBack;
                }
                if(this.list[key].actions[key2].answerBack == command) {
                    return this.list[key].actions[key2].request;
                }
            }
        }
        return 0x00;
    }
}
