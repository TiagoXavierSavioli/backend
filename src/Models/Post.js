const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }



})
module.exports = mongoose.model('Post', Schema)