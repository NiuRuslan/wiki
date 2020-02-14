const express = require('express');

const router = express.Router();
const User = require('../models/users');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.user) {
    return res.render('index', {
      title: 'Финам Вики',
      username: req.session.user.username,
    });
  }
  // res.render('articles/edit', {title: 'Финам Вики'});
  res.render('index', {title: 'Финам Вики'});
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
