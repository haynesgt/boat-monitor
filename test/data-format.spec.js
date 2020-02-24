const assert = require("assert");

const dataFormat = require("../src/data-format.js");
const dataFixture = require("./data-fixture.js");

describe("dataFormat", () => {
  describe("serialize", () => {
    it("should serialize ff...", () => {
      assert.equal(
          dataFormat.serialize(dataFixture.ffff),
          "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    });
    it("should serialize 00...", () => {
      assert.equal(
          dataFormat.serialize(dataFixture.zzzz),
          "00000000000000000000000000000000000000000000000000000000000000000000000000000000");
    });
    it("should serialize max values", () => {
      assert.equal(
          dataFormat.serialize(dataFixture.high),
          "ffff7fffffff7fffffff7fffffffffffffff7fff7f7f7f7f7f7fffffffffff7f7f7fffffffffffff");
    });
    it("should serialize min values", () => {
      assert.equal(
          dataFormat.serialize(dataFixture.low),
          "00008000000080000000800000008000000080008080808080800000000000808080000000000000");
    });
  });
});

