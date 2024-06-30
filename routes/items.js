var express = require('express');
var router = express.Router();

const itemController = require('../controllers/itemController');
const item = require('../models/item');

router.get('/:itemId', itemController.item_detail);

// router.delete('/:itemId', itemController.item_delete_post);

// router.delete('/:itemId', itemController.item_delete_post);

module.exports = router;