const Item = require('../models/item');
const asyncHandler = require("express-async-handler");


// this should be moved to categoryController
exports.category_list = asyncHandler(async (req, res, next) => { 
    try {
        console.log('Category list controller called');
        const allCategories = await Category.find().exec();
        res.render('index', {
            title: 'Category List',
            category_list: allCategories
        });
    } catch (err) {
        console.error('Error fetching categories:', err);
        next(err);
    }
})

// render items view page 

// const categoryId = req.params.categoryId;
// const category = await Category.findById(categoryId);

exports.item_detail = asyncHandler(async (req, res, next) => {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);

    if (!item) {
      // No results.
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }
  
    res.render('item_detail', {
      title: "Item Detail",
      item: item,
    });
});




// delete an item GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);

    if (!item) {
        // Item not found, send a 404 error to indicate not found
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    // Render the item_detail view with the item details
    res.render('item_detail', {
        title: "Item Detail",
        item: item
    });
});

// delete an item POST 

exports.item_delete_post = asyncHandler(async (req, res, next) => { 
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);

    if (!item) { 
          // Item not found, send a 404 error to indicate not found
       const err = new Error('Item not found');
       err.status = 404;
       return next(err); 
    }

    res.redirect(`/categories/${item.category}`);
})


