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
        var outputMode = config.outputMode;
        var information = {
            "name": name,
            "type": node.type,
            "outputMode": outputMode
        }

        //Check all relevent variables are present
        if(network == null) {node.error("[Critical] - Network is not set");}
        
        node.status({fill:"red",shape:"dot",text:"Not Connected"});

        //Display the statuses of the device
        network.addStatusCallback(function(colour, message, extraInformation) {
           node.sendStatus(colour, message, extraInformation);
        });

        //Switch the output mode
        switch(outputMode) {
            case "answerBack": {
                //This will be handled below
                break;
            }
            case "local": {
                network.addHDLMessageCallback(function(packet, sentTo) {
                    if(sentTo != node && packet.payload.sender.wasSentToThisDevice) {
                        node.status({fill:"green",shape:"dot",text:"Got Data!"});
                        node.sendMessage(packet);
                    }
                });
                break;
            }
            case "all": {
                network.addHDLMessageCallback(function(packet, sentTo) {
                    if(sentTo != node) {
                        node.status({fill:"green",shape:"dot",text:"Got Data!"});
                        node.sendMessage(packet);
                    }
                });
                break;
            }
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
            // var sendMsg = network.sendMsg(node, msg);
  
            //Send it!
            node.status({fill:"orange",shape:"dot",text:"Sending..."});
            network.send(node, msg, function(success, packet) {
                if(success == true) {
                    node.status({fill:"green",shape:"dot",text:"Sent!"});
                    node.sendMessage(packet);
                }
                else {
                    node.status({fill:"red",shape:"dot",text:"Failed"});
                }
            }).catch((error)=>{});
        });

        //Add the node information to the msg object
        node.sendMessage = function(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdl-bus", HDLBus);
}