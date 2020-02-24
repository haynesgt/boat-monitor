module.exports = {
  savePacket: (req, res) => {
    const data = req.body;
    res.send(`Got ${JSON.stringify(data)}`);
  }
};
