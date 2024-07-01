const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/:itemId', itemController.item_update_get);

router.post('/:itemId', itemController.item_update_post);

module.exports = router;