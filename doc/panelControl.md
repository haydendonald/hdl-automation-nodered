# Panel Control

Controls a wall panel
- **operate** = ```panelControl```

### Example ```Get``` Request
```
//Example get request
msg.payload.data = {
  "function": "<function name>"
}
```

### Example ```Set``` Request
```
//Example set request
msg.payload.data = {
  "function": "<function name>",
  "value": "<function value">
}
```

### Example ```Response```
```
//Example response
msg.payload.data = {
  "function": "<function name>",
  "value": "<function value">
}
```
## Functions
The following are the functions supported
### function = ```"irControl"```
value = "on/off/true/false"
### function = ```"lockPanel"```
value = "on/off/true/false"
### function = ```"ACPower"```
value = {number: 1, state: "on/off/true/false"}
### function = ```"ACCoolTemp"```
value = {number: 1, temp: 0-84}
### function = ```"ACFanSpeed"```
value = {number: 1, state: "auto/high/medium/low"}
### function = ```"ACMode"```
value = {number: 1, state: "cooling/heating/fan/auto/dehumidify"}
### function = ```"ACHeatTemp"```
value = {number: 1, temp: 0-84}
### function = ```"ACAutoTemp"```
value = {number: 1, temp: 0-84}
### function = ```"ACRiseTemp"```
value = {number: 1, temp: 0-5}
### function = ```"ACDecreaseTemp"```
value = {number: 1, temp: 0-5}
### function = ```"backlightStatus"```
value = "on/off/true/false"
### function = ```"ACLock"```
value = {number: 1, state: "on/off/true/false"}
### function = ```"backlightLevel"```
value = 0-100
### function = ```"statusLightLevel"```
value = 0-100
### function = ```"shieldButton"```
value = {key: 1, state: "on/off/true/false"}
### function = ```"shieldPage"```
value = {page: 1, state: "on/off/true/false"}
### function = ```"controlButtonLED"```
value = {key: 1, state: "on/off/true/false"}
### function = ```"controlButton"```
value = {key: 1, state: "on/off/true/false"}
### function = ```"ACDryTemp"```
value = {number: 1, temp: 0-84}
### function = ```"ACTempStatus"```
value = {number: 1, state: "on/off/true/false"}
### function = ```"ACTempMode"```
value = {number: 1, state: "normal/day/night/away/timer"}
### function = ```"FHRiseTemp"```
value = {number: 1, temp: 0-5}
### function = ```"FHDecreaseTemp"```
value = {number: 1, temp: 0-5}
### function = ```"lockSetupPage"```
value = "on/off/true/false"
### function = ```"normalTemp"```
value = {number: 1, temp: 0-84}
### function = ```"dayTemp"```
value = {number: 1, temp: 0-84}
### function = ```"nightTemp"```
value = {number: 1, temp: 0-84}
### function = ```"awayTemp"```
value = {number: 1, temp: 0-84}