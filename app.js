const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('connect-flash');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');


// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes.js')(app, passport);
// load our routes and pass in our app and fully configured passport

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});


// launch ======================================================================
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});