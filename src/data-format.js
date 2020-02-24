const fields = [
    {
      "name": "Flags1",
      "type": "UINT8",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Boat Status",
      "type": "Message",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Date and Time",
      "type": "Unix time",
      "ctype": "INT32",
      "bytes": 4
    },
    {
      "name": "Latitude",
      "type": "Degrees N/S",
      "ctype": "INT32",
      "bytes": 4
    },
    {
      "name": "Longitude",
      "type": "Degrees E/W",
      "ctype": "INT32",
      "bytes": 4
    },
    {
      "name": "Course",
      "type": "Degrees",
      "ctype": "INT16",
      "bytes": 2
    },
    {
      "name": "Speed",
      "type": "kn",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Monitor Battery",
      "type": "V",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Monitor Temperature",
      "type": "C",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Monitor Humidity",
      "type": "%",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Roll Mean",
      "type": "deg",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Pitch Mean",
      "type": "deg",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Roll Peak",
      "type": "deg",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Pitch Peak",
      "type": "deg",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Heave Peak",
      "type": "g",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Shock Peak",
      "type": "g",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "AC Voltage 1",
      "type": "V",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "AC Voltage 2",
      "type": "V",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "DC Voltage 1",
      "type": "V",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "DC Voltage 2",
      "type": "V",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "DC Voltage 3",
      "type": "V",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Temperature 1",
      "type": "C",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Temperature 2",
      "type": "C",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Temperature 3",
      "type": "C",
      "ctype": "INT8",
      "bytes": 1
    },
    {
      "name": "Water Level 1",
      "type": "cm",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Water Level 2",
      "type": "cm",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Water Level 3",
      "type": "cm",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Pump Duty Cycle 1",
      "type": "%",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Pump Duty Cycle 2",
      "type": "%",
      "ctype": "UINT8",
      "bytes": 1
    },
    {
      "name": "Pump Duty Cycle 3",
      "type": "%",
      "ctype": "UINT8",
      "bytes": 1
    }
  ];

const dataSize = fields
  .map(f => f.bytes)
  .reduce((a,b) => a + b, 0);

const complement = (x, bits) => {
  return x >= 0 ? x : 2 ** bits + x;
}

const zpad = (x, n) => {
  if (x.length > n) {
    throw new Exception(`${x} was longer than padding ${n}`);
  }
  return x.length == n ? x : "0".repeat(n - x.length) + x;
}

const serialize = data => {
  let bytes = "";
  fields.forEach(field => {
    const fieldData = data[field.name] || 0;
    // bytes += ";" + field.name + ":";
    bytes += zpad(
      (
        field.ctype.startsWith("U") ?
          fieldData :
          complement(fieldData, field.bytes * 8)
      ).toString(16),
      field.bytes * 2);
  });
  return bytes;
};

module.exports = {
  fields,
  dataSize,
  serialize
};

