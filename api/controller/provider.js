var Provider = require('../models/provider').model;

exports.get = function(req, res) {
    Provider.find(req.query, function(err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.getById = function(req, res) {
    Provider.find({ _id: req.params.id }, function(err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.add = function(req, res) {
    var provider = new Provider(req.body);
    provider.save(function(err, data) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
};

exports.update = function(req, res) {
    var provider = req.body;
    delete provider._id;
    Provider.update({ _id: req.params.id }, provider, function(err) {
        if (err) return res.status(400).json(err);
        return res.status(200).json({ success: true });
    });
};

exports.remove = function(req, res) {
    Provider.remove({ _id: req.params.id }, function(err) {
        if (err) return res.status(400).json({ success: false });
        return res.status(200).json({ success: true });
    });
};