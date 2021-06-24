const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    activationToken: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },

    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    profilePic:{
        type: String,
    },
    email: {
        type: String,
    },
    fName: {
        type: String
    },
    LName: {
        type: String
    },
    birthday: {
        type: Number
    },
    status: {
        type: Boolean
    },
    gender: {
        type: Number
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model('User', Schema)