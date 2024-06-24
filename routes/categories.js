var express = require('express');
var router = express.Router();

/* GET category page. */
router.get('/categories', function(req, res, next) {
  res.render('categories', { title: 'Express' });
});

module.exports = router;
