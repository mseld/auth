var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var httpVerbs = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
var types = ['object', 'array', 'string', 'number', 'date', 'boolean', 'auto', 'stringBuilder'];
var uiTypes = ['text', 'tag', 'textarea'];
var formats = ['form', 'json'];

var serviceSchema = new Schema({
    provider: { type: ObjectId, ref: 'Provider' },
    name: { type: String, required: true },
    operation: String,
    description: String,
    viewLevel: { type: String, default: '1' },
    urlPath: { type: String, trim: true, required: true },
    method: { type: String, uppercase: true, enum: httpVerbs, trim: true, required: true },
    order: { type: Number, default: 1 },
    headers: [{
        key: { type: String, trim: true, required: true },
        value: { type: String, trim: true, required: true }
    }],
    paths: [{
        key: { type: String, trim: true, required: true },
        name: { type: String, trim: true },
        defaultValue: { type: String, trim: true, default: '' }
    }],
    parameters: [{
        type: { type: String, enum: types, trim: true, default: 'string' },
        key: { type: String, trim: true, required: true },
        name: { type: String, trim: true },
        value: { type: String, trim: true },
        defaultValue: { type: String, trim: true, default: '' },
        visible: { type: Boolean, default: false }
    }],
    bodyFormat: { type: String, enum: formats, trim: true, default: 'form' },
    body: [{
        uiType: { type: String, enum: uiTypes, trim: true, default: 'text' },
        type: { type: String, enum: types, trim: true, default: 'string' },
        key: { type: String, trim: true, required: true },
        name: { type: String, trim: true },
        defaultValue: { type: String, trim: true, default: '' },
        visible: { type: Boolean, default: false },
        xPath: { type: String, trim: true }
    }],
    output: {
        message: { type: String, trim: true, default: '' },
        xPath: { type: String, trim: true, default: '' },
        exclude: { type: [String] }
    }
}, {
    versionKey: false,
    timestamps: true
});

exports.schema = serviceSchema;
exports.model = mongoose.model('Service', serviceSchema);