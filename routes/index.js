var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your Quora' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Quora- Explore Yourself' });
});

module.exports = router;
