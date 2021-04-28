const { populate } = require('../Models/User');
const User = require('../Models/User');
const bcrypt = require('bcrypt')

module.exports = {
    async createUser(req, res) {
        const {
            username,
            password,
            email
        } = req.body

        try {

            const userAlreadyExists = await User.findOne({
                username
            })
            if (userAlreadyExists)return res.status(400).send({
                message: 'This user already exists, try another username'
            })

            if (username.length < 4) return res.status(400).send({
                message: 'the username must be at least 6 characters'
            })

            if(password.length < 4)return res.status(400).send({
                message: 'the password must be at least 6 characters'
            })
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const createdUser = await User.create({
                username,
                password: hashedPassword,
                email
            })
            return res.status(200).json({message: `user: ${username} created`, data: createdUser}, res.send(createdUser))
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listUser(req, res) {
        try {
            const allUser = await User.find()

            return res.status(200).send({
                message: 'listed all users',
                data: allUser
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async findUser(req, res) {
        const {username} = req.params

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

    async editUser(req, res) {
        const { user_id } = req.body
        const {
            username,
            password,
            description,
            name,
            age,
            email,
            phone,
            site,
            relationship,
        }= req.body

        try {
            const userExists = await User.findById(user_id)
            if(!userExists)return res.status(400).send('user does not exist')

            if(username != null){
                await User.findByIdAndUpdate(user_id, {
                    username
                })
            }
            if(password != null){
                await User.findByIdAndUpdate(user_id, {
                    password
                })
            }
            if(relationship !== null){
                await User.findByIdAndUpdate(user_id, {
                    relationship
                })
            }

            return res.status(200).send({
                message: "Updated all Sucessfuly",
                data: userExists
            })

        }catch(err){
            return res.status(400).send(err)
        }

    },

    async verifyUserExists(req, res){
        const { username } = req.body

        try {
            const findedUser = await User.findOne({username})

            if(!findedUser) {
                return res.status(200).send({message: 'user is valid', data: findedUser})
            }

            
            if(findedUser) {
                return res.status(200).send({message: 'user does exists' ,data: findedUser})
            }
            
        } catch(err){
            return res.status(400).send(err)
        }
    }
}