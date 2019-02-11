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
var ping = require("ping");

module.exports = function(RED)
{
    //Main node definition
    function HDLNetwork(config)
    {
        RED.nodes.createNode(this, config);
        var node = this;
        var name = config.name;
        var localSubnet = config.localSubnet;
        var localDeviceId = config.localDeviceId;
        var ipAddress = config.ipAddress;
        var localIpAddress = config.localIpAddress;
        var checkIP = config.checkIP;
        var port = config.port;
        var msgFunctionCallbacks = [];
        var connected = false;
        var server = connect(server, config.ipAddress, config.port);
        node.information = {
            "name": name,
            "type": node.type,
            "localSubnet": localSubnet,
            "localDeviceId": localDeviceId,
            "ipAddress": ipAddress,
            "localIpAddress": localIpAddress,
            "checkIP": checkIP,
            "port": port,
            "connected": connected
        }
        
		//When the flows are stopped
        this.on("close", function() {
            server.close();
            clearInterval(pingInterval);
        });

        //Check for missing variables
        if(localSubnet == null) {node.error("[Critical] - Local subnet is not set");}
        if(localDeviceId == null) {node.error("[Critical] - Local device id is not set");}
        if(ipAddress == null) {node.error("[Critical] - IP Address is not set");}
        if(localIpAddress == null) {node.error("[Critical] - Local ip address is not set");}
        if(checkIP == null) {node.error("[Critical] - Check IP is not set");}
        if(port == null) {node.error("[Critical] - Port is not set");}
        if(server == null) {node.error("[Critical] - Server is not set");}
        
        //Initally check if we have a successful connection
        checkConnection(function(status) {
            if(status) {
                sendStatus("green", "Connected!");
                node.log("Successfully connected to the HDL network @ " + ipAddress);
                connected = true;
            }
            else {
                sendStatus("red", "Failed to connect");
                node.error("Failed to connect to HDL network @ " + ipAddress + " you may receive messages but sending will fail");
                connected = false;
            }

            //Update the information variable
            node.information.connected = connected;
        });
       
        //When the server is open ping the IP address every minute to determine connection status
        var pingInterval = setInterval(function() {
            checkConnection(function(status) {
                if(status) {
                    connected = true;
                }
                else {
                    sendStatus("red", "Lost Connection");
                    node.error("Lost connection to HDL network @ " + ipAddress);
                    connected = false;
                }

                //Update the information variable
                node.information.connected = connected;
            });
        }, 60000);

        //Pings the server, returns true if connected
        function checkConnection(func) {
            ping.sys.probe(ipAddress, function(status) {
                func(status);
            });
        }

        //Send a message to the HDL bus
        //answerbackHandler = function(command, receivedSubnetID, receivedDeviceID, contents)
        node.send = function(command, targetSubnetID, targetDeviceID, Contents, answerbackHandler) {

        }

        //Attempt connection to the HDL controller
        function connect(ipAddress, port)
        {
            if(server){server.close();}
            //If already open, close before reconnecting
            
            server = udp.createSocket('udp4');

            server.on('error', function(err) {
                node.error("An Error Occured: " + err);
            });

            server.bind(port);

            return server;
        }

        //Send a status to all other nodes that are subscribed to the status updates
        function sendStatus(colour, message) {
            for(var i = 0; i < msgFunctionCallbacks.length; i++) {
                msgFunctionCallbacks[i](colour, message);
            }
        }

        //External functions
        node.addStatusCallback = function(func) {
            msgFunctionCallbacks.push(func);
        }
    }

    //Add the node
    RED.nodes.registerType("hdlautomation-network", HDLNetwork);
}