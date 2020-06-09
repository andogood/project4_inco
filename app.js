const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const crypto = require('crypto');
const mysql = require('mysql');
//----------------------- routes -----------------------------
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
// -----------------------------------------------------------
// -----------------------added-------------------------------
// -----------------------------------------------------------
// to allow session id generation
var session = require('express-session');
var uuid = require('uuid');
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

const db = require('./util/database.js');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// -----------------------------------------------------------
// ------------------------added------------------------------
// -----------------------------------------------------------
app.engine('hbs', exphbs({
  extname: '.hbs'
}));

app.use(bodyParser.urlencoded({ extended: true }));
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// To parse cookies from the HTTP Request
app.use(cookieParser());


// -----------------------------------------------------------
// ------------------------added------------------------------
// -----------------------------------------------------------
//generating a cookie
// trust first proxy enables cookie generation over a http environment. Different for https.
app.set('trust proxy', 1) 
let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  genid: (req) => uuid.v4(),
  secret: 'secretpassword',
  resave: false,
  saveUninitialized: true,
  expires: expiryDate,
}));
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------


app.use('/', indexRouter);
app.use('/users', usersRouter);
// -----------------------------------------------------------
// ------------------------added------------------------------
// -----------------------------------------------------------
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------


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

app.all('*',(req, res)=>{
  res.send("<h1>Sorry, this page does not exist :( </h1>")
})


module.exports = app;


