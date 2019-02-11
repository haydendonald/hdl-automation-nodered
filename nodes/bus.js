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
        var information = {
            "name": name,
            "type": node.type,
            "network": network.information
        }

        //Check all relevent variables are present
        if(network == null) {node.error("[Critical] - Network is not set");}
        
        node.status({fill:"red",shape:"dot",text:"Not Connected"});

        //Display the statuses of the device
        network.addStatusCallback(function(colour, message, extraInformation) {
           node.sendStatus(colour, message, extraInformation);
        });
        network.addHDLMessageCallback(function(packet) {
            sendMessage(packet);
        });

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
                    sendMessage(msg);
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
                    sendMessage(msg);
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
                    sendMessage(msg);
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
                    sendMessage(msg);
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
                    sendMessage(msg);
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
                    sendMessage(msg);
                    break;   
                }
            }

            node.status({fill:colour,shape:"dot",text:message});
        }

        //When a request is received on the input
        this.on("input", function(msg) {
            network.send(node, 0xFFFF, 0x01, 0x02, Buffer.from([0x01, 0x01]), function(poo){});
    });

        //Add the node information to the msg object
        function sendMessage(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdlautomation-bus", HDLBus);
}