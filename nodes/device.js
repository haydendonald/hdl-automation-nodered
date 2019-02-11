module.exports = function(RED)
{
    //Main Function
    function HDLDevice(config)
    {
        RED.nodes.createNode(this, config);
        console.log(RED.nodes.getNode(config.deviceHandler));
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

        node.status({fill:"gray",shape:"dot",text:"Waiting"});

        //Display the statuses of the device
        deviceHandler.addStatusCallback(function(colour, message) {
            node.status({fill:colour,shape:"dot",text:message});
        });

        //When a request is received on the input
        this.on("input", function(msg) {
            sendMessage(msg);
        });

        //Add the node information to the msg object
        function sendMessage(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdlautomation-device", HDLDevice);
}