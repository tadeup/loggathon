const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');
const logger = require('morgan');

const {ensureAuthenticated} = require('./middlewares/authenticate');
const {mongoose} = require('./config/mongoose');

// Init express app
var app = express();

// Socket.io set up
const io = require('./sockets/io').listen();
app.set("io", io);

// Require routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const logistaRouter = require('./routes/logista');
const motoristaRouter = require('./routes/motorista');
const authRouter = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

// Standard Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session set up
app.use(session({
    secret: process.env.EXPRESS_SESSION_PW,
    saveUninitialized: true,
    resave: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// setup Express-validator
app.use(expressValidator());

// Connect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Set routes middlewares
app.use('/', indexRouter);
app.use('/users', ensureAuthenticated, usersRouter);
app.use('/logista', logistaRouter);
app.use('/motorista', motoristaRouter);
app.use('/auth', authRouter);

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
