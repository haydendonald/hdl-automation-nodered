# Version History
- 1.0.0: Uploaded to Node Red
- 1.1.0: Added panel control functionality
- 1.2.0: Added AC Control, Date Time, Sequence Control, Single Channel Control, and UV Switch functionality
- 1.2.1: Fixed a major bug that would cause a loop to occur when putting a node in series
- 1.2.2: Fixed a bug where the recieved buffer was not being cleared correctly
- 1.3.0: Fixed an issue where backing up the system for example would cause the network to stop responding to incoming commands. Also added debug setting to check for incoming commands
- 1.3.1: Added msg.inputMessage. This passes the msg that was sent to the device
- 1.3.2: Moved msg.inputMessage to msg.information.inputMessage as it was being cleared
- 1.3.3: Bug fix