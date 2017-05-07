var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
    //role: { type: String, enum: ['reader', 'creator', 'editor'], default: 'reader' }
}, {
    versionKey: false,
    timestamps: true
});


UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

exports.schema = userSchema;
exports.model = mongoose.model('User', userSchema);