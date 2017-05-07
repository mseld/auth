var Service = require('../models/service').model;

exports.get = function(req, res) {
    Service.find(req.query, function(err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.getById = function(req, res) {
    Service.find({ _id: req.params.id }, function(err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.add = function(req, res) {
    var service = new Service(req.body);
    service.save(function(err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.update = function(req, res) {
    var service = req.body;
    delete service._id;
    Service.update({ _id: req.params.id }, service, function(err) {
        if (err) return res.status(400).json(err);
        return res.status(200).json({ success: true });
    });
};

exports.remove = function(req, res) {
    Service.remove({ _id: req.params.id }, function(err) {
        if (err) return res.status(400).json({ success: false });
        return res.status(200).json({ success: true });
    });
};