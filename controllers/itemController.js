const { body, validationResult } = require("express-validator");
const Item = require('../models/item');
const Category = require("../models/category");
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
        title: "Delet Item",
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
    res.render('update_item', {
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
    // original
    // const newItem = new Item({
    //   name: req.body.name,
    //   description: req.body.description,
    //   category: req.body.category,
    //   price: req.body.price,
    //   numberInStock: req.body.numberInStock,
    //   aisle: req.body.aisle,
    // });


    // do not create a new instance, create a new object. 

    
    const newItem = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      aisle: req.body.aisle,
    };

    console.log(newItem);
    

    const categories = await Category.find();

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render('update_item', {
        item: newItem,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, newItem, {
        new: true,
      });
      // Redirect to item detail page.
      // original
      res.redirect('/');
      // res.redirect(`/items/${updatedItem._id}`);
    }
  }),
];

































// modifed update GET and POST 


// exports.item_update_get = asyncHandler(async (req, res, next) => {
//   const itemId = req.params.itemId;
  
//   try {
//     const item = await Item.findById(itemId);
//     if (!item) {
//       const err = new Error("Item not found");
//       err.status = 404;
//       return next(err);
//     }
    
//     const categories = await Category.find();
//     if (!categories || categories.length === 0) {
//       const err = new Error("Categories not found");
//       err.status = 404;
//       return next(err);
//     }
    
//     res.render('update_item', {
//       title: "Update Item",
//       item: item,
//       categories: categories,
//     });
//   } catch (error) {
//     console.error("Error fetching item or categories:", error);
//     return next(error);
//   }
// });

// exports.item_update_post = [
//   body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
//   body("description", "Description must not be empty.").trim().isLength({ min: 1 }).escape(),
//   body("category", "Category must not be empty.").trim().isLength({ min: 1 }).escape(),
//   body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape(),
//   body("numberInStock", "Number in stock must not be empty.").trim().isLength({ min: 1 }).escape(),
//   body("aisle", "Aisle must not be empty.").trim().isLength({ min: 1 }).escape(),

//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req);

//     const updateData = {
//       name: req.body.name,
//       description: req.body.description,
//       category: req.body.category,
//       price: req.body.price,
//       numberInStock: req.body.numberInStock,
//       aisle: req.body.aisle,
//     };

//     if (!errors.isEmpty()) {
//       const categories = await Category.find();
//       res.render('update_item', {
//         item: updateData,
//         categories: categories,
//         errors: errors.array(),
//       });
//       return;
//     }

//     const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, updateData, {
//       new: true,
//     });

//     if (!updatedItem) {
//       const err = new Error("Item not found");
//       err.status = 404;
//       return next(err);
//     }

//     res.redirect(`/items/${updatedItem._id}`);
//   }),
// ];




