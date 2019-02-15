module.exports = function(RED)
{
    //Main Function
    function DeviceHandler(config)
    {
        RED.nodes.createNode(this, config);
        var network = RED.nodes.getNode(config.network);
        var node = this;
        var name = config.name;
        var deviceType = config.deviceType;
        var subnetId = config.subnetId;
        var deviceId = config.deviceId;
        node.information = {
            "name": name,
            "type": node.type,
            "deviceType": deviceType,
            "subnetId": subnetId,
            "deviceId": deviceId
        };
        var msgFunctionCallbacks = [];

        //Check all relevent variables are present
        if(network == null) {node.error("[Critical] - HDL network is not set"); return;}
        if(deviceType == null) {node.error("[Critical] - Device Type is not set"); return;}
        if(subnetId == null) {node.error("[Critical] - Subnet ID is not set"); return;}
        if(deviceId == null) {node.error("[Critical] - Device ID is not set"); return;}

        //Pass all network statuses to the subscribed nodes
        network.addStatusCallback(function(colour, message, extraInformation) {
            node.sendStatus(colour, message, extraInformation);
        });

        node.on("close", function() {
        });

        //Send a status to all other nodes that are subscribed to the status updates (Appears on the flow)
        node.sendStatus = function(colour, message, extraInformation = "none") {
            for(var i = 0; i < msgFunctionCallbacks.length; i++) {
                msgFunctionCallbacks[i](colour, message, extraInformation);
            }
        }

        //External functions
        node.addStatusCallback = function(func) {
            msgFunctionCallbacks.push(func);
        }
    }

    RED.nodes.registerType("hdl-deviceHandler", DeviceHandler);
}