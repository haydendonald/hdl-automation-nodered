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
        network.addStatusCallback(function(colour, message) {
            //Handle incoming messages
            switch(message) {
                case "Connected!": {
                    var msg = {
                        "payload": {
                            "connected": true,
                            "status": "connected"
                        }
                    }
                    sendMessage(msg);
                    break;
                };

                case "Failed to connect": {
                    var msg = {
                        "payload": {
                            "connected": false,
                            "status": "connection-failed"
                        }
                    }
                    sendMessage(msg);
                    break;
                };

                case "Lost Connection": {
                    var msg = {
                        "payload": {
                            "connected": false,
                            "status": "lost-connection"
                        }
                    }
                    sendMessage(msg);
                    break;
                }
            }

            node.status({fill:colour,shape:"dot",text:message});
        });

        //When a request is received on the input
        this.on("input", function(msg) {
            node.error("Not Implemented!");
        });

        //Add the node information to the msg object
        function sendMessage(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdlautomation-bus", HDLBus);
}