const express = require('express');
const Category = require('../models/categories.js');

const router = express.Router();
const Article = require('../models/articles');
/* GET home page. */
router.get('/', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    //   console.log(categories);
    return res.render('index', {
      title: 'Финам Вики',
      username: req.session.user.username,
      categories,
    });
  }
  // res.render('articles/edit', {title: 'Финам Вики'});
  res.render('login');
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

router.get('/addUser', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    const articles = await Article.find({ category: req.params.id });
    return res.render('addUser', { categories, articles, username: req.session.user.username });
  }
  res.render('login');
});

router.get('/articles/:id', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    const articles = await Article.find({ category: req.params.id });
    return res.render('articles/view', { categories, articles, username: req.session.user.username });
  }
  res.render('login');
});

router.get('/article/:id', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    const article = await Article.findById(req.params.id);

    return res.render('articles/article', { categories, article, username: req.session.user.username });
  }
  res.render('login');
});

module.exports = router;
