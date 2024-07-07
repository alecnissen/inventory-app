const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// CRUD operations



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
});


// Display a detail page for a specific category 

exports.category_detail = asyncHandler(async (req, res, next) => { 
    try { 
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);

        if (!category) { 
            const err = new Error('Category not found');
            err.status = 404;
            throw err;
        }

        const items = await Item.find({ category: categoryId })

        res.render('category_detail', { 
            title: 'Category Detail',
            category,
            items
        });

    } catch (err) { 
        console.error('Error fetching category details:', err);
        next(err);
    }
});


////////

// updating category controllers here 

exports.category_update_get = asyncHandler(async (req, res, next) => {
    
    try {
      // Find the item by ID
     
      const categoryId = req.params.categoryId;
      const category = await Category.findById(categoryId);

      if (!category) {
        // Item not found, send a 404 error to indicate not found
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      
      // Fetch all categories
      console.log("Categories fetched:", category); // Logging fetched categories
      
      // Render the form with item and categories data
      res.render('update_category', {
        title: "Update Category",
        category: category,
      });
    } catch (error) {
      console.error("Error fetching item or categories:", error);
      return next(error);
    }
  });



  // post request 

  exports.category_update_post = [
    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("description", "Description must not be empty.")
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
  
      
      const newCategory = {
        name: req.body.name,
        description: req.body.description
      };
  
      
      const categories = await Category.find();
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        res.render('update_category', {
        newCategory,
        errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid. Update the record.
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, newCategory, {
          new: true,
        });
        // Redirect to item detail page.
        // original
        res.redirect('/');
        // res.redirect(`/items/${updatedItem._id}`);
      }
    }),
  ];
  




