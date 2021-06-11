module.exports = {
  list: {
    //Version 2 AC Values
    ACValues: {
      "tempType": { 0: "C", 1: "F" },
      "modes": {
        0: "cooling",
        1: "heating",
        2: "fan",
        3: "auto",
        4: "dry"
      },
      "fanSpeeds": {
        0: "auto",
        1: "high",
        2: "medium",
        3: "low"
      },
    },

    //Panel values
    PanelValues: {
      "irControl": {
        cmd: 1,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return []; },

        set: function (data) {
          return this.values[data];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return i;
            }
          }
          return data[1];
        }
      },
      "lockPanel": {
        cmd: 2,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return []; },

        set: function (data) {
          return this.values[data];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return i;
            }
          }
          return data[1];
        }
      },
      "ACPower": {
        cmd: 3,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.number)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "number": data[2], "state": i }
            }
          }
          return { "number": data[2], "state": data[1] }
        }
      },
      "ACCoolTemp": {
        cmd: 4,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "ACFanSpeed": {
        cmd: 5,
        values: {
          "auto": 0,
          "high": 1,
          "medium": 2,
          "low": 3
        },
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.number)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "number": data[2], "state": i }
            }
          }
          return { "number": data[2], "state": data[1] }
        }
      },
      "ACMode": {
        cmd: 6,
        values: {
          "cooling": 0,
          "heating": 1,
          "fan": 2,
          "auto": 3,
          "dehumidify": 4
        },
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.number)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "number": data[2], "state": i }
            }
          }
          return { "number": data[2], "state": data[1] }
        }
      },
      "ACHeatTemp": {
        cmd: 7,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "ACAutoTemp": {
        cmd: 8,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "ACRiseTemp": {
        cmd: 9,
        range: [0, 5],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "ACDecreaseTemp": {
        cmd: 10,
        range: [0, 5],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "backlightStatus": {
        cmd: 11,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return []; },

        set: function (data) {
          return this.values[data];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return i;
            }
          }
          return data[1];
        }
      },
      "ACLock": {
        cmd: 12,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.number)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "number": data[2], "state": i }
            }
          }
          return { "number": data[2], "state": data[1] }
        }
      },
      "backlightLevel": {
        cmd: 13,
        range: [0, 100],
        get: function (data) { return []; },

        set: function (data) {
          if (data.level === undefined) { return undefined; }
          if (data.level < this.range[0] || data.level > this.range[1]) { return undefined; }
          return [parseInt(data.level)];
        },

        process: function (data) {
          return parseInt(data[1]);
        }
      },
      "statusLightLevel": {
        cmd: 14,
        range: [0, 100],
        get: function (data) { return []; },

        set: function (data) {
          if (data.level === undefined) { return undefined; }
          if (data.level < this.range[0] || data.level > this.range[1]) { return undefined; }
          return [parseInt(data.level)];
        },

        process: function (data) {
          return parseInt(data[1]);
        }
      },
      "shieldButton": {
        cmd: 15,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.key]; },

        set: function (data) {
          if (data.key === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.key)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "key": data[2], "state": i }
            }
          }
          return { "key": data[2], "state": data[1] }
        }
      },
      "shieldPage": {
        cmd: 16,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.key]; },

        set: function (data) {
          if (data.page === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.page)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "page": data[2], "state": i }
            }
          }
          return { "page": data[2], "state": data[1] }
        }
      },
      "controlButtonLED": {
        cmd: 17,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.key]; },

        set: function (data) {
          if (data.key === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.key)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "key": data[2], "state": i }
            }
          }
          return { "key": data[2], "state": data[1] }
        }
      },
      "controlButton": {
        cmd: 18,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.key]; },

        set: function (data) {
          if (data.key === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.key)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "key": data[2], "state": i }
            }
          }
          return { "key": data[2], "state": data[1] }
        }
      },
      "ACDryTemp": {
        cmd: 19,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "ACTempStatus": {
        cmd: 20,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.number)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "number": data[2], "state": i }
            }
          }
          return { "number": data[2], "state": data[1] }
        }
      },
      "ACTempMode": {
        cmd: 21,
        values: {
          "normal": 0,
          "day": 1,
          "night": 2,
          "away": 3,
          "timer": 4
        },
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.state === undefined) { return undefined; }
          return [this.values[data.state], parseInt(data.number)];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return { "number": data[2], "state": i }
            }
          }
          return { "number": data[2], "state": data[1] }
        }
      },
      "FHRiseTemp": {
        cmd: 22,
        range: [0, 5],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "FHDecreaseTemp": {
        cmd: 23,
        range: [0, 5],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "lockSetupPage": {
        cmd: 24,
        values: {
          "off": 0,
          "on": 1,
          true: 1,
          false: 0
        },
        get: function (data) { return []; },

        set: function (data) {
          return this.values[data];
        },

        process: function (data) {
          for (var i in this.values) {
            if (this.values[i] == data[1]) {
              return i;
            }
          }
          return data[1];
        }
      },
      "normalTemp": {
        cmd: 25,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "dayTemp": {
        cmd: 26,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "nightTemp": {
        cmd: 27,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      },
      "awayTemp": {
        cmd: 28,
        range: [0, 84],
        get: function (data) { return [data.value.number]; },

        set: function (data) {
          if (data.number === undefined) { return undefined; }
          if (data.temp === undefined) { return undefined; }
          if (data.temp < this.range[0] || data.temp > this.range[1]) { return undefined; }
          return [parseInt(data.temp), parseInt(data.number)];
        },

        process: function (data) {
          return { "number": data[2], "temp": data[1] }
        }
      }
    },
  }
}