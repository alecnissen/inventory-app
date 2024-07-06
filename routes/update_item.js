const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');


// original
// router.get('/', itemController.item_update_get);

// router.post('/', itemController.item_update_post);


router.get('/:itemId', itemController.item_update_get);
router.post('/:itemId', itemController.item_update_post);

module.exports = router;


// modified

// const express = require('express');
// const router = express.Router();

// const itemController = require('../controllers/itemController');

// // Route to display the update form for a specific item
// router.get('/:itemId/update', itemController.item_update_get);

// // Route to handle the update post for a specific item
// router.post('/:itemId/update', itemController.item_update_post);

// module.exports = router;
