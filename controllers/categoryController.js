// const { body, validationResult } = require("express-validator");

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
