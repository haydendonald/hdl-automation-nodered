/*
The main network node for the bus communication.

This node needs to be referenced by other nodes in order to communicate correctly. 
The following functions are supported:

-   send(command, targetSubnetID, targetDeviceID, Contents, answerbackHandler(command, receivedSubnetID, receivedDeviceID, contents))
-   addIncomingHandler(handler(command, receivedSubnetID, receivedDeviceID, contents))

*/
var debug = true;

var util = require('util');
var isBuffer = Buffer.isBuffer;
var udp = require('dgram');
var crc = require('crc').crc16xmodem;
var ping = require("ping");

var functions = require("../devices/functions/functionList.js");
var devices = require("../devices/deviceList.js");

module.exports = function(RED)
{
    //Main node definition
    function HDLNetwork(config)
    {
        //Debug startup
        if(debug) {
            console.log("-------------- Functions --------------");
            for(var key in functions) {
                console.log(functions[key].name + "[" + key + "]" + " - " + functions[key].description + " (" + functions[key].status + ")");
             }
            console.log("");
            console.log("-------------- Devices --------------");
             for(var key in devices) {
                 console.log(devices[key].name + "[" + key + "]" + " - " + devices[key].description + " (" + devices[key].status + ")");
                 console.log("  Functions: ");
                 for(var key2 in devices[key].functions) {
                    console.log("   " + devices[key].functions[key2].name + "[" + key + "]" + " - " + devices[key].functions[key2].description + " (" + devices[key].functions[key2].status + ")");
                 }
                 console.log("");
              }
        }

        RED.nodes.createNode(this, config);
        var node = this;
        var name = config.name;
        var localSubnet = config.localSubnet;
        var localDeviceId = config.localDeviceId;
        var ipAddress = config.ipAddress;
        var localIpAddress = config.localIpAddress;
        var checkIP = config.checkIP;
        var port = config.port;
        var connected = false;
        var server = connect(ipAddress, port);
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

        var hdlMessageCallback = [];
        var msgFunctionCallbacks = [];
        var sendBuffer = [];
        var recieveBuffer = [];

		//When the flows are stopped
        this.on("close", function() {
            server.close();
            clearInterval(pingInterval);
            clearInterval(sendInterval);
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
                node.sendStatus("green", "Connected!");
                node.log("Successfully connected to the HDL network @ " + ipAddress + ":" + port);
                connected = true;
            }
            else {
                node.sendStatus("red", "Failed to connect");
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

        var sendInterval = setInterval(function() {processSendBuffer();}, 1000);

        //Pings the server, returns true if connected
        function checkConnection(func) {
            ping.sys.probe(ipAddress, function(status) {
                func(status);
            });
        }

        //Send a message to the HDL bus
        //answerbackHandler = function(command, receivedSubnetID, receivedDeviceID, contents)
        node.send = function(sender, command, targetSubnetID, targetDeviceID, contents, answerbackHandler) {
            //Validate
            if(!/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(localIpAddress)){
                node.error("Invalid Local IP Address: " + localIpAddress);
                node.sendStatus("red", "Internal Error", "Invalid IP Address");
                return false;
            }
            if(typeof targetSubnetID != 'number'){
                node.error("Invalid Subnet ID: " + targetSubnetID);
                node.sendStatus("red", "Internal Error", "Invalid Subnet ID");
                return false;
            }
            if(typeof targetDeviceID != 'number'){
                node.error("Invalid Device ID: " + targetDeviceID);
                node.sendStatus("red", "Internal Error", "Invalid Device ID");
                return false;
            }
            if(!Buffer.isBuffer(contents)){
                node.error("Invalid Contents Buffer: " + contents);
                node.sendStatus("red", "Internal Error", "Invalid Contents");
                return false;
            }
            if(localSubnet < 0 || localSubnet > 254) {
                node.error("Local subnet ID out of range: " + localSubnet);
                node.sendStatus("red", "Internal Error", "Out of Range Parameter");
                return false;
            }
            if(localDeviceId < 0 || localDeviceId > 254) {
                node.error("Local device ID out of range: " + localDeviceId);
                node.sendStatus("red", "Internal Error", "Out of Range Parameter");
                return false;
            }
            if(command < 0 || command > 65535) {
                node.error("Command out of range: " + command);
                node.sendStatus("red", "Internal Error", "Out of Range Parameter");
                return false;
            }    
            if(targetDeviceID < 0 || targetDeviceID > 254) {
                node.error("Target device ID out of range: " + targetDeviceID);
                node.sendStatus("red", "Internal Error", "Out of Range Parameter");
                return false;
            }
            if(targetSubnetID < 0 || targetSubnetID > 254) {
                node.error("Target subnet ID out of range: " + targetSubnetID);
                node.sendStatus("red", "Internal Error", "Out of Range Parameter");
                return false;
            }
            if(targetDeviceID < 0 || targetDeviceID > 254) {
                node.error("Target device ID out of range: " + targetDeviceID);
                node.sendStatus("red", "Internal Error", "Out of Range Parameter");
                return false;
            }      

            //Create the ip address buffer
            var ipBuffer = new Buffer.alloc(4);
            ipBuffer.writeUInt8(localIpAddress.split('.')[0], 0);
            ipBuffer.writeUInt8(localIpAddress.split('.')[1], 1);
            ipBuffer.writeUInt8(localIpAddress.split('.')[2], 2);
            ipBuffer.writeUInt8(localIpAddress.split('.')[3], 3);

            //Constant buffer
            var constBuffer = new Buffer.from("HDLMIRACLE");
            var leadBuffer = new Buffer.alloc(2);
            leadBuffer.writeUInt16BE(0xAAAA);

            //Data buffer
            //Calculate the length of the packet
            var length = 11;
            var localDeviceType = 0xFFFE;
            if(contents){length += contents.length;}
            if(length < 0 || length > 78) {
                node.error("Data package size incorrect: " + length);
                sendStatus("red", "Internal Error", "Data package size incorrect");
                return false;
            }      
            
            var dataBuffer = new Buffer.alloc(11);
            dataBuffer.writeUInt8(length, 2);
            dataBuffer.writeUInt8(localSubnet, 3);
            dataBuffer.writeUInt8(localDeviceId, 4);
            dataBuffer.writeUInt16BE(localDeviceType, 5);
            dataBuffer.writeUInt16BE(command, 7);
            dataBuffer.writeUInt8(targetSubnetID, 9);
            dataBuffer.writeUInt8(targetDeviceID, 10);

            //CRC buffer
            var CRCBuffer = new Buffer.alloc(2);
            CRCBuffer.writeUInt16BE(crc(Buffer.concat([dataBuffer, contents])), 0);

            //Add all the buffers together to create the final packet to be sent
            var finalPacket = Buffer.concat([ipBuffer, constBuffer, leadBuffer, dataBuffer, contents, CRCBuffer]);

            //Push to the send buffer to be processed
            sendBuffer.push({
                "sender": sender,
                "packet": finalPacket,
                "answerbackOpCode": "0x02",
                "attempts": 0,
                "timeout": 0
            });

            processSendBuffer();
        }


        //Process the incoming HDL message
        function processIncoming(message) {
            //If false it's not a valid HDL packet so ignore it
            if(message.length < 29 || message.length > 96){return;}

            //Check that the packet is correct
            if(checkIP) {
                if(message[0] != ipAddress.split(".")[0]){ return; }
                if(message[1] != ipAddress.split(".")[1]){ return; }
                if(message[2] != ipAddress.split(".")[2]){ return; }
                if(message[3] != ipAddress.split(".")[3]){ return; }
            }

            //HDLMIRACLE (In dec)
            if(message[4] != 72){ return false; }
            if(message[5] != 68){ return false; }
            if(message[6] != 76){ return false; }
            if(message[7] != 77){ return false; }
            if(message[8] != 73){ return false; }
            if(message[9] != 82){ return false; }
            if(message[10] != 65){ return false; }
            if(message[11] != 67){ return false; }
            if(message[12] != 76){ return false; }
            if(message[13] != 69){ return false; }

            //Lead Code
            if(message[14] != 0xAA){ return false; }
            if(message[15] != 0xAA){ return false; }

            //Size of packet
            if(message[16] < 11 || message[16] > 78){ return; }
            //Target Subnet ID (Equal to local, or global 255 value)
            if(!(message[23] == localSubnet || message[23] == 255)){return false;}
            //Target Device ID (Equal to local, or global 255 value)
            if(!(message[24] == localDeviceId || message[24] == 255)){return false;}  

            //CRC Code
            var crcValue = message.readUInt16BE(message.length -2);
            if(!crc(message.slice(16, -2))){ return false; }

            //Packet is valid parse the data
            var command = message.readUInt16BE(21);
            var deviceType = message.readUInt16BE(19);
            var subnetId = message[17];
            var deviceId = message[18];
            var contents = new Buffer.alloc(message[16] - 11);
            for(i = 0; i < message[16] - 11; i++) {
                contents.writeUInt8(message[i + 25], i);
            }

            var packet = {
                "command": command,
                "deviceType": deviceType,
                "subnetId": subnetId,
                "deviceId": deviceId,
                "contents": contents
            }

            console.log(packet);
        }


        //Send out all commands in the send buffer
        function processSendBuffer() {
            for(var i = 0; i < sendBuffer.length; i++) {
                if(sendBuffer[i].timeout <= 0) {
                    if(sendBuffer[i].attempts > 3) {
                        //Failed
                        sendBuffer[i].sender.sendStatus("red", "Failed", "timeout");
                        sendBuffer.pop(sendBuffer[i]);
                    }
                    else {
                        sendBuffer[i].attempts += 1;
                        sendBuffer[i].timeout = 1;

                        //Send the packet
                        if(server && connected) {
                            server.send(sendBuffer[i].packet, port, ipAddress);
                        }
                        else {
                            sendBuffer[i].sender.sendStatus("red", "Failed", "Not connected");
                            sendBuffer.pop(sendBuffer[i]);
                        }
                    }
                }
                else {sendBuffer[i].timeout -= 1;}
            }
        }

        //Attempt connection to the HDL controller
        function connect(ipAddress, port)
        {
            if(server){server.close();}
            //If already open, close before reconnecting
            server = udp.createSocket('udp4');

            server.on('error', function(err) {
                node.error("An Error Occured: " + err);
                node.sendStatus("red", "Internal Error", err);
            });

            server.on('message', function(message) {console.log(message);processIncoming(message);});

            server.bind(port);
            return server;
        }

        node.sendStatus = function(colour, message, extraInformation = "none") {
            for(var i = 0; i < msgFunctionCallbacks.length; i++) {
                msgFunctionCallbacks[i](colour, message, extraInformation);
            }
        }

        node.sendGlobalMsg = function(packet) {
            for(var i = 0; i < globalMsgCallbacks.length; i++) {
                globalMsgCallbacks[i](packet);
            }
        }

        node.addStatusCallback = function(func) {msgFunctionCallbacks.push(func);}
        node.addHDLMessageCallback = function(func) {hdlMessageCallback.push(func);}
    }

    //Add the node
    RED.nodes.registerType("hdlautomation-network", HDLNetwork);
}