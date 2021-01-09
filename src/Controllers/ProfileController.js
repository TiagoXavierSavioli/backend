const User = require('../Models/User');
const Post = require('../Models/Post')

module.exports = {
    async getProfile(req, res){
        const {user_id } = req.headers

        try{
            const userInfo = await User.findById(user_id)
            if(!userInfo) return res.status(400).send({
                message: 'user does not exists'
            })

            const userPosts = await Post.find({
                user: user_id
            })

            return res.status(200).send({
                messafe: 'User found',
                userInfo,
                userPosts
            })
        }catch(err){
            return res.status(400).send(err)
        }
    }    
}