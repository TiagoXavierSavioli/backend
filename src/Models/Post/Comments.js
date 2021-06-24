const Schema = new mongoose.Schema({
    post: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId1: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId2: {
        type: Number
    },
    content: {
        type: String
    },
    createdDate : {
        type: Date.now
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model('Comment', Schema)