const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }



})
module.exports = mongoose.model('Location', Schema);