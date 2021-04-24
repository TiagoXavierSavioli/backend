const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    description: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    hates: {
        type: Array,
        default: []
    },
})
module.exports = mongoose.model('Post', Schema)