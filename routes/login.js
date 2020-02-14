const express = require('express');

const router = express.Router();
const User = require('../models/users');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login');
});

// authentication
router.post('/', async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const userCheck = await User.findOne({ login });
    if (userCheck.login === login && userCheck.password === password) {
      req.session.user = userCheck;
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
