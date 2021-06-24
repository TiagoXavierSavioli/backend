const bcrypt = require('bcryptjs');

const User = require('../Models/User/Users');
const Followings = require('../Models/User/Followings');

module.exports = {
    async findUserById(req, res) {
        try {
            const findedUser = await User.findById({_id:req.params.id})
    
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
    async findUser(req, res) {
        try {
            const findedUser = await User.find({username: new RegExp(req.params.username,'gi')}).populate('user')
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
    async followUser(req, res) {
        const {userId2} = req.body
        const {user} = req.headers
        try{
            const user1 = await User.findById(user)
            const user2 = await User.findById(userId2)
            if(!user1)return res.status(400).send({ message: 'user 1 does not exist' })
            if(!user2)return res.status(400).send({ message: 'user 2 does not exist' })

            if(user1&&user2){
                const findedUser = await Followings.findOne({userId1: user, userId2: userId2})
                if(findedUser){
                    return res.status(400).send({ message: 'you just following this user' })
                }else{
                    const followUser = await Followings.create({
                        userId1: user,
                        userId2: userId2
                    })

                    return res.status(200).json({message: `follow user sucessfully`, data: followUser}, res.send(followUser))
                }
            }
        }catch(err){
            return res.status(400).send(err)
        }
    },

        async unfollowUser(req, res) {
        const {userId2,} = req.body
        const {user} = req.headers
        try{
            const user1 = await User.findById(user)
            const user2 = await User.findById(userId2)
            if(!user1)return res.status(400).send({ message: 'user 1 does not exist' })
            if(!user2)return res.status(400).send({ message: 'user 2 does not exist' })
            
            if(user1&&user2){
                const findedUser = await Followings.findOne({userId1: user, userId2: userId2})
                if(!findedUser){
                    return res.status(400).send({ message: 'you do not following this user' })
                }else{
                    const unfollowUser = await findedUser.remove()

                    return res.status(200).json({message: `unfollow user sucessfully`}, res.send(unfollowUser))
                }                
            }

        }catch(err){
            return res.status(400).send(err)
        }
    },
    
    async listAllfollows(req, res) {
        try {
            const allfollow = await Followings.find()

            return res.status(200).send({
                message: 'listed all follows',
                data: allfollow
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    async listFollowings(req, res) {
        try {
            const allfollow = await Followings.find({userId1: req.params.id}).populate('userId2')

            return res.status(200).send({
                message: `listed all ${allfollow.length} users you following`,
                data: allfollow
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    async listFans(req, res) {
        try {
            const allfollow = await Followings.find({userId2: req.params.id}).populate('userId1')

            return res.status(200).send({
                message: 'listed all users follow you',
                data: allfollow
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },
}