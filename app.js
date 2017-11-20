var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

var app = express();
// app.use(bodyParser.urlencoded({ extended: false}));

// app.set('view engine', 'pug');

// // app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.use(express.static(__dirname + '/public'));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(8080, () => {
  console.log('The application is running on localhost:8080!');
});
