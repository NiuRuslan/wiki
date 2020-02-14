const router = require('express')
  .Router();
const Article = require('../models/articles');
const Category = require('../models/categories');

router.get('/', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    return res.render('articles/new', {
      username: req.session.user.username,
      categories,
    });
  }
  res.render('login');
});

router.post('/', async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const newPost = await new Article({
      title,
      content,
      category,
    });
    newPost.save();
    res.redirect('/')
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;
