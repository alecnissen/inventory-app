const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Item = require('../models/item');
const Category = require("../models/category");

exports.create_item_get = asyncHandler(async (req, res, next) => { 
    try { 
        const categories = await Category.find().exec();
        res.render('create_item', {title: 'Create Item', categories, item: {} })
    } catch (err) { 
        return next(err);
    }
})

exports.create_items_post = [
  // Validate and sanitize the name field.
body("name", "Item name must be completed.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
body("description", "Item description must be completed.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
body("category", "Category id must be completed.")
  .notEmpty()
  .escape(),
body("price", "Item price must be completed.")
  .trim()
  .isLength({ min: 4 })
  .escape(),
body("number_in_stock", "Number in stock must be completed.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
body("aisle", "Aisle is missing.")
  .trim()
  .isLength({ min: 1 })
  .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({ 
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      aisle: req.body.aisle
    });

    const categories = await Category.find();

    if (!errors.isEmpty()) {
      res.render("create_item", {
        title: "Create Item",
        item: item,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {
      const itemExists = await Item.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (itemExists) {
        res.redirect(itemExists.url);
      } else {
        await item.save();
        res.redirect('/create_item'); 
      }
    }
  }),
];
