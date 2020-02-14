const express = require('express');
const Category = require('../models/categories.js');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
//   console.log(categories);
    return res.render('index', {
      title: 'Финам Вики',
      username: req.session.user.username,
      categories
    });
  }
  // res.render('articles/edit', {title: 'Финам Вики'});
  res.render('login', {title: 'Финам Вики'});
});

/* exit from session */
router.get('/logout', async (req, res) => {
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

// router.get('/add', async (req, res) => {
//   const categories = await Category.find();
//   console.log(categories);
//   res.render('articles/new', { categories });
// });


module.exports = router;
