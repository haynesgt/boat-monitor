const firestore = require("./firestore.js");
const packets = firestore.collection("packets");
module.exports = packets;
