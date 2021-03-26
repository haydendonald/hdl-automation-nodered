# Version History
## Version 1.0
- 1.0.0: Uploaded to Node Red
- 1.1.0: Added panel control functionality
- 1.2.0: Added AC Control, Date Time, Sequence Control, Single Channel Control, and UV Switch functionality
- 1.2.1: Fixed a major bug that would cause a loop to occur when putting a node in series
- 1.2.2: Fixed a bug where the received buffer was not being cleared correctly
- 1.3.0: Fixed an issue where backing up the system for example would cause the network to stop responding to incoming commands. Also added debug setting to check for incoming commands
- 1.3.1 - 1.4.9: Do not use adding feature that returns the sent msg to the output via the msg.inputMessage value  
- 1.5.0: Added feature that allows the sent message to be accessed on answerBack using the msg.inputMessage value
- 1.5.1: Bug fix. When two gateways have access multiple messages would be received.
- 1.6.0: Added dryContact
- 1.6.1: Bug fix. Added singleChannelControl to the function list
- 1.6.2: Add the ability to override the subnet/device id for a device node
- 1.7.0: Added blocking of duplicate messages
- 1.8.0: Updated panel control for better processing of the data