const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    site: {
        type: String,
    },
    relationship: {
        type: String,
    },
    birthday: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
module.exports = mongoose.model('User', Schema)