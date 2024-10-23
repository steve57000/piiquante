const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: "Le mail est obligatoire", unique: true },
    password: { type: String, required: "Le password est obligatoire" }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);