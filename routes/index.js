const express = require('express');
const Category = require('../models/categories.js');

const router = express.Router();
// const User = require('../models/users');
const Category = require('../models/categories');
const Article = require('../models/articles');
/* GET home page. */
router.get('/', async (req, res) => {
  if (req.session.user) {
    return res.render('index', {
      title: 'Финам Вики',
      username: req.session.user.username,
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

router.get('/articles/:id', async (req, res) => {
  const categories = await Category.find();
  const articles = await Article.find({ category: req.params.id });
  res.render('articles/view', { categories, articles });
});

router.get('/article/:id', async (req, res) => {
  const categories = await Category.find();
  const article = await Article.findById(req.params.id);

  return res.render('articles/article', { categories, article });
});

module.exports = router;
