var path = require('path');
var provider = require('./provider');
var service = require('./service');
var builder = require('./builder');

module.exports.setRoutes = function(app) {
    app.get('/', function(req, res) {
        //var index = path.join(process.cwd(), 'web', 'index.ejs');
        res.render('admin');
    });

    app.get('/admin', function(req, res) {
        //var index = path.join(process.cwd(), 'web', 'index.ejs');
        res.render('admin');
    });

    //A Route for Creating a 500 Error (Useful to keep around)
    app.get('/500', function(req, res) {
        throw new Error('This is a 500 Error');
    });

    provider.setRoutes(app);
    service.setRoutes(app);
    builder.setRoutes(app);

    //The 404 Route (ALWAYS Keep this as the last route)
    // app.get('/*', function(req, res) {
    //     throw new NotFound();
    // });
};

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.caller);
}