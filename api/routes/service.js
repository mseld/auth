var controller = require('../controller');

module.exports.setRoutes = function(app) {

    app.route('/api/services')
        .get(controller.Service.get)
        .post(controller.Service.add);

    app.route('/api/services/:id')
        .get(controller.Service.getById)
        .put(controller.Service.update)
        .delete(controller.Service.remove);

    app.use('/api/services', function(req, res, next) {
        if (req.method != 'POST' || req.method != 'GET')
            return res.sendMethodNotAllowedError('GET,POST');
    });

    app.use('/api/services/:id', function(req, res, next) {
        if (req.method != 'GET' || req.method != 'PUT' || req.method != 'DELETE')
            return res.sendMethodNotAllowedError('GET,PUT,DELETE');
    });
};