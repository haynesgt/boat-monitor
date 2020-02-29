const firestore = require("./firestore.js");
const requests = firestore.collection("requests");
module.exports = requests;
