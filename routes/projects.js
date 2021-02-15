var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/original-smart-dots', function(req, res, next) {
  res.render('original-smart-dots', { title: 'Original Smart Dots' });
});

router.get('/smart-dots', function(req, res, next) {
  res.render('smart-dots', { title: 'Smart dots' });
});

router.get('/platformer', function(req, res, next) {
  res.render('platformer', { title: 'Platformer' });
});

router.get('/chinese-song-association', function(req, res, next) {
  res.render('chinese-song-association', { title: 'Chinese Song Association' });
});


module.exports = router;
