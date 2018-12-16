var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String},
    createdAt: {type: Date, default: Date.now},
    rg: {type: String, unique: true},
    cnpj: {type: String, unique: true},
    pontos: {number: String}
});

UserSchema.statics.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

UserSchema.statics.getUserByEmail = function (email, callback) {
    var query = {email: email};
    User.findOne(query, callback);
};

UserSchema.statics.getUserById = function (id, callback) {
    User.findById(id, callback);
};

UserSchema.statics.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

UserSchema.plugin(uniqueValidator);

var User = mongoose.model('User', UserSchema);

module.exports = {User};