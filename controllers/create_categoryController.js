const asyncHandler = require("express-async-handler");


exports.create_category_get = (req, res, next) => {
    res.render('create_category', { title: 'Create Category' });
};


