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
})
module.exports = mongoose.model('Post', Schema)