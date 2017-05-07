var request = require("request");
var _ = require('lodash');
var UrlPattern = require('url-pattern');
var Service = require('../models/service').model;

_.templateSettings.evaluate = /{{=([\s\S]+?)}}/g;
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
_.templateSettings.escape = /{{-([\s\S]+?)}}/g;

exports.get = function(req, res, next) {
    Service.find(req.query, function(err, data) {
        if (err)
            res.json(err.message);

        var schema = {
            _id: req.params.id,
            name: '',
            operation: '',
            method: '',
            description: '',
            fields: []
        };

        if (data && data[0] != null) {
            schema = getSchema(data[0]);
        }
        return res.json(schema);
    });
};

exports.getById = function(req, res, next) {
    Service.find({ _id: req.params.id }, function(err, data) {
        if (err) res.status(400).json(err.message);

        var schema = {
            _id: req.params.id,
            name: '',
            operation: '',
            method: '',
            description: '',
            fields: []
        };

        if (data && data[0] != null) {
            schema = getSchema(data[0]);
        }
        return res.status(200).json(schema);
    });
};

exports.invoke = function(req, res, next) {
    callAPI(req.body, function(err, response) {
        if (err) return next(err);
        res.status(200).json(response);
    });
};

function getSchema(obj) {
    var schema = {
        _id: obj._id,
        name: obj.name,
        operation: obj.operation,
        method: obj.method,
        description: obj.description,
        output: obj.output,
        fields: [ /* { name, label, type } */ ]
    };
    try {

        if (obj.paths.length > 0) {
            for (var i = 0; i < obj.paths.length; i++) {
                var path = obj.paths[i];
                schema.fields.push({
                    name: 'paths[' + path.key + ']',
                    label: path.name || path.key,
                    type: 'text',
                    defaultValue: path.defaultValue,
                });
            }
        }

        if (obj.method == 'GET') {
            if (obj.parameters.length > 0) {
                for (var i = 0; i < obj.parameters.length; i++) {
                    var param = obj.parameters[i];
                    if (param.visible) {
                        schema.fields.push({
                            name: 'parameters[' + param.key + ']',
                            label: param.name || param.key,
                            type: 'text'
                        });
                    }
                }
            }
        }

        if (obj.method == 'PUT' || obj.method == 'POST') {
            if (obj.bodyFormat == 'json') {
                schema.body = 'Text';
                schema.fields.push({
                    name: 'data',
                    label: 'Body',
                    type: 'textarea'
                });
            } else {
                if (obj.body.length > 0) {
                    for (var i = 0; i < obj.body.length; i++) {
                        var param = obj.body[i];

                        var name = 'body[' + param.key + ']';

                        if (param.xPath) {
                            var arr = param.xPath.split('.');
                            var mapArr = arr.map(function(x) {
                                return '[' + x + ']';
                            });
                            name = 'body' + mapArr.join('');
                        }

                        if (param.type) name = name + ':' + param.type;

                        schema.fields.push({
                            name: name,
                            label: param.name || param.key,
                            type: param.uiType,
                            defaultValue: param.defaultValue
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    return schema;
}

function callAPI(body, callback) {
    try {
        Service
            .findOne({ _id: body._id })
            .populate('provider')
            .exec(function(err, data) {
                if (err) callback(err);
                if (data) {
                    var obj = JSON.parse(JSON.stringify(data));
                    return invoke(obj, body, callback);
                } else {
                    callback(null, {});
                }
            });
    } catch (error) {
        callback(error);
    }
}

function invoke(service, data, callback) {
    //TODO: validate
    var options = getOptions(service, data);
    console.log(options);
    request(options, function(error, response, body) {
        if (error) {
            var _err = new Error(error);
            _err.statusCode = 400;
            callback(_err);
        }
        if (response.statusCode >= 200 && response.statusCode <= 300)
            callback(error, body);
        else {
            var _err = new Error(response.statusMessage);
            _err.statusCode = response.statusCode;
            callback(_err);
        }
    });
}

function getOptions(service, data) {
    var provider = service.provider;
    var method = service.method;

    var urlPath = normalizeUrlPath(service.urlPath, data.paths || {});
    var headers = normalizeParams(service.headers);
    if (provider.headers) {
        headers = _.assignIn({}, headers, provider.headers);
    }

    var _url = {
        protocol: provider.protocol || 'http',
        host: provider.host,
        port: provider.port || 80,
        path: provider.basePath + urlPath,
    };

    var url = _.template("{{protocol}}://{{host}}:{{port}}{{path}}")(_url);

    var options = {
        method: method,
        url: url,
        headers: headers,
        json: true
    };

    if (method == 'GET') {
        options.qs = normalizeQueryParams(service.parameters, data);
    } else if (method == 'POST' || method == 'PUT') {
        options.body = data.body;
    }

    return options;
}

function normalizeQueryParams(params, data) {
    return params.reduce(function(obj, arrObj) {
        if (data.parameters && data.parameters.hasOwnProperty(arrObj.key)) {
            obj[arrObj.key] = data.parameters[arrObj.key];
        } else {
            obj[arrObj.key] = arrObj.value;
        }
        return obj;
    }, {});
}

function normalizeParams(params) {
    return params.reduce(function(obj, arrObj) {
        obj[arrObj.key] = arrObj.value;
        return obj;
    }, {});
}

function normalizeUrlPath(url, obj) {
    var pattern = new UrlPattern(url);
    var _url = pattern.stringify(obj);
    return _url;
}