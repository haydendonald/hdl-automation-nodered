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
    - **panelFunction** The panel function to be processed
      - "ircontrol"
        - **panelData** = "on/off"
      - "lockpanel"
        - **panelData** = "on/off"
      - "acpower"
        - **panelData** = "on/off"
      - "coolingtemp"
        - **panelData** = 0-84
      - "fanspeed"
        - **panelData** = "auto/high/medium/low"
      - "acmode"
        - **panelData** = "cooling/heating/fan/auto/dehumidfyify"
      - "heattemp"
        - **panelData** = 0-84
      - "autotemp"
        - **panelData** = 0-84
      - "risetemp"
        - **panelData** = 0-5
      - "decreasetemp"
        - **panelData** = 0-5
      - "backlightstatus"
        - **panelData** = "on/off"
      - "lockac"
        - **panelData** = "on/off"
      - "backlightlevel"
        - **panelData** = 0-100
      - "statuslightlevel"
        - **panelData** = 0-100
      - "sheildbutton"
        - **button** = 1-255
        - **status** = "on/off"
      - "shieldpage"
        - **page** = 1-255
        - **status** = "on/off"
      - "controlbuttonled"
        - **button** = 1-255
        - **status** = "on/off"
      - "controlbutton"
        - **button** = 1-255
        - **status** = "on/off"
      - "drytemp"
        - **panelData** = 0-84
      - "tempstatus"
        - **panelData** = "on/off"
      - "tempmode"
        - **panelData** = "normal/day/night/away/timer"
      - "fhrisetemp"
        - **panelData** = 0-5
      - "fhdecreasetemp"
        - **panelData** = 0-5
      - "locksetuppage"
        - **panelData** = "on/off"
      - "normaltemp"
        - **panelData** = 0-84
      - "daytemp"
        - **panelData** = 0-84
      - "nighttemp"
        - **panelData** = 0-84
      - "awaytemp"
        - **panelData** = 0-84

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
  - **switchState** The state of the switch = 'on' or 'off'
  - **totalUVSwitches** The total UV switches
  - **UVSwitches** A list of each UV switch state
