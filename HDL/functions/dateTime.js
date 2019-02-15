module.exports = {
    status: "Not Supported",
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
                return {
                    "error": "Not Supported"
                }
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
                    "success": data[0],
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
                return {
                    "error": "Not Supported"
                }
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