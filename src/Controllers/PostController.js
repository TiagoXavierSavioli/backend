const Post = require('../Models/Post')
const User = require('../Models/User')

module.exports = {
    async createPost(req, res) {
        const {
            description,
            img
        } = req.body

        const { user } = req.headers

        try {
            const newPost = await Post.create({
                description,
                img,
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
        const {username} = req.params
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
    async likePost(req, res) {
        const {id, user_id} = req.params
        try{
            const post = await Post.findById(id)
            if(!post.likes.includes(user_id)){
                await post.updateOne({ $push: { likes: user_id }})
                res.status(200).json('the post has been liked')

            if(post.hates.includes(user_id)){
                await post.updateOne({ $pull: { hates: user_id }})
                res.status(200).json('the post has been liked')
            } 
            }else{
                await post.updateOne({ $pull: { likes: user_id}})
                res.status(200).json('the post has been disliked')
            }
        }catch(err){
            res.status(500).json(err)
        }
    },

    async hatePost(req, res) {
        const {id, user_id} = req.params
        try{
            const post = await Post.findById(id)
            if(!post.hates.includes(user_id)){
                await post.updateOne({ $push: { hates: user_id }})
                res.status(200).json('the post has been hated')

            if(post.likes.includes(user_id)){
                await post.updateOne({ $pull: { likes: user_id }})
                res.status(200).json('the post has been liked')
            }  
            }else{
                await post.updateOne({ $pull: { hates: user_id}})
                res.status(200).json('the post has been dishated')
            }
        }catch(err){
            res.status(500).json(err)
        }
    },

    async timelinePosts(req, res) {
        try{
            const currentUser = await User.findById(req.body.userId)
            const userPosts = await Post.find({user: currentUser._id})
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({userId: friendId })
                })
            )
            res.json(userPosts.concat(...friendPosts))
        }catch(err){
            res.status(500).json(err)
        }
    }

}