const { body, validationResult } = require("express-validator");
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
    const categories = await Category.find();

    if (!item) {
        // Item not found, send a 404 error to indicate not found
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    // Render the item_detail view with the item details
    res.render('create_item', {
        title: "Update Item",
        item: item,
        categories: categories,
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

// update an item GET 

// exports.item_update_get = asyncHandler(async (req, res, next) => { 
//     const itemId = req.params.itemId;
//        // Find the item by ID
//     const item = await Item.findById(itemId);
//     const categories = await Category.find();

//     if (!item) {
//         // Item not found, send a 404 error to indicate not found
//         const err = new Error("Item not found");
//         err.status = 404;
//         return next(err);
//     }

    
//     res.render('create_item', {
//         title: "Update Item",
//         item: item,
//         categories: categories,
//     });
// })



exports.item_update_get = asyncHandler(async (req, res, next) => {
  const itemId = req.params.itemId;
  
  try {
    // Find the item by ID
    const item = await Item.findById(itemId);
    if (!item) {
      // Item not found, send a 404 error to indicate not found
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }
    
    // Fetch all categories
    const categories = await Category.find();
    if (!categories || categories.length === 0) { // Check if categories array is empty
      const err = new Error("Categories not found");
      err.status = 404;
      return next(err);
    }
    
    console.log("Categories fetched:", categories); // Logging fetched categories
    
    // Render the form with item and categories data
    res.render("create_item", {
      title: "Update Item",
      item: item,
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching item or categories:", error);
    return next(error);
  }
});



// update an item POST 
// Handle item update on POST.

exports.item_update_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("numberInStock", "Number in stock must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("aisle", "Aisle must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(), 

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an item object with escaped/trimmed data and old id.
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      aisle: req.body.aisle,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render('create_item', {
        item: newItem,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, newItem, {
        new: true,
      });
      // Redirect to item detail page.
      res.redirect(`/items/${updatedItem._id}`);
    }
  }),
];

  


