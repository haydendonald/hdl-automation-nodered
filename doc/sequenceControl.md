# Sequence Control
Sequence control selects a sequence within a area
- **operate** = "sequenceControl"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **areaNumber** The area number to select
  - **sequenceNumber** The sequence number to select
  - **sequenceInArea** The sequence number active within a area
