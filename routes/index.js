var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Roy\'s Projects',
    list: [
      {name: "Original Smart Dots", link: "original-smart-dots"} ,
      {name: "Smart dots (Under Construction)", link: "smart-dots" },
      {name: "Platformer", link: "platformer"},
      {name: "Chinese Song Association", link: "chinese-song-association"}
  ]
  });
});

module.exports = router;
