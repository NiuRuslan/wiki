const express = require('express');
const Category = require('../models/categories.js');

const router = express.Router();
// eslint-disable-next-line no-unused-vars
const Article = require('../models/articles.js');

router.get('/', async (req, res) => {
  if (req.session.user) {
    await res.render('index', {
      username: req.session.user.username,

    });
  }
  await res.render('login');
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


router.get('/add', async (req, res) => {
  const categories = await Category.find();
  console.log(categories);
  res.render('articles/new', { categories });
});

// router.post('/add', async (req, res) => {
//   console.log(req.body);
//   const post1 = await new Article({
//     title: req.body.title,
//     content: req.body.content,
//   //   category: req.body.category.title,
//   //   user: req.body.user.username,
//   }).save();
//   res.end();
// });


module.exports = router;
