const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coment: {
        type: String,
        required: true
    }



})
module.exports = mongoose.model('Coment', Schema)