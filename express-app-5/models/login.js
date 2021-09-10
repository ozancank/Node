const mongoose = require('mongoose');
const { isEmail } = require('validator');

const loginSchema = mongoose.Schema({
    email: { type: String, validate: [isEmail, 'Hatalı mail'] },
    password: {
        type: String,
        require: [true, 'parola girmelisiniz'],
        minlength: [1, 'parola girmelisiniz'],
    },
});

module.exports = mongoose.model('login', loginSchema);
