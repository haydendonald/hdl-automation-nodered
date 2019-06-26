/*
The main network node for the bus communication.

This node needs to be referenced by other nodes in order to communicate correctly.

*/
var debug = true;

var util = require('util');
var isBuffer = Buffer.isBuffer;
var udp = require('dgram');
var crc = require('crc').crc16xmodem;
var ping = require("ping");

var functions = require("../HDL/functions/functionList.js");

module.exports = function(RED)
{
    //Main node definition
    function HDLNetwork(config)
    {
        //Debug startup
        if(debug) {
            console.log("-------------- Functions --------------");
            console.log("");
            for(var key in functions.list) {
                console.log(functions.list[key].name + "[" + key + "]" + " - " + functions.list[key].description + " (" + functions.list[key].status + ")");
             }
            console.log("");
            console.log("---------------------------------------")
            console.log("");
        }

        RED.nodes.createNode(this, config);
        var node = this;
        var name = config.name;
        var localSubnet = config.localSubnet;
        var localDeviceId = config.localDeviceId;
        var localIpAddress = "0.0.0.0";
        var ipAddress = config.ipAddress;
        var port = config.port;
        var connected = false;
        var server = connect(ipAddress, port);
        node.information = {
            "name": name,
            "type": node.type,
            "localSubnet": localSubnet,
            "localDeviceId": localDeviceId,
            "port": port,
            "connected": connected
        }

        var hdlMessageCallback = [];
        var msgFunctionCallbacks = [];
        var sendBuffer = [];
        var receiveBuffer = [];

		//When the flows are stopped
        this.on("close", function() {
            server.close();
            clearInterval(pingInterval);
            clearInterval(sendInterval);
            clearInterval(receiveInterval);
            hdlMessageCallback = [];
            msgFunctionCallbacks = [];
            sendBuffer = [];
            receiveBuffer = [];
        });

        //Check for missing variables
        if(localSubnet == null) {node.error("[Critical] - Local subnet is not set"); return;}
        if(localDeviceId == null) {node.error("[Critical] - Local device id is not set"); return;}
        if(port == null) {node.error("[Critical] - Port is not set"); return;}
        if(server == null) {node.error("[Critical] - Server is not set"); return;}

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
                    node.sendStatus("red", "Lost Connection");
                    node.error("Lost connection to HDL network @ " + ipAddress);
                    connected = false;
                }

                //Update the information variable
                node.information.connected = connected;
            });
        }, 60000);

        var sendInterval = setInterval(function() {processSendBuffer();}, 1000);
        var receiveInterval = setInterval(function() {processReceiveBuffer();}, 100);

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
            leadBuffer.writeUInt16BE(0xAAAA, 0);

            //Data buffer
            //Calculate the length of the packet
            var length = 11;
            var localDeviceType = 0xFFFE;
            if(contents){length += contents.length;}
            if(length < 0 || length > 78) {
                node.error("Data package size incorrect: " + length);
                node.sendStatus("red", "Internal Error", "Data package size incorrect");
                return false;
            }

            var dataBuffer = new Buffer.alloc(9);
            dataBuffer.writeUInt8(length, 0);
            dataBuffer.writeUInt8(localSubnet, 1);
            dataBuffer.writeUInt8(localDeviceId, 2);
            dataBuffer.writeUInt16BE(localDeviceType, 3);
            dataBuffer.writeUInt16BE(command, 5);
            dataBuffer.writeUInt8(targetSubnetID, 7);
            dataBuffer.writeUInt8(targetDeviceID, 8);

            //CRC buffer
            var CRCBuffer = new Buffer.alloc(2);
            CRCBuffer.writeUInt16BE(crc(Buffer.concat([dataBuffer, contents])), 0);

            //Add all the buffers together to create the final packet to be sent
            var finalPacket = Buffer.concat([ipBuffer, constBuffer, leadBuffer, dataBuffer, contents, CRCBuffer]);

            //Push to the send buffer to be processed
            sendBuffer.push({
                "sender": sender,
                "answerbackHandler": answerbackHandler,
                "packet": finalPacket,
                "targetedSubnetId": targetSubnetID,
                "targetedDeviceId": targetDeviceID,
                "answerbackOpCode": functions.findReplyCode(command),
                "attempts": 0,
                "timeout": 0
            });

            processSendBuffer();
        }

        //Generate a message to the hdl bus that is formatted as a msg object
        //Returns a json with the values to be sent over the bus
        node.sendMsg = function(sender, msg) {
            var opCode = msg.payload.opCode;
            var subnetId = msg.payload.subnetId;
            var deviceId = msg.payload.deviceId;
            var operate = msg.payload.operate;
            var mode = msg.payload.mode;
            var direction = msg.payload.direction;
            var data = msg.payload.data;
            var contents = msg.payload.contents;

            //Validate and find raw values

            //Subnet ID and Device ID
            if(typeof subnetId != 'number'){
                node.error("Error: invalid subnetId. An subnetId is expected to be a number between 0 and 254");
                node.sendStatus("yellow", "Invalid Input", "Invalid subnetId");
                return false;
            }
            if(typeof deviceId != 'number'){
                node.error("Error: invalid deviceId. An deviceId is expected to be a number between 0 and 254");
                node.sendStatus("yellow", "Invalid Input", "Invalid deviceId");
                return false;
            }

            //Operate
            if(operate === null || operate === undefined) {
                if(opCode === null || opCode === undefined) {
                    node.error("Error: No operate or opCode parameter was found.");
                    node.sendStatus("yellow", "Invalid Input", "No operate or opCode");
                    return false;
                }
                else {
                    //opCode
                    if(typeof opCode == "number") {
                        if(opCode >= 0 && opCode <= 65535) {
                            //We are in opCode mode so now we'll check that all parameters are found
                            if(!Buffer.isBuffer(contents)){
                                node.error("Error: Invalid contents this should be a buffer of hex");
                                node.sendStatus("yellow", "Internal Error", "Invalid Contents");
                                return false;
                            }
                        }
                        else {
                            node.error("Error: Invalid opCode: " + operate + ". The command is out of range, it should be between 0 and 65535");
                            node.sendStatus("yellow", "Invalid Input", "Invalid opCode");
                            return false;
                        }
                    }
                    else {
                        node.error("Error: Invalid opCode: " + operate + ". This should be a String");
                        node.sendStatus("yellow", "Invalid Input", "Invalid opCode");
                        return false;
                    }
                }
            }
            else if(typeof operate == "string"){
                //We are in operate mode so now we'll need to search and find all required parameters for the operate command
                if(typeof mode != "string"){
                    node.error("Error: invalid mode. The mode should be a String");
                    node.sendStatus("yellow", "Invalid Input", "Invalid mode");
                    return false;
                }
                if(typeof direction != "string"){
                    node.error("Error: invalid direction. The direction should be a String");
                    node.sendStatus("yellow", "Invalid Input", "Invalid direction");
                    return false;
                }

                opCode = functions.findOpCode(operate, mode, direction);
                if(opCode === undefined || opCode === null){
                    node.error("Error: The opCode for the function " + operate + " was not found! Check the operate, direction and mode");
                    node.sendStatus("red", "Error", "opCode not found for function");
                    return false;
                }

                //If the contents buffer is not defined generate it otherwise we'll just send that
                if(!Buffer.isBuffer(contents)){
                    contents = functions.generateContentsFromData(opCode, data);
                }
            }
            else {
                node.error("Error: Invalid operate: " + operate + ". This should be a String");
                node.sendStatus("yellow", "Invalid Input", "Invalid operate");
            }

            var ret = {
                "command": opCode,
                "targetSubnetID": subnetId,
                "targetDeviceID": deviceId,
                "contents": contents,
            }

            return ret;
        }

        //Process the incoming HDL message
        function processIncoming(message) {
            receiveBuffer.push(message);
        }

        //Send out all commands in the send buffer
        function processSendBuffer() {
            for(var i = 0; i < sendBuffer.length; i++) {
                if(sendBuffer[i].timeout <= 0) {
                    if(sendBuffer[i].attempts > 3) {
                        //Failed
                        sendBuffer[i].sender.sendStatus("red", "Failed", "timeout");
                        sendBuffer.splice(i, 1);
                    }
                    else {
                        sendBuffer[i].attempts += 1;
                        sendBuffer[i].timeout = 3;

                        //Send the packet
                        if(server && connected) {
                            server.send(sendBuffer[i].packet, port, ipAddress);

                            //If this is a answerBack it does not expect a reply therefor do not add it
                            if(sendBuffer[i].answerbackOpCode == 0x0000) {
                                sendBuffer.splice(i, 1);
                            }
                            return;
                        }
                        else {
                            sendBuffer[i].sender.sendStatus("red", "Failed", "Not connected");
                            sendBuffer.splice(i, 1);
                        }
                    }
                }
                else {sendBuffer[i].timeout -= 1;}
            }
        }

        function processReceiveBuffer() {
            for(var i = 0; i < receiveBuffer.length; i++) {
                var message = receiveBuffer[i];
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

                var wasSentToThisDevice = true;
                //Target Subnet ID (Equal to local, or global 255 value)
                if(!(message[23] == localSubnet || message[23] == 255)){wasSentToThisDevice = false;}
                //Target Device ID (Equal to local, or global 255 value)
                if(!(message[24] == localDeviceId || message[24] == 255)){wasSentToThisDevice = false;}

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

                var func = functions.findCommand(command);
                var packet = {
                    "payload": {
                        "opCode": command,
                        "sender": {
                            "deviceType": "unknown",
                            "subnetId": subnetId,
                            "deviceId": deviceId,
                            "wasSentToThisDevice": wasSentToThisDevice
                        },
                        "operate": null,
                        "mode": null,
                        "direction": null,
                        "data": null,
                        "contents": contents
                    }
                }

                //If we have found a function for the opCode
                if(func !== null) {
                    packet.payload.operate = func.operate;
                    packet.payload.mode = func.mode;
                    packet.payload.direction = func.direction;
                    packet.payload.data = func.actions[func.mode].processData(contents)
                }

                //Check if the command exists in the sent items
                var sentTo = null;
                for(var i = 0; i < sendBuffer.length; i++) {;
                    if(sendBuffer[i].targetedSubnetId == subnetId) {
                        if(sendBuffer[i].targetedDeviceId == deviceId) {
                            if(sendBuffer[i].answerbackOpCode == command || sendBuffer[i].answerbackOpCode == 0x0000) {
                                //Success!
                                sentTo = sendBuffer[i].sender;
                                sendBuffer[i].answerbackHandler(true, packet);
                                sendBuffer.splice(i, 1);
                            }
                        }
                    }
                }

                //Pass to to all nodes that are expecting to send out all data
                for(var i = 0; i < hdlMessageCallback.length; i++) {
                    hdlMessageCallback[i](packet, sentTo);
                }

                receiveBuffer.splice(i, 1);
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

            server.on('message', function(message) {processIncoming(message);});

            server.bind(port);
            return server;
        }

        //Send a message to the subscribed nodes (appears on the flow)
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
    RED.nodes.registerType("hdl-network", HDLNetwork);
}
