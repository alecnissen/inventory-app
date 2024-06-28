const express = require('express');
const router = express.Router();
const createItemController = require('../controllers/create_itemController');

router.get('/', createItemController.create_item_get);

router.post('/', createItemController.create_items_post);

module.exports = router;