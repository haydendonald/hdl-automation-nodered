module.exports = function(RED)
{
    //Main Function
    function DeviceHandler(config)
    {
        RED.nodes.createNode(this, config);
        var network = RED.nodes.getNode(config.network);
        var node = this;
        var name = config.name;
        var subnetId = config.subnetId;
        var deviceId = config.deviceId;
        node.information = {
            "name": name,
            "type": node.type,
            "subnetId": subnetId,
            "deviceId": deviceId
        };
        var msgFunctionCallbacks = [];
        var hdlMessageCallbacks = [];

        //Check all relevent variables are present
        if(network == null) {node.error("[Critical] - HDL network is not set"); return;}
        if(subnetId == null) {node.error("[Critical] - Subnet ID is not set"); return;}
        if(deviceId == null) {node.error("[Critical] - Device ID is not set"); return;}

        //Pass all network statuses to the subscribed nodes
        network.addStatusCallback(function(colour, message, extraInformation) {
            node.sendStatus(colour, message, extraInformation);
        });

        //Handle incoming HDL messages
        network.addHDLMessageCallback(function(packet, sentTo) {
          var wasSentByDevice = (packet.payload.sender.subnetId == subnetId && packet.payload.sender.deviceId == deviceId);
          for(var i = 0; i < hdlMessageCallbacks.length; i++) {
            hdlMessageCallbacks[i](packet, sentTo, wasSentByDevice);
          }
        });

        node.on("close", function() {
        });

        //Send a status to all other nodes that are subscribed to the status updates (Appears on the flow)
        node.sendStatus = function(colour, message, extraInformation = "none") {
            for(var i = 0; i < msgFunctionCallbacks.length; i++) {
                msgFunctionCallbacks[i](colour, message, extraInformation);
            }
        }

        //Add callback methods
        node.addStatusCallback = function(func) {msgFunctionCallbacks.push(func);}
        node.addHDLMessageCallback = function(func) {hdlMessageCallbacks.push(func);}
    }

    RED.nodes.registerType("hdl-deviceHandler", DeviceHandler);
}
