# General Functionality
### Sending to the bus
In order to send commands to the HDL bus it is expected that messages will be sent as following
```
var msg = {
    "payload": {
        "operate": "function",
        "subnetId": 0, //Override the subnet id if required
        "deviceId": 1, //Override the device id if required
        "mode": "set/get", //Set will set the value to the bus, get will get the value from the bus
        "direction": "request/answerBack", //Request is requesting the action to happen, answerBack is a reply from the bus
        "data": {
            //The data specific to the function
        }
    }
}
```
### Receiving from the bus
When events occur on the bus commands will be outputted in the following format:
```
{
    "payload": {
        "opCode": 0x002,
        "sender": {
            "deviceType": 0x00B,
            "subnetId": 1,
            "deviceId": 2,
            "wasSendToThisDevice": true/false
        }
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

# Supported Functions
# Scene Control
Scene control selects a scene within a area
- **operate** = "sceneControl"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **areaNumber** The area number to select
  - **sceneNumber** The scene number to select
  - **totalChannelNumber** The total number of channels for channelStatusBit
  - **channelStatusBit** The status of each channel within a area
  - **totalAreaNumber** The total areas contained in the device
  - **areaScenes** The scene for each area
  - **channelLevels** The level of each channel within a area

# Sequence Control
Sequence control selects a sequence within a area
- **operate** = "sequenceControl"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **areaNumber** The area number to select
  - **sequenceNumber** The sequence number to select
  - **sequenceInArea** The sequence number active within a area

# Panel Control
  Panel control controls a wall panel
  - **operate** = "panelControl"
  - **mode** = "set/get" (Set sets the value, get gets the value)
  - **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
  - **data**
    - **function** The panel function to be processed
      - "ircontrol"
        - **value** = "on/off"
      - "lockpanel"
        - **value** = "on/off"
      - "acpower"
        - **value** = "on/off"
      - "coolingtemp"
        - **value** = 0-84
      - "fanspeed"
        - **value** = "auto/high/medium/low"
      - "acmode"
        - **value** = "cooling/heating/fan/auto/dehumidify"
      - "heattemp"
        - **value** = 0-84
      - "autotemp"
        - **value** = 0-84
      - "risetemp"
        - **value** = 0-5
      - "decreasetemp"
        - **value** = 0-5
      - "backlightstatus"
        - **value** = "on/off"
      - "lockac"
        - **value** = "on/off"
      - "backlightlevel"
        - **value** = 0-100
      - "statuslightlevel"
        - **value** = 0-100
      - "shieldbutton"
        - **selector** (button) = 1-255
        - **value** = "on/off"
      - "shieldpage"
        - **selector** (page) = 1-255
        - **value** = "on/off"
      - "controlbuttonled"
        - **selector** (button) = 1-255
        - **value** = "on/off"
      - "controlbutton"
        - **selector** (button) = 1-255
        - **value** = "on/off"
      - "drytemp"
        - **value** = 0-84
      - "tempstatus"
        - **value** = "on/off"
      - "tempmode"
        - **value** = "normal/day/night/away/timer"
      - "fhrisetemp"
        - **value** = 0-5
      - "fhdecreasetemp"
        - **value** = 0-5
      - "locksetuppage"
        - **value** = "on/off"
      - "normaltemp"
        - **value** = 0-84
      - "daytemp"
        - **value** = 0-84
      - "nighttemp"
        - **value** = 0-84
      - "awaytemp"
        - **value** = 0-84

# AC Control
AC control controls a air conditioner
- **operate** = ```ACControl```

### Example ```Get``` Request
```
//Example get request
msg.payload.data = {
  "number": 1, //The AC number to select (1-128). Defaults to 1
}
```

### Example ```Set``` Request
```
//Example set request
//If not specified it will set it to the current value read from the bus
msg.payload.data = {
  "number": 1, //The AC number (1-128) **REQUIRED**
  "temperatureType": "C/F", //The type of temperature (C or F)
  "currentTemperature": 0, //The current temperature read by the sensor
  "setTemperature": {
    "cooling": 0, //The cooling temperature 0-99 degrees
    "heating": 0, //The cooling temperature 0-99 degrees
    "auto": 0, //The cooling temperature 0-99 degrees
    "dry": 0, //The cooling temperature 0-99 degrees
  },
  "setTemperature": 21, //Or the temperature can be set like this and it will set the current mode temperature accordingly
  "mode": "cooling/heating/fan/auto/dry",
  "fan": "auto/high/medium/low",
  "state": true/false, //The AC power state
  "setupMode": "cooling/heating/fan/auto/dry",
  "setupSpeed": "auto/high/medium/low",
  "sweep": {
    "enabled": true/false, //Is the sweep enabled?
    "state": 0/1 //The docs say 0=no sweep 1=sweep but there may be more values here
  }
}
```

### Example ```Response```
```
//Example response
msg.payload.data = {
  "number": 1, //The AC number (1-128)
  "temperatureType": "C/F", //The type of temperature (C or F)
  "currentTemperature": 0, //The current temperature read by the sensor
  "setTemperature": {
    "cooling": 0, //The cooling temperature 0-99 degrees
    "heating": 0, //The cooling temperature 0-99 degrees
    "auto": 0, //The cooling temperature 0-99 degrees
    "dry": 0, //The cooling temperature 0-99 degrees
  },
  "mode": "cooling/heating/fan/auto/dry",
  "fan": "auto/high/medium/low",
  "state": true/false, //The AC power state
  "setupMode": "cooling/heating/fan/auto/dry",
  "setupSpeed": "auto/high/medium/low",
  "currentMode": "cooling/heating/fan/auto/dry",
  "currentFan": "auto/high/medium/low",
  "sweep": {
    "enabled": true/false, //Is the sweep enabled?
    "state": 0/1 //The docs say 0=no sweep 1=sweep but there may be more values here
  }
}
```

# AC Control (Version 1)
IN DEVELOPMENT

AC control controls a air conditioner
- **operate** = ```ACControlV1```

### Example ```Get``` Request
```
//Example get request
msg.payload.data = {}
```

### Example ```Set``` Request
```
//Example set request
//If not specified it will set it to the current value read from the bus
msg.payload.data = {}
```

### Example ```Response```
```
//Example response
msg.payload.data = {}
```

# Date Time
The current date and time in the HDL system
- **operate** = "dateTime"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **success** Whether the date/time was set successfully = true/false
  - **year** = >2000
  - **month** = 1-12
  - **day** = 1-31
  - **hour** = 0-23
  - **minute** = 0-59
  - **second** = 0-59
  - **weekDay** = 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', or 'saturday'

# Single Channel Control
Controls a single channel
- **operate** = "singleChannelControl"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **channelNumber** The channel number to control = 1-255
  - **success** Whether the channel was set successfully = true/false
  - **channelLevel** The value to set the channel to = 0-100
  - **runningTime** The fade time = 0-3600(s)
  - **totalChannelNumber** The total amount of channels
  - **channels** A list of each channel value

# UV Switch
Controls the state of a UV switch
- **operate** = "UVSwitch"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **switchNumber** The switch number = 1-255
  - **switchState** 0 for off and 1 for on
  - **totalUVSwitches** The total UV switches
  - **UVSwitches** A list of each UV switch state

# Dry Contact
Gets the state of a dry contact
- **operate** = "dryContact"
- **mode** = "get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **areaNumer** The area number = 1-255
  - **switchNumber** The switch number = 1-255
  - **state** The switch state
