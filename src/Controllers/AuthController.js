const bcrypt = require('bcryptjs');

const User = require('../Models/User/Users');

module.exports = {
    async login(req, res) {
        const { username, password } = req.body

        try{
            const validUsername = await User.findOne({
                username: username
            })
            if(!validUsername) {
                return res.status(400).json({message: 'user does not exist'})
            }

            const validPassword = await bcrypt.compare(password, validUsername.password)
            if(!validPassword) {
                return res.status(400).json({message: 'Wrong password'})
            }
            
            const loggedIn = validUsername
            console.log(loggedIn)
            return res.status(200).json({message: 'success', data: loggedIn}, res.send(loggedIn))
            
        } catch(err) {
            return res.status(400).json(err)
        }
    },

    async verifyUserExists(req, res) {
        try {
            const userFind = await User.findOne({username: req.params.username})
            if(userFind)return res.status(400).send({
                message: 'This user already exists, try another username'
            })
            return res.status(200).json({message: `user: ${req.params.username} dont exists`})
        }catch(err){
            return res.status(400).send(err)
        }

    },

    async createAccount(req, res) {
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
                message: 'the username must be at least 4 characters'
            })

            if(password.length < 4)return res.status(400).send({
                message: 'the password must be at least 4 characters'
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
    }
}