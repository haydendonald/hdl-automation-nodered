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

        var network = RED.nodes.getNode(config.network);
        

        node.status({fill:"gray",shape:"dot",text:"Waiting"});


        //When a request is received on the input
        this.on("input", function(msg) {
            node.error("Not Implemented!");
        });
    }

    RED.nodes.registerType("hdlautomation-bus", HDLBus);
}