const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// CRUD operations

// view category

// exports.author_list = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: Author list");
//   });










//Just for future error checking, the req, res, next have to be in this order. I wrote them backwards one time and it took hours to find the issue.
exports.category_list = asyncHandler(async (req, res, next) => {
  //allCategories is the variable you will save your category list in
  //Category.find() retrieves all objects from the category collection
  //You could use a sort if you want them sorted a certain way like you did in the authors
  //exec() executes a query and returns a promise, await waits for that promise (retrieved data here) so the category list populates before the function moves on
  const allCategories = await Category.find().exec();
  //res.render("category_list") the category_list will be the name of the view template that is rendered
  res.render("category_list", {
    //the title will be the title variable on the category_list view template page
    
    //the category_list variable here will render all categories
    category_list: allCategories,
  });
});
