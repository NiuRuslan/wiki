const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('articles/new', { title: 'Express' });
});

module.exports = router;
