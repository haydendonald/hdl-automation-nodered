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
            network.addHDLMessageCallback(function(packet, sentTo) {
                if(sentTo != node) {
                    node.status({fill:"green",shape:"dot",text:"Got Data!"});
                    node.sendMessage(packet);
                }
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
            var sendMsg = network.sendMsg(node, msg);
  
            //Send it!
            node.status({fill:"orange",shape:"dot",text:"Sending..."});
            network.send(node, sendMsg.command, sendMsg.targetSubnetID, sendMsg.targetDeviceID, sendMsg.contents, function(success, packet) {
                if(success) {
                    node.status({fill:"green",shape:"dot",text:"Sent!"});
                    node.sendMessage(packet);
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

    RED.nodes.registerType("hdl-bus", HDLBus);
}