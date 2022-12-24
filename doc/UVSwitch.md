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