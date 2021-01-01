const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    coordinates: {
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