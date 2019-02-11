/*
This node allows for direct communication to the HDL bus
*/

module.exports = function(RED)
{
    //Main Function
    function HDLBus(config)
    {
        RED.nodes.createNode(this, config);
        var node = this;
        var name = config.name;
        var network = RED.nodes.getNode(config.network);
        var alwaysOutput = config.alwaysOutput == "yes";
        var information = {
            "name": name,
            "type": node.type,
            "network": network.information,
            "alwaysOutput": alwaysOutput
        }

        //Check all relevent variables are present
        if(network == null) {node.error("[Critical] - Network is not set");}
        
        node.status({fill:"red",shape:"dot",text:"Not Connected"});

        //Display the statuses of the device
        network.addStatusCallback(function(colour, message, extraInformation) {
           node.sendStatus(colour, message, extraInformation);
        });

        //If this node is set to receive all data add it to the list
        if(alwaysOutput) {
            network.addHDLMessageCallback(function(packet) {
                node.status({fill:"green",shape:"dot",text:"Got Data!"});

                var msg = {
                    "raw": packet.raw,
                    "payload": {
                        "opCode": packet.raw.command,
                        "subnetId": packet.subnetId,
                        "deviceId": packet.deviceId,
                        "contents": packet.raw.contents
                    },
                }
                node.sendMessage(msg);
            });
        }

        node.sendStatus = function(colour, message, extraInformation) {
            //Handle incoming messages
            switch(message) {
                case "Connected!": {
                    var msg = {
                        "payload": {
                            "connected": true,
                            "status": "connected",
                            "extraInformation": extraInformation
                        }
                    }
                    node.sendMessage(msg);
                    break;
                };

                case "Failed to connect": {
                    var msg = {
                        "payload": {
                            "connected": false,
                            "status": "connection-failed",
                            "extraInformation": extraInformation
                        }
                    }
                    node.sendMessage(msg);
                    break;
                };

                case "Lost Connection": {
                    var msg = {
                        "payload": {
                            "connected": false,
                            "status": "lost-connection",
                            "extraInformation": extraInformation
                        }
                    }
                    node.sendMessage(msg);
                    break;
                }

                case "Internal Error": {
                    var msg = {
                        "payload": {
                            "connected": false,
                            "status": "internal-error",
                            "extraInformation": extraInformation
                        }
                    }
                    node.sendMessage(msg);
                    break;
                };

                case "Failed": {
                    var msg = {
                        "payload": {
                            "connected": true,
                            "status": "message-failed-to-send",
                            "extraInformation": extraInformation
                        }
                    }
                    node.sendMessage(msg);
                    break;
                }

                default: {
                    var msg = {
                        "payload": {
                            "connected": true,
                            "status": message,
                            "extraInformation": extraInformation
                        }
                    }
                    node.sendMessage(msg);
                    break;   
                }
            }

            node.status({fill:colour,shape:"dot",text:message});
        }

        //When a request is received on the input
        this.on("input", function(msg) {
            //We expect a raw command layout

            //Validate
            if(typeof msg.payload.opCode != 'number'){
                node.error("Error: invalid opCode. An opCode is expected to be a number between 0 and 65535");
                node.sendStatus("yellow", "Invalid Input", "Invalid opCode");
                return false;
            }
            if(typeof msg.payload.subnetId != 'number'){
                node.error("Error: invalid subnetId. An subnetId is expected to be a number between 0 and 254");
                node.sendStatus("yellow", "Invalid Input", "Invalid subnetId");
                return false;
            }
            if(typeof msg.payload.deviceId != 'number'){
                node.error("Error: invalid deviceId. An deviceId is expected to be a number between 0 and 254");
                node.sendStatus("yellow", "Invalid Input", "Invalid deviceId");
                return false;
            }
            if(!Buffer.isBuffer(msg.payload.contents)){
                node.error("Error: Invalid contents this should be a buffer of hex");
                node.sendStatus("red", "Internal Error", "Invalid Contents");
                return false;
            }

            //Send it!
            node.status({fill:"orange",shape:"dot",text:"Sending..."});
            network.send(msg.payload.opCode, msg.payload.subnetId, msg.payload.deviceId, msg.payload.contents, function(success, packet) {
                if(success) {
                    node.status({fill:"green",shape:"dot",text:"Sent!"});

                    var msg = {
                        "raw": packet.raw,
                        "payload": {
                            "opCode": packet.raw.command,
                            "subnetId": packet.subnetId,
                            "deviceId": packet.deviceId,
                            "contents": packet.raw.contents
                        },
                    }
                    node.sendMessage(msg);
                }
                else {
                    node.status({fill:"red",shape:"dot",text:"Failed"});
                }
            });
        });

        //Add the node information to the msg object
        node.sendMessage = function(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdlautomation-bus", HDLBus);
}