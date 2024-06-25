// const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// CRUD operations

// view category

// exports.author_list = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: Author list");
//   });




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
