function cookiesCleaner(req, res, next) {
  if (req.cookies.token && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/ourDbname');
  } else {
    next();
  }
};

const rolesChecker = (req, res, next) => {

};

module.exports = {
  sessionChecker,
  cookiesCleaner,
};
