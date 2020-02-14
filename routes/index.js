const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.render('index', {
      title: 'Express',
      username: req.session.user.username,
    });
  }
  res.render('index', {
    title: 'Express',
  });
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


module.exports = router;
