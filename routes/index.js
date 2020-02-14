const express = require('express');


const router = express.Router();
// const User = require('../models/users');
const Category = require('../models/categories');
const Article = require('../models/articles')
/* GET home page. */
router.get('/', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    return res.render('index', {
      title: 'Финам Вики',
      username: req.session.user.username,
      categories,
    });
  }
  res.render('login');
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

// router.get('/articles', async (req, res) => {
//   const articles = await Article.find();
//   console.log(articles);
//   res.render('view', { articles });
// });



module.exports = router;
