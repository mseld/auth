var controller = require('../controller');

module.exports.setRoutes = function(app) {

    app.route('/api/providers')
        .get(controller.Provider.get)
        .post(controller.Provider.add);

    app.route('/api/providers/:id')
        .get(controller.Provider.getById)
        .put(controller.Provider.update)
        .delete(controller.Provider.remove);

    app.use('/api/providers', function(req, res, next) {
        if (req.method != 'POST' || req.method != 'GET')
            return res.sendMethodNotAllowedError('GET,POST');
    });

    app.use('/api/providers/:id', function(req, res, next) {
        if (req.method != 'GET' || req.method != 'PUT' || req.method != 'DELETE')
            return res.sendMethodNotAllowedError('GET,PUT,DELETE');
    });
};