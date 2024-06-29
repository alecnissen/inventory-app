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
    // Get details of author and all their books (in parallel)
    const [item] = await Promise.all([
      Item.findById(req.params.id).exec(),
    //   Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
  
    if (item === null) {
      // No results.
      res.redirect('/:categoryId');
    }

    // route for a specific item? 
  
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: allBooksByAuthor,
    });
  });

