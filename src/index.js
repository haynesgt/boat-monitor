/*
imei The unique IMEI of your RockBLOCK 300234010753370
momsn The Message Sequence Number 12345
transmit_time The date & time (always UTC) that the message was transmitted.  12-10-10 10:41:50
iridium_latitude The approximate latitude of the RockBLOCK at the time it transmitted.  52.3867
iridium_longitude The approximate longitude of the RockBLOCK at the time it transmitted.  0.2938
iridium_cep An estimate of the accuracy (in km) of the position information in the previous two fields.  8
data Your message, hex-encoded. 48656c6c6f20576f726c6420526f636b424c4f434b
*/

const dataFormat = require("./data-format.js");

module.exports = {
  savePacket: (req, res) => {
    const body = req.body;
    const data = body.data;
    res.send(`Got ${JSON.stringify(body)}`);
  }
};
