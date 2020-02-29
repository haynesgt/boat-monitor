const fs = require("fs");
const fields = require("./data-fields.js");

const dataSize = fields
  .map(field => field.bytes)
  .reduce((a,b) => a + b, 0);

const complement = (x, bits) => {
  if (x < 0) {
    throw new Error(`Cannot complement negative number ${x}`);;
  }
  if (x >= 2 ** bits) {
    throw new Error(`Cannot complement large number ${x} above ${2 ** bits}`);;
  }
  return 2 ** bits - x;
}

const zpad = (x, n) => {
  if (x.length > n) {
    throw new Error(`${x} was longer than padding ${n}`);
  }
  return x.length == n ? x : "0".repeat(n - x.length) + x;
}

const serialize = data => {
  let bytes = "";
  fields.forEach(field => {
    const fieldData = data[field.name] || 0;
    // bytes += ";" + field.name + ":";
    bytes += f = zpad(
      (
        field.ctype.startsWith("U") ?
          fieldData :
          fieldData >= 0 ? fieldData : complement(-fieldData, field.bytes * 8)
      ).toString(16),
      field.bytes * 2);
  });
  return bytes;
};

const deserialize = bytes => {
  const data = {};
  fields.forEach(field => {
    const fieldHexits = field.bytes * 2;
    if (bytes.length < fieldHexits) {
      return;
    }
    const slice = bytes.slice(0, fieldHexits);
    bytes = bytes.slice(fieldHexits);
    const rawValue = parseInt(slice, 16);
    data[field.name] = field.ctype.startsWith("U") ?
      rawValue :
      rawValue < 2 ** (field.bytes * 8 - 1) ?
        rawValue :
        -complement(rawValue, field.bytes * 8);
  });
  return data;
}

module.exports = {
  fields,
  dataSize,
  serialize,
  deserialize,
};

