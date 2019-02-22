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