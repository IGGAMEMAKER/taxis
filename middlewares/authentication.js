module.exports = (req, res, next) => {
  if (true) { // checck authentication
    next();
  } else {
    res.status(501);
  }
};
