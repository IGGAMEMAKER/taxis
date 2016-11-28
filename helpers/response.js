module.exports = {
  error: (tag, res) => e => {
    res.status(500).json({ code: tag, message: e });
  },

  send: res => result => {
    res.json({ msg: result });
  }
};
