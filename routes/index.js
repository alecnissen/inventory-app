var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET home page. */




router.get('/', categoryController.category_list);



module.exports = router;


// render category list on the homepage 