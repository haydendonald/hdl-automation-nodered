# HDL Automation for Node Red
Provides control and feedback of the HDL Automation bus.  
[HDL Automation](https://www.hdlautomation.com/)

# This project is no longer being maintained.
Don't stress! The HDL bus is unlikely to be changed in the near future so it is likely that this project will still work! I will keep the project open if you wish to contribute to the project.

# How to Use
You require some way of communicating with the bus though network. This can be done by using a HDL-MBUS01IP.431 or HDL-MD512-DMX.232 (SB-DN-512DMX) (which is what this is tested on) or any other gateway that provides programming functionality to connect your bus to the network.

## Sending to the bus
In order to send commands to the HDL bus it is expected that messages will be sent as following
```
var msg = {
    "payload": {
        "operate": "function", (required)
        "subnetId": 0, //Override the subnet id
        "deviceId": 1, //Override the device id
        "mode": "set/get", //Set will set the value to the bus, get will get the value from the bus (required)
        "direction": "request/answerBack", //Request is requesting the action to happen, answerBack is a reply from the bus (required)
        "data": {
            //The data specific to the function (see below)
        }
    }
}
```
## Receiving from the bus
When events occur on the bus commands will be outputted in the following format:
```
{
    "payload": {
        "opCode": 0x002,
        "sender": { //The device that sent the message
            "deviceType": 0x00B,
            "subnetId": 1,
            "deviceId": 2,
            "wasSendToThisDevice": true/false
        },
        "target": { //The target device for the sent message
            "subnetId" : 1
            "deviceId": 3
        },
        "operate": "function",
        "mode": "set/get",
        "direction": "request/answerBack",
        "data": {
            //The data specific to the function
        },
        "contents": Buffer([0x01, 0x01]) //The raw contents sent
    }
}
```

## Supported Functions
### [Scene Control](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/sceneControl.md)
Gets/Sets a scene on an area for a device

### [Sequence Control](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/sequenceControl.md)
Gets/Sets a sequence on an area for a device

### [UV Switch](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/UVSwitch.md)
Gets/Sets a a universal switch value on a device

### [Single Channel Control](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/singleChannelControl.md)
Gets/Sets a single channel on a device

### [Date Time](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/dateTime.md)
Gets the date/time

### [AC Control](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/ACControl.md)
Controls a HVAC device (See panel control as some devices use the panel)

### [Panel Control](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/panelControl.md)
Controls a individual control panel, including AC control if controlled via a panel

### [Dry Control](https://github.com/haydendonald/hdl-automation-nodered/tree/master/doc/dryContact.md)
Gets the value of a dry contact, useful for PIRs