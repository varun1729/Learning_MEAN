let mongoose = require("mongoose");
let passportLocalMongooose = require("passport-local-mongoose");
let UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

UserSchema.plugin(passportLocalMongooose);

module.exports = mongoose.model('User', UserSchema);

