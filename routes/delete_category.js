const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');


router.delete('/:categoryId', categoryController.category_delete_post);

module.exports = router;