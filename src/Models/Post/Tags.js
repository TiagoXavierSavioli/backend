const Schema = new mongoose.Schema({
    post: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    tag: {
        type: String
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model('Tag', Schema)