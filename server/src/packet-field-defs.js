module.exports =
[  {
    "index":1.0,
    "name":"Flags1",
    "unit":"bitset",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":null,
    "max":255.0,
    "display_scale":null,
    "display_offset":0.0,
    "real_range":null,
    "resolution":null,
    "start":0.0,
    "bits": [
      {
        "name": "Monitor OK",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "Monitor reset",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "AC 1 power loss",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "AC 2 power loss",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "Alarm 1",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "Alarm 2",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "Alarm 3",
        "setLabel": "On",
        "unsetLabel": "Off"
      },
      {
        "name": "Alarm 4",
        "setLabel": "On",
        "unsetLabel": "Off"
      }
    ]
},
  {
    "index":2.0,
    "name":"Boat Status",
    "unit":"Message",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":null,
    "max":255.0,
    "display_scale":"string lookup",
    "display_offset":0.0,
    "real_range":"All OK, anchored, moving, need help, etc. TBD",
    "resolution":null,
    "start":1.0

},
  {
    "index":3.0,
    "name":"Date and Time",
    "unit":"Unix time",
    "ctype":"INT32",
    "bytes":4.0,
    "min":-2147483648.0,
    "max":2147483648.0,
    "display_scale":1000,
    "display_offset":0.0,
    "real_range":"1901-12-13 to 2038-01-19 HH:MM:SS",
    "resolution":"1 sec",
    "start":2.0

},
  {
    "index":4.0,
    "name":"Latitude",
    "unit":"Degrees N/S",
    "ctype":"INT32",
    "bytes":4.0,
    "min":-90000000.0,
    "max":90000000.0,
    "display_scale":1E-06,
    "display_offset":0.0,
    "real_range":"N+/S- 90.000000 as DD MM.MMMM N/S",
    "resolution":"~0.1m",
    "start":6.0

},
  {
    "index":5.0,
    "name":"Longitude",
    "unit":"Degrees E/W",
    "ctype":"INT32",
    "bytes":4.0,
    "min":-180000000.0,
    "max":180000000.0,
    "display_scale":1E-06,
    "display_offset":0.0,
    "real_range":"N+/S- 180.00000 as DDD MM.MMMM E/W",
    "resolution":"~0.1m@equator",
    "start":10.0

},
  {
    "index":6.0,
    "name":"Course",
    "unit":"Degrees",
    "ctype":"INT16",
    "bytes":2.0,
    "min":0.0,
    "max":3590,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0 to 359",
    "resolution":"1",
    "start":14.0

},
  {
    "index":7.0,
    "name":"Speed",
    "unit":"kn",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":16.0

},
  {
    "index":8.0,
    "name":"Monitor Battery",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":17.0

},
  {
    "index":9.0,
    "name":"Monitor Temperature",
    "unit":"C",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.5,
    "display_offset":0.0,
    "real_range":" -64.0 to +63.5",
    "resolution":"0.5",
    "start":18.0

},
  {
    "index":10.0,
    "name":"Monitor Humidity",
    "unit":"%",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":200.0,
    "display_scale":0.5,
    "display_offset":0.0,
    "real_range":" 0.0 to 100.0",
    "resolution":"0.5",
    "start":19.0

},
  {
    "index":11.0,
    "name":"Roll Mean",
    "unit":"deg",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":" -12.8 to +12.7",
    "resolution":"0.1",
    "start":20.0

},
  {
    "index":12.0,
    "name":"Pitch Mean",
    "unit":"deg",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":" -12.8 to +12.7",
    "resolution":"0.1",
    "start":21.0

},
  {
    "index":13.0,
    "name":"Roll Peak",
    "unit":"deg",
    "ctype":"INT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0 to 25.6",
    "resolution":"0.1",
    "start":22.0

},
  {
    "index":14.0,
    "name":"Pitch Peak",
    "unit":"deg",
    "ctype":"INT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0 to 25.6",
    "resolution":"0.1",
    "start":23.0

},
  {
    "index":15.0,
    "name":"Heave Peak",
    "unit":"g",
    "ctype":"INT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.001,
    "display_offset":0.0,
    "real_range":"0 to 0.256",
    "resolution":"0.001",
    "start":24.0

},
  {
    "index":16.0,
    "name":"Shock Peak",
    "unit":"g",
    "ctype":"INT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.01,
    "display_offset":0.0,
    "real_range":"0 to 2.56",
    "resolution":"0.01",
    "start":25.0

},
  {
    "index":17.0,
    "name":"AC Voltage 1",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"0 to 256",
    "resolution":"0.1",
    "start":26.0

},
  {
    "index":18.0,
    "name":"AC Voltage 2",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"0 to 256",
    "resolution":"0.1",
    "start":27.0

},
  {
    "index":19.0,
    "name":"DC Voltage 1",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":28.0

},
  {
    "index":20.0,
    "name":"DC Voltage 2",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":29.0

},
  {
    "index":21.0,
    "name":"DC Voltage 3",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":30.0

},
  {
    "index":22.0,
    "name":"Temperature 1",
    "unit":"C",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.5,
    "display_offset":0.0,
    "real_range":" -64.0 to +63.5",
    "resolution":"0.5",
    "start":31.0

},
  {
    "index":23.0,
    "name":"Temperature 2",
    "unit":"C",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.5,
    "display_offset":0.0,
    "real_range":" -64.0 to +63.5",
    "resolution":"0.5",
    "start":32.0

},
  {
    "index":24.0,
    "name":"Temperature 3",
    "unit":"C",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.5,
    "display_offset":0.0,
    "real_range":" -64.0 to +63.5",
    "resolution":"0.5",
    "start":33.0

},
  {
    "index":25.0,
    "name":"Water Level 1",
    "unit":"cm",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.1 to 25.6 cm",
    "resolution":"0.1",
    "start":34.0

},
  {
    "index":26.0,
    "name":"Water Level 2",
    "unit":"cm",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.1 to 25.6 cm",
    "resolution":"0.1",
    "start":35.0

},
  {
    "index":27.0,
    "name":"Water Level 3",
    "unit":"cm",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.1 to 25.6 cm",
    "resolution":"0.1",
    "start":36.0

},
  {
    "index":28.0,
    "name":"Pump Duty Cycle 1",
    "unit":"%",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":100.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"1%",
    "resolution":"0.01",
    "start":37.0

},
  {
    "index":29.0,
    "name":"Pump Duty Cycle 2",
    "unit":"%",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":100.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"1%",
    "resolution":"0.01",
    "start":38.0

},
  {
    "index":30.0,
    "name":"Pump Duty Cycle 3",
    "unit":"%",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":100.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"1%",
    "resolution":"0.01",
    "start":39.0

},
  {
    "index":31.0,
    "name":"Flags2",
    "unit":null,
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":255.0,
    "display_scale":null,
    "display_offset":0.0,
    "real_range":null,
    "resolution":null,
    "start":40.0

},
  {
    "index":32.0,
    "name":"Barometric Pressure",
    "unit":"kPa",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.1,
    "display_offset":101.3,
    "real_range":" 88.5 to 114.0 kPa",
    "resolution":"0.1",
    "start":41.0

},
  {
    "index":33.0,
    "name":"Wind Speed",
    "unit":"kn",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.25,
    "display_offset":0.0,
    "real_range":"0.0 to 64.0 kn",
    "resolution":"0.25",
    "start":42.0

},
  {
    "index":34.0,
    "name":"Temperature 4",
    "unit":"C",
    "ctype":"INT8",
    "bytes":1.0,
    "min":-128.0,
    "max":127.0,
    "display_scale":0.5,
    "display_offset":0.0,
    "real_range":" -64.0 to +63.5 C",
    "resolution":"0.5",
    "start":43.0

},
  {
    "index":35.0,
    "name":"Solar Cell Voltage",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":44.0

},
  {
    "index":36.0,
    "name":"Solar Cell Current",
    "unit":"A",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":45.0

},
  {
    "index":37.0,
    "name":"DC Voltage 4",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.0 to 25.6",
    "resolution":"0.1",
    "start":46.0

},
  {
    "index":38.0,
    "name":"AC Voltage 3",
    "unit":"V",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"0 to 256",
    "resolution":"1",
    "start":47.0

},
  {
    "index":39.0,
    "name":"Water Level 4",
    "unit":"cm",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":256.0,
    "display_scale":0.1,
    "display_offset":0.0,
    "real_range":"0.1 to 25.6 cm",
    "resolution":"0.1",
    "start":48.0

},
  {
    "index":40.0,
    "name":"Pump Duty Cycle 4",
    "unit":"%",
    "ctype":"UINT8",
    "bytes":1.0,
    "min":0.0,
    "max":100.0,
    "display_scale":1,
    "display_offset":0.0,
    "real_range":"1%",
    "resolution":"0.01",
    "start":49.0

},
  {
    "index":41.0,
    "name":"Message",
    "unit":null,
    "ctype":"Text",
    "bytes":340.0,
    "min":null,
    "max":null,
    "display_scale":null,
    "display_offset":null,
    "real_range":null,
    "resolution":null,
    "start":50.0

}
];
