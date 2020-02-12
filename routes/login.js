const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const userCheck = await User.findOne({email: email });
    if (userCheck.email === email && userCheck.password === password) {
      req.session.user = userCheck;
      res.redirect('/');
    } else {
      alert('wrong data')
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

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
