const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.delete('/:itemId', itemController.item_delete_post);

module.exports = router;