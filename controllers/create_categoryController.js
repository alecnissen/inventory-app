const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Category = require("../models/category");

exports.create_category_get = (req, res, next) => {
    res.render('create_category', { title: 'Create Category' });
};



// POST, form submission 

// Handle category create on POST.
exports.create_category_post = [
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
      const category = new Category({ 
        name: req.body.name,
        description: req.body.description
    
    
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
  