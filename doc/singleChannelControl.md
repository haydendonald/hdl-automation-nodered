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