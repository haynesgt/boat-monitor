const assert = require("assert");

const dataFormat = require("../src/data-format.js");
const dataFixture = require("./data-fixture.js");

describe("dataFormat", function() {
  describe("toHex", function() {
    const testCases = [
      {
        "name": "ffff",
        "data": dataFixture.ffff.raw,
        "hex": "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      },
      {
        "name": "0000",
        "data": dataFixture.zzzz.raw,
        "hex": "00000000000000000000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        "name": "high",
        "data": dataFixture.high.raw,
        "hex": "ffff7fffffff7fffffff7fffffff7fffffff7fff7f7f7f7f7f7fffffffffff7f7f7fffffffffffff"
      },
      {
        "name": "low",
        "data": dataFixture.low.raw,
        "hex": "00008000000080000000800000008000000080008080808080800000000000808080000000000000"
      },
      {
        "name": "example",
        "data": dataFixture.example.raw,
        "hex": "a5015e5303d302f022f00753115101595f80244edfeb362a391c757a88837b27d52d0d3717041207"
      },
    ];
    testCases.forEach(({name, data, hex}) => {
      it(`should toHex ${name}`, function() {
        const actual = dataFormat.toHex(data);
        assert.equal(actual, hex.padEnd(actual.length, "0"))
      });
      it(`should fromHex ${name}`, function() {
        assert.equal(
          JSON.stringify(dataFormat.fromHex(hex), null, 2),
          JSON.stringify(data, null, 2));
      });
    });
  });
});

