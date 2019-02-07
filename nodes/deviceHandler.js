module.exports = function(RED)
{
    //Main Function
    function HDLDeviceHandler(config)
    {
        RED.nodes.createNode(this, config);
        this.network = RED.nodes.getNode(config.network);
        this.type = config.type;
        this.subnetId = config.subnetId;
        this.deviceId = config.deviceId;
        var node = this;
        node.msgFunctionCallbacks = [];

        //Pass all network statuses to the subscribed nodes
        node.network.addStatusCallback(node.network, function(colour, message) {
            sendStatus(node, colour, message);
        });

        node.on("close", function() {
        }
    );
    }

    RED.nodes.registerType("hdlautomation-deviceHandler", HDLDeviceHandler);

    module.exports = {
        addStatusCallback: function(node, func) {
            node.msgFunctionCallbacks.push(func);
        }
    }
}

//Send a status to all other nodes that are subscribed to the status updates
function sendStatus(node, colour, message) {
    for(var i = 0; i < node.msgFunctionCallbacks.length; i++) {
        node.msgFunctionCallbacks[i](colour, message);
    }
}