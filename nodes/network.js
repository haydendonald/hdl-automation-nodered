/*
The main network node for the bus communication.

This node needs to be referenced by other nodes in order to communicate correctly. 
The following functions are supported:

-   send(command, targetSubnetID, targetDeviceID, Contents, answerbackHandler(command, receivedSubnetID, receivedDeviceID, contents))
-   addIncomingHandler(handler(command, receivedSubnetID, receivedDeviceID, contents))

*/

var util = require('util');
var isBuffer = Buffer.isBuffer;
var udp = require('dgram');
var crc = require('crc').crc16xmodem;

module.exports = function(RED)
{
    //Main node definition
    function HDLNetwork(config)
    {
        RED.nodes.createNode(this, config);
        var node = this;
        node.localSubnet = config.localSubnet;
        node.localDeviceId = config.localDeviceId;
        node.ipAddress = config.ipAddress;
        node.localIpAddress = config.localIpAddress;
        node.checkIP = config.checkIP;
        node.port = config.port;
        node.msgFunctionCallbacks = [];
        node.server = connect(node, node.server, config.ipAddress, config.port);
        
		//When the flows are stopped
        this.on("close", function() {
            this.server.close();
        });
    }

    //Add the node
    RED.nodes.registerType("hdlautomation-network", HDLNetwork);

    module.exports = {
        addStatusCallback: function(node, func) {
            node.msgFunctionCallbacks.push(func);
        }
    }
}

//Attempt connection to the HDL controller
function connect(node, server, ipAddress, port)
{
    if(server){server.close();}
    //If already open, close before reconnecting
    
    server = udp.createSocket('udp4');

    server.on('error', function(err) {
        node.log("Error On HDL Network: " + err);
    });

    server.bind(port);

    return server;
}

//Send a status to all other nodes that are subscribed to the status updates
function sendStatus(node, colour, message) {
    for(var i = 0; i < node.msgFunctionCallbacks.length; i++) {
        node.msgFunctionCallbacks[i](colour, message);
    }
}