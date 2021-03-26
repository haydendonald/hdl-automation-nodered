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
      - "sheildbutton"
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
- **operate** = "ACControl"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **ACNumber** The AC number to control
  - **temperatureType** The temperature type. Either C or F
  - **currentTemperature** The current temperature reported by the AC sensor
  - **coolingTemperaturePoint** The aimed cooling temperature
  - **heatingTemperaturePoint** The aimed heating temperature
  - **autoTemperaturePoint** The aimed auto temperature
  - **dryTemperaturePoint** The aimed dry temperature
  - **coolingTemperaturePoint** The aimed cooling temperature
  - **fan** The fan state = 'auto', 'high', 'medium', 'low'
  - **mode** The mode state = 'cooling', 'heating', 'fan', 'auto', 'dry'
  - **ACStatus** The current power of the AC = 'on', 'off'
  - **SetupMode** The setup mode of the AC = 'cooling', 'heating', 'fan', 'auto', 'dry'
  - **SetupSpeed** The setup speed of the AC = 'auto', 'high', 'medium', 'low'
  - **currentFan** The current fan = 'auto', 'high', 'medium', 'low'
  - **currentMode** The the current mode = 'cooling', 'heating', 'fan', 'auto', 'dry'
  - **sweepEnable** Whether the sweep is enabled = 'on', 'off'
  - **sweepNow** If the AC is currently sweeping = 'on', 'off'

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
