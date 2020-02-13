/* eslint-disable no-alert */
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
      // eslint-disable-next-line no-unused-vars
      const { username } = userCheck;
      console.log(username);
      res.render('index', { username });
      // res.redirect('/');
    } else {
      // eslint-disable-next-line no-alert
      alert('wrong data');
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
