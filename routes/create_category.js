const express = require('express');
const router = express.Router();
const createCategoryController = require('../controllers/create_categoryController');

// Define the route for '/create_category'
router.get('/', createCategoryController.create_category_get);

module.exports = router;




