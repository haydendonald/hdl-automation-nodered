module.exports = {
    list: {
        sceneControl: require("./sceneControl.js")
    },

    //Find a function based on its command
    findCommand: function(command) {
        var func = null;
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
                if(this.list[key].actions[key2].request == command) {
                    name = this.list[key].name;
                    description = this.list[key].description;
                    status = this.list[key].status;
                    actions = this.list[key].actions;
                    operate = key;
                    mode = key2;
                    direction = "request";
                    replyCode = this.list[key].actions[key2].answerBack;
                    break;
                }
                if(this.list[key].actions[key2].answerBack == command) {
                    name = this.list[key].name;
                    description = this.list[key].description;
                    status = this.list[key].status;
                    actions = this.list[key].actions;
                    operate = key;
                    mode = key2;
                    direction = "answerBack";
                    replyCode = this.list[key].actions[key2].request;
                    break;
                }
            }
         }

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