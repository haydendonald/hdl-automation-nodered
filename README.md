 # HDL Automation for Node Red
Provides control and feedback of the HDL Automation bus.  
[HDL Automation](https://www.hdlautomation.com/)

## Currently in Development!
This is currently in development. I'm currently in the process of moving the existing node that i've developed to a better cleaner solution (this).
My aims with this project is to
- Clean up the code (since the pre-existing code was messy as i was learning nodejs + nodered through the development)
- Provide a selection of device type so that they can be supported correctly
- Output more information (better handling of errors ect)

## Supported Devices
- Nothing so far :(

## How to Use
You require some way of communicating with the bus though network. This can be done by using a HDL-MBUS01IP.431 or HDL-MD512-DMX.232 (SB-DN-512DMX) (which is what this is tested on) or any other gateway that provides programming functionality (check with your rep if you are unsure).