const Post = require('../Models/Post')
const User = require('../Models/User')

module.exports = {
    async createPost(req, res) {
        const {
            picture,
            description
        } = req.body

        const { user } = req.headers

        try {
            const newPost = await Post.create({
                picture,
                description,
                user
            })

            return res.status(200).send({
                message: 'Post created sucessfully',
                data: newPost
            })
        }catch(err) {
            return res.status(400).send(err)
        }

    },

    async listAllPosts(req, res) {
        try {
        const allPosts = await Post.find()
        .populate('user')

        return res.status(200).send({
            message: 'all posts',
            data: allPosts
        })

        }catch(err) {

            return res.status(400).send(err)
        }

    },
    
    async deletePost(req, res) {
        const { post_id } = req.params

        try {
            const deletedPost = await Post.findById(post_id)
            .populate('user')
    
            return res.status(200).send({
                message: 'post deleted sucessfully',
                data: deletedPost
            })
    
            }catch(err) {
    
                return res.status(400).send(err)
            }

    },
    
    async editPost(req, res) {

    },

}