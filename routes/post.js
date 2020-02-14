const router = require('express')
  .Router();
const Article = require('../models/articles');
const Category = require('../models/categories');

router.post('/', async (req, res) => {
  try {
    const { title, category, content } = req.body;
    console.log('CATEGORY', category);
    const correctCategory = await Category.findById(category);
    const newPost = await new Article({
      title,
      content,
      category
    });
    newPost.save();
  } catch (e) {
    console.log(e);
  }
  res.end();
});


module.exports = router;
