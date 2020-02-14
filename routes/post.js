const router = require('express').Router();
const Article = require('../models/articles');

router.post('/', (req, res) => {
  const { title, category, content } = req.body;
  console.log(title, category, content);
  res.json('Hello!');
});


module.exports = router;
