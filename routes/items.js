var express = require('express');
var router = express.Router();

const itemController = require('../controllers/itemController');
const item = require('../models/item');

router.get('/:itemId', itemController.item_detail);

module.exports = router;