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