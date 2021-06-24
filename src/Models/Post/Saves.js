const Schema = new mongoose.Schema({
    post: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }, 
    userId2: {
        type: Number
    },
    requestDate: {
        type: Date.now
    },
}, {
    timestamps: true,
})
module.exports = mongoose.model('Save', Schema)