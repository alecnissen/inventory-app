var createError = require('http-errors');
var express = require('express');
const methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');

const createCategoryRouter = require('./routes/create_category');
const createItemRouter = require('./routes/create_item');
const categoryDetail = require('./routes/categories');
const itemsRouter = require('./routes/items');
const deleteItemRouter = require('./routes/delete_item');

var app = express();

// mongoose connection 

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://alecnissen:mjn@cluster0.bzhr9kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create_category', createCategoryRouter);
app.use('/create_item', createItemRouter);
app.use('/categories', categoryDetail);

app.use('/items', itemsRouter);

app.use('/delete_item', deleteItemRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
