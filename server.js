var path = require('path');
var http = require('http');
var cors = require('cors');
var express = require('express');
var multer = require('multer');
var logger = require('morgan');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');

var config = require('./config');

mongoose.connect(config.mongodb);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('connected', function() {
    console.log('mongo db connected');
});

db.once('open', function() {
    console.log('mongo db opened');
});

var app = express();
app.set('port', process.env.PORT || config.port);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());
app.use(logger('dev'));
app.use(cors());
// app.use(helmet());
app.use(methodOverride());
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./api/routes');
routes.setRoutes(app);

// error handling middleware should be loaded after the loading the routes
app.use(errorHandler());

var server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});