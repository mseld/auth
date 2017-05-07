var controller = require('../controller');

module.exports.setRoutes = function(app) {

    app.route('/api/builder/:id')
        .get(controller.Builder.getById);

    app.route('/api/builder')
        .get(controller.Builder.get)
        .post(controller.Builder.invoke);

    app.use('/api/builder', function(req, res, next) {
        if (req.method != 'GET' || req.method != 'POST')
            return res.sendMethodNotAllowedError('GET,POST');
    });

    app.use('/api/builder/:id', function(req, res, next) {
        if (req.method != 'GET')
            return res.sendMethodNotAllowedError('GET');
    });
};