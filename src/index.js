/*
HTTP request form parameters:
imei The unique IMEI of your RockBLOCK 300234010753370
momsn The Message Sequence Number 12345
transmit_time The date & time (always UTC) that the message was transmitted.  12-10-10 10:41:50
iridium_latitude The approximate latitude of the RockBLOCK at the time it transmitted.  52.3867
iridium_longitude The approximate longitude of the RockBLOCK at the time it transmitted.  0.2938
iridium_cep An estimate of the accuracy (in km) of the position information in the previous two fields.  8
data Your message, hex-encoded. 48656c6c6f20576f726c6420526f636b424c4f434b
*/

const packetEncoding = require("./packet-encoding.js");

const requests = require("./requests.js");

const packets = require("./packets.js");

function saveRequest(body) {
  if (body.data) {
    try {
      const request = requests.doc();
      await request.create(body);
      console.log(`Saved request ${request.id}`);
      return request;
    } catch(e) {
      console.error("Failed to save the request", e);
    }
  } else {
    console.error("Got a request with no body");
    return null;
  }
}

module.exports = {
  savePacket: async (req, res) => {
    const body = req.body;
    // save request data
    const request = saveRequest(body);
    // parse packet data
    if (body.data && body.data.length == 80) {
      const data = packetEncoding.deserialize(body.data);
      const packet = packets.doc();
      try {
        await packet.create({data, request, recieved: new Date()});
        console.log(`Saved packet ${packet.id}`);
      } catch(e) {
        console.error("Failed to save the packet", e);
      }
      res.send(`Request and parsed data:\n${JSON.stringify({body, data}, null, 2)}`);
    } else {
      const msg = `Body data had wrong length: ${body.data && body.data.length}`;
      console.error(msg);
      res.send(msg);
    }
  },
  getPackets: async (req, res) => {
    res.json((await packets.orderBy("recieved", "desc").get()).docs.map(d => d.data().data));
  }
};
