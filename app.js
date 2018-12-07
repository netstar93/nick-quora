var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http  = require('http');
var session = require('express-session');
var flash = require('connect-flash');

var reload = require('reload');
var engine = require('ejs-locals');

var MemoryStore = session.MemoryStore;

var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.Port || 8000);
app.use(flash());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name : 'app.sid',
    secret: 'quora_ssd',
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true
}));


app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));

app.use(function (req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.message = req.flash();
  next();
  //next(createError(404));
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

global._log = function(data) {
    console.log(data);
}

var server = http.createServer(app)
reload(app);
server.listen(app.get('port') , function(){
    console.log('Running on port ' +app.get('port'));
})

module.exports = app;
