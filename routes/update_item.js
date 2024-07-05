const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/update_item/:itemId', itemController.item_update_get);

router.post('/update_item/:itemId', itemController.item_update_post);

module.exports = router;