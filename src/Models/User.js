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
    email: {
        type: String,
        max: 50,
        unique: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    fans: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    popularity: {
        type: String,
    },
    points: {
        type: String,
        default: 0
    },
    Time: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        max: 200
    },
    name: {
        type: String,
        max: 50
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model('User', Schema)