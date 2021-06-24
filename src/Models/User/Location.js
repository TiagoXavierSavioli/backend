const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
}, {
    timestamps: true,
})
module.exports = mongoose.model('Location', Schema)