# HDL Automation for Node Red
Provides control and feedback of the HDL Automation bus.  
[HDL Automation](https://www.hdlautomation.com/)


## Now Released to Node Red!
I've recently published this to Node Red meaning that it's ready to be used. As seen below several commands are supported but i'm yet to test every command (i've only added them as the documentation states). Please post issues if you run across any, this will be running 24/7 for myself but i cannot test every command etc.

## Currently in Development!
This is currently in development. I'm currently in the process of moving the existing node that i've developed to a better cleaner solution (this).
My aims with this project is to
- Clean up the code (since the pre-existing code was messy as i was learning nodejs + nodered through the development) [Done]
- Output more information (better handling of errors ect) [Done]
- Provide a better method of passing raw commands [Done]
- Provide a easier way to add commands [Done]
- Support the most used commands [In progress]
<<<<<<< HEAD
- Add search for device when deploy so that the "connected" status depicts the device not the network (device node)
=======
>>>>>>> 488a34c02c31a80aea8d4f82f0a058321e905427

## Supported Commands
- Scene Control
- Sequence Control
- UV Switch
- Single Channel Control
- Date Time

## How to Use
You require some way of communicating with the bus though network. This can be done by using a HDL-MBUS01IP.431 or HDL-MD512-DMX.232 (SB-DN-512DMX) (which is what this is tested on) or any other gateway that provides programming functionality (check with your rep if you are unsure).

## Coming soon
Once this is at a stable state i'll be aiming to add the following to the project:
- Dedicated function node(s) for the most used funtions
