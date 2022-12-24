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