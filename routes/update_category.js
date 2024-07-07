const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/:categoryId', categoryController.category_update_get);

router.post('/:categoryId', categoryController.category_update_post);

module.exports = router;