module.exports = function(RED)
{
    //Main Function
    function HDLDevice(config)
    {
        RED.nodes.createNode(this, config);
        var name = config.name;
        var subnetId = config.subnetId;
        var deviceId = config.deviceId;
        var network = RED.nodes.getNode(config.network);
        var outputMode = config.outputMode;
        var node = this;
        var information = {
            "name": name,
            "type": node.type,
            "subnetId": subnetId,
            "deviceId": deviceId,
            "outputMode": outputMode
        }

        //Check all relevent variables are present
        if(network == null) {node.error("[Critical] - HDL network is not set"); return;}
        if(subnetId == null) {node.error("[Critical] - Subnet ID is not set"); return;}
        if(deviceId == null) {node.error("[Critical] - Device ID is not set"); return;}

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
            //Only output if the message was sent to this PC from the deviceId
            network.addHDLMessageCallback(function(packet, sentTo) {
                var wasSentByDevice = (packet.payload.sender.subnetId == subnetId && packet.payload.sender.deviceId == deviceId);
                if(sentTo != node && packet.payload.sender.wasSentToThisDevice && wasSentByDevice) {
                    node.status({fill:"green",shape:"dot",text:"Got Data!"});
                    node.sendMessage(packet);
                }
            });
            break;
          }
          case "all": {
            network.addHDLMessageCallback(function(packet, sentTo) {
                var wasSentByDevice = (packet.payload.sender.subnetId == subnetId && packet.payload.sender.deviceId == deviceId);
                if(sentTo != node && wasSentByDevice) {
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

        });

        //Add the node information to the msg object
        node.sendMessage = function(msg) {
            msg.node = information;
            node.send(msg);
        }
    }

    RED.nodes.registerType("hdl-device", HDLDevice);
}
