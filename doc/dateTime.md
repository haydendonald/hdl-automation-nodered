# Date Time
The current date and time in the HDL system
- **operate** = "dateTime"
- **mode** = "set/get" (Set sets the value, get gets the value)
- **direction** = "request/answerBack" (Request asks for the current value, answerBack is the reply for the request)
- **data**
  - **success** Whether the date/time was set successfully = true/false
  - **year** = >2000
  - **month** = 1-12
  - **day** = 1-31
  - **hour** = 0-23
  - **minute** = 0-59
  - **second** = 0-59
  - **weekDay** = 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', or 'saturday'
