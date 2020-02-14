function cookiesCleaner(req, res, next) {
  if (req.cookies.token && !req.session.user) {
    res.clearCookie('token');
  }
  next();
}

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login'); // ИСПРАВИТЬ ПУТЬ
  } else {
    next();
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = {
  sessionChecker,
};
