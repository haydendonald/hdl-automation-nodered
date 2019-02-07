module.exports = function(RED)
{
    //Main Function
    function HDLDevice(config)
    {
        RED.nodes.createNode(this, config);
        var deviceModule = RED.nodes.getNode(config.deviceModule);
        var node = this;
        
        node.status({fill:"gray",shape:"dot",text:"Waiting"});


        //Display the statuses of the device
        deviceModule.addStatusCallback(deviceModule, function(colour, message) {
            node.status({fill:colour,shape:"dot",text:message});
        });


        //When a request is received on the input
        this.on("input", function(msg) {
        });
    }

    RED.nodes.registerType("hdlautomation-device", HDLDevice);
}