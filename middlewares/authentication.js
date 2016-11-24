module.exports = (req, res, next) => {
  if (true) { // check authentication
    next();
  } else {
    res.status(501);
  }
};
