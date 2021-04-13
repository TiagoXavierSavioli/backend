const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profileType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    age: {
        type: String,
    },
    relationship: {
        type: String,
    },
    live: {
        type: String,
    },
    gender: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
module.exports = mongoose.model('User', Schema)