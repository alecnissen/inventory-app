const { body, validationResult } = require("express-validator");

const Item = require('../models/item');


exports.create_item_get = (req, res, next) => { 
    res.render('create_item', { title: 'Create Item'});
}




// post for creating items 

// refactoring for items

exports.create_items_post = [
    // Validate and sanitize the name field.
    body("name", "category name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a genre object with escaped and trimmed data.
      const item = new Item({ 
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
        aisle: req.body.aisle
    });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("create_category", {
          title: "Create Category",
          category: category,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        const categoryExists = await Category.findOne({ name: req.body.name })
          .collation({ locale: "en", strength: 2 })
          .exec();
        if (categoryExists) {
          // Genre exists, redirect to its detail page.
          res.redirect(categoryExists.url);
        } else {
          await category.save();
          // New genre saved. Redirect to genre detail page.
          res.redirect('/create_category');
        }
      }
    }),
  ];


