const Schema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    urlPicture: {
        type: String
    },
    title: {     
        type: String
    },
    content: {
        type: String
    },
    createdDate: {
        type: Date.now
    },
}, {
    timestamps: true,
})
module.exports = mongoose.model('Post', Schema)