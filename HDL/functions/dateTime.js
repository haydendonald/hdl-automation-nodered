module.exports = {
    status: "Testing",
    name: "Date Time",
    description: "The current date and time in the HDL system",

    actions: {
        set: {
            request: 0xDA02,
            answerBack: 0xDA03,
            processData: function(data) {
              return {
                  "success": data[0]
              }
            },
            generateData: function(data) {
              var weekday = 0;
              if (typeof data.year != 'number'){ return "Invalid year: " + data.year + ". Expected a number"; }
              if (typeof data.month != 'number'){ return "Invalid month: " + data.month + ". Expected a number"; }
              if (typeof data.day != 'number'){ return "Invalid day: " + data.day + ". Expected a number"; }
              if (typeof data.hour != 'number'){ return "Invalid hour: " + data.hour + ". Expected a number"; }
              if (typeof data.minute != 'number'){ return "Invalid minute: " + data.minute + ". Expected a number"; }
              if (typeof data.second != 'number'){ return "Invalid second: " + data.second + ". Expected a number"; }

              if(data.year < 2000){return "Invalid year: " + data.year + ". This is expected to be above 2000";}
              if(data.month < 1 || data.month > 12){return "Invalid month: " + data.month + ". This is expected to be a number between 1 and 12";}
              if(data.day < 1 || data.day > 31){return "Invalid day: " + data.day + ". This is expected to be a number between 1 and 31";}
              if(data.hour < 0 || data.hour > 23){return "Invalid hour: " + data.hour + ". This is expected to be a number between 0 and 23";}
              if(data.minute < 0 || data.minute > 59){return "Invalid minute: " + data.minute + ". This is expected to be a number between 0 and 59";}
              if(data.second < 0 || data.second > 59){return "Invalid second: " + data.second + ". This is expected to be a number between 0 and 59";}

              switch(data.weekDay.toLowerCase()) {
                case "sunday": {weekDay = 0; break;}
                case "monday": {weekDay = 1; break;}
                case "tuesday": {weekDay = 2; break;}
                case "wednesday": {weekDay = 3; break;}
                case "thursday": {weekDay = 4; break;}
                case "friday": {weekDay = 5; break;}
                case "saturday": {weekDay = 6; break;}
                default: {
                  return "Invalid week day: " + data.weekDay + ". Expected a string with the day (sunday)";
                }
              }

              return Buffer.from([data.year, data.month, data.day, data.hour, data.minute, data.second, weekDay]);
            }
        },

        read: {
            request: 0xDA00,
            answerBack: 0xDA01,
            processData: function(data) {
                var weekDay = "unknown";
                switch(data[7]) {
                    case 0: weekDay = "sunday"; break;
                    case 1: weekDay = "monday"; break;
                    case 2: weekDay = "tuesday"; break;
                    case 3: weekDay = "wednesday"; break;
                    case 4: weekDay = "thursday"; break;
                    case 5: weekDay = "friday"; break;
                    case 6: weekDay = "saturday"; break;
                }
                return {
                    "success": data[1] == 0x00F8,
                    "year": data[1],
                    "month": data[2],
                    "day": data[3],
                    "hour": data[4],
                    "minute": data[5],
                    "second": data[6],
                    "weekDay": weekDay
                }
            },
            generateData: function(data) {
              //There is no parameters
              return Buffer.from([]);
            }
        },

        broadcast: {
            request: 0xDA44,
            answerBack: 0xFFFF,
            processData: function(data) {
                return {
                    "year": data[0],
                    "month": data[1],
                    "day": data[2],
                    "hour": data[3],
                    "minute": data[4],
                    "second": data[5]
                }
            },
            generateData: function(data) {
                return {
                    "error": "Not Supported"
                }
            }
        }
    }
}
