module.exports = function(RED)
{
    //Main Function
    function HDLDevice(config)
    {
        RED.nodes.createNode(this, config);
        var deviceHandler = RED.nodes.getNode(config.deviceHandler);
        var name = config.name;
        var node = this;
        var information = {
            "name": name,
            "type": node.type,
            "deviceHandler": deviceHandler.information
        }
        
        //Check all relevent variables are present
        if(deviceHandler == null) {node.error("[Critical] - Device handler is not set");}

        node.status({fill:"red",shape:"dot",text:"Not Connected"});

        //Display the statuses of the device
        deviceHandler.addStatusCallback(function(colour, message) {
            node.sendStatus(colour, message);
        });

        node.sendStatus = function(colour, message) {
            node.status({fill:colour,shape:"dot",text:message});
        }

        //When a request is received on the input
        this.on("input", function(msg) {
            
        });

        //Add the node information to the msg object
        node.sendMessage = function(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdl-device", HDLDevice);
}