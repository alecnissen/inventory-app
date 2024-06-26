const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

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