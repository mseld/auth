var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var protocols = ['http', 'https'];

var providerSchema = new Schema({
    name: { type: String, unique: true, trim: true, required: true },
    description: String,
    protocol: { type: String, lowercase: true, enum: protocols, trim: true, required: true },
    host: { type: String, trim: true, required: true },
    port: { type: Number, required: true },
    basePath: String,
    headers: { type: Object }
}, {
    versionKey: false,
    timestamps: true
});

exports.schema = providerSchema;
exports.model = mongoose.model('Provider', providerSchema);