var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET category page. */

router.get('/', categoryController.category_list);



module.exports = router;


