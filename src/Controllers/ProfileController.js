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
                message: 'User found',
                userInfo,
                userPosts
            })
        }catch(err){
            return res.status(400).send(err)
        }
    },
    
    async followUser(req, res){
        const {id, user_id} = req.params

        if(user_id !== id) {
            try{
                const user = await User.findById(id)
                const currentUser = await User.findById(user_id)

                if(!user.fans.includes(user_id)){
                    await user.updateOne({$push: { fans: user_id } })
                    await currentUser.updateOne({$push: { followings: user_id } })

                    res.status(200).json('user has been followed')
                }else{
                    res.status(403).json('you already follow this user')
                }

            }catch(err){
                res.status(500).json(err)
            }

        }else{
            res.status(403).json('you cant follow yourself')
        }
    },

    async unfollowUser(req, res){
        const {id} = req.params
        const {user_id } = req.body

        if(user_id !== id) {
            try{
                const user = await User.findById(id)
                const currentUser = await User.findById(user_id)

                if(user.fans.includes(user_id)){
                    await user.updateOne({$pull: { fans: user_id } })
                    await currentUser.updateOne({$pull: { followings: user_id } })

                    res.status(200).json('user has been unfollowed')
                }else{
                    res.status(403).json('you dont unfollow this user')
                }

            }catch(err){
                res.status(500).json(err)
            }

        }else{
            res.status(403).json('you cant follow yourself')
        }
    }
}