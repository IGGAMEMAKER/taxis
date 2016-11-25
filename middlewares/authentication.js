module.exports = {
  isAuthenticated: (req, res, next) => {
    if (true) { // check authentication
      next();
    } else {
      res.status(501);
    }
  },

  isAdmin: (req, res, next) => {
    if (true) { // check authentication
      next();
    } else {
      res.status(501);
    }
  }
};
