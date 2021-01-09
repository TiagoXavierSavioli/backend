const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    coments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    likesCount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Likes',
    }
})
module.exports = mongoose.model('Post', Schema)