const express = require('express');

const router = express.Router();
const User = require('../models/users');

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const userCheck = await User.findOne({ login });
    if (userCheck.login === login && userCheck.password === password) {
      req.session.user = userCheck;
      res.redirect('/');
    } else {
      alert('wrong data');
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line no-unused-vars
router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('token');
      res.redirect('/');
    } catch (err) {
      res.redirect('/');
    }
  }
});

module.exports = router;
