const { populate } = require('../Models/Post')
const Post = require('../Models/Post')
const User = require('../Models/User')

module.exports = {
    async createPost(req, res) {
        const {
            description
        } = req.body

        const { user } = req.headers

        try {
            const newPost = await Post.create({
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
        const { post_id, user_id } = req.headers

        try {
            const belongsToUser = await Post.findOne({ user: user_id })
            if(!belongsToUser) return res.status(400).send('operation not allowed')

            const postExists = await Post.findById(post_id)
            if(!postExists)return res.status(400).send('post does not exist')

            const deletedPost = await Post.findByIdAndDelete(post_id)
    
            return res.status(200).send({
                message: 'post deleted sucessfully',
                data: deletedPost
            })
    
            }catch(err) {
    
                return res.status(400).send(err)
            }

    },
    
    async editPost(req, res) {
        const { post_id, user_id } = req.headers
        const { description }= req.body

        try {
            const postExists = await Post.findById(post_id)
            if(!postExists)return res.status(400).send('post does not exist')

            const belongsToUser = await Post.findOne({ user: user_id })
            if(!belongsToUser) return res.status(400).send('operation not allowed')

            const editPost = await Post.findByIdAndUpdate(post_id, {
                description
            })
            return res.status(200).send({
                message: "Updated Sucessfuly",
                data: editPost
            })

        }catch(err){
            return res.status(400).send(err)
        }

    },

    async listUserPosts(req, res) {
        const {username} = req.body
        try {
            const findedUser = await User.findOne({username: username})

            if(!findedUser) {
                return res.status(400).send({
                    message: 'user does not exists',
                    data: findedUser
                })
            }
            const userId = findedUser.id

            const userPosts = await Post.find({user: userId})

            return res.status(200).send({
                message: 'user posts',
                data: userPosts
            })

        }catch(err) {

            return res.status(400).send(err)
        }

    },
    async findUser(req, res) {
        const {username} = req.body

        try {
            const findedUser = await User.findOne({username: username})
            .populate('user')
    
            if(!findedUser) {
                return res.status(400).send({
                    message: 'user does not exists',
                    data: findedUser
                })
            }

            return res.status(200).send({
                message: 'user finded sucessfully',
                data: findedUser
            })
    
        }catch(err) {
            return res.status(400).send(err)
        }

    },

}