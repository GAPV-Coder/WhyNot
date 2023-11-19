const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    document_id: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
