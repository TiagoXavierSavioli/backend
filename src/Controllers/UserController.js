const bcrypt = require('bcryptjs');

const User = require('../Models/User/Users');
const Followings = require('../Models/User/Followings');

module.exports = {
    async findUserById(req, res) {
        const findedUser = await User.findById({_id:req.params.id})
    
        if(!findedUser) { throw new Error('user does not exists') }

        return res.status(200).send({
            message: 'user finded sucessfully',
            data: findedUser
       })

    },
    async findUser(req, res) {
        const findedUser = await User.find({username: new RegExp(req.params.username,'gi')}).populate('user')
        if(!findedUser) { throw new Error('user does not exists') }

        return res.status(200).send({
            message: 'user finded sucessfully',
            data: findedUser
        })

    },
    async followUser(req, res) {
        const {userId2} = req.body
        const {user} = req.headers

        const user1 = await User.findById(user)
        const user2 = await User.findById(userId2)
            
        if(!user1)throw new Error('user 1 does not exists')
        if(!user2)throw new Error('user 2 does not exists')

        if(user1&&user2){
            const findedUser = await Followings.findOne({userId1: user, userId2: userId2})
            if(findedUser){throw new Error('you just following this user')
            }else{
                const followUser = await Followings.create({
                    userId1: user,
                    userId2: userId2
                })

                return res.status(200).json({message: `follow user sucessfully`, data: followUser}, res.send(followUser))
            }
        }
    },
        async unfollowUser(req, res) {
        const {userId2,} = req.body
        const {user} = req.headers
        const user1 = await User.findById(user)
        const user2 = await User.findById(userId2)

        if(!user1)throw new Error('user 1 does not exists')
        if(!user2)throw new Error('user 2 does not exists')
            
        if(user1&&user2){
            const findedUser = await Followings.findOne({userId1: user, userId2: userId2})
            if(findedUser)
            if(!findedUser){ throw new Error('you do not following this user')
            }else{
                const unfollowUser = await findedUser.remove()
                return res.status(200).json({message: `unfollow user sucessfully`}, res.send(unfollowUser))
            }                
        }
    },
    async listAllfollows(req, res) {
        const allfollow = await Followings.find()

        return res.status(200).send({
            message: 'listed all follows',
            data: allfollow
        })
    },
    async listFollowings(req, res) {
        const allfollow = await Followings.find({userId1: req.params.id}).populate('userId2')

        return res.status(200).send({
            message: `listed all ${allfollow.length} users you following`,
            data: allfollow
        })
    },
    async listFans(req, res) {
        const allfollow = await Followings.find({userId2: req.params.id}).populate('userId1')

        return res.status(200).send({
            message: 'listed all users follow you',
            data: allfollow
        })
    },
    async searchFans(req, res) {
        const allfollow = await Followings.find({userId2: req.params.id}).populate('userId1')
        if(!allfollow) { throw new Error('user does not exists') }
        const text = req.params.username.toLowerCase().trim()
        const filterFans = allfollow.filter(follow =>follow.userId1.username.includes(text))
        
        return res.status(200).send({
            message: 'listed all users follow you',
            data: filterFans
        })
    },
    async searchFollowings(req, res) {
        const allfollow = await Followings.find({userId1: req.params.id}).populate('userId2')
        if(!allfollow) { throw new Error('user does not exists') }
        const text = req.params.username.toLowerCase().trim()
        const filterFollowings = allfollow.filter(follow =>follow.userId2.username.includes(text))

        return res.status(200).send({
            message: `listed all users you following`,
            data: filterFollowings
        })
    },
}