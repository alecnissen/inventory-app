const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require('../models/item');


exports.create_item_get = (req, res, next) => { 
    res.render('create_item', { title: 'Create Item'});
}




// post for creating items 

// refactoring for items

exports.create_items_post = [
    // Validate and sanitize the name field.
    body("name", "item name must contain at least 3 characters")
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
        res.render("create_item", {
          title: "Create Item",
          item: item,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        const itemExists = await Item.findOne({ name: req.body.name })
          .collation({ locale: "en", strength: 2 })
          .exec();
        if (itemExists) {
          // Genre exists, redirect to its detail page.
          res.redirect(itemExists.url);
        } else {
          await item.save();
          // New genre saved. Redirect to genre detail page.
          res.redirect('/create_item');
        }
      }
    }),
  ];


