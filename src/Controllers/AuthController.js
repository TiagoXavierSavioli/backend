const bcrypt = require('bcryptjs');

const User = require('../Models/User/User');
const Information = require('../Models/User/Information')
const Coordinates = require('../Models/Location/Coordinates')
const Social_Links = require('../Models/User/social_links')

module.exports = {
    async index(req, res) {
        const { username, password } = req.body

        const validUsername = await User.findOne({
            attributes: ['username', 'id', 'description', 'password'],
            where: { username: username},
        })
        const validPassword = await bcrypt.compare(password, validUsername.password)

        if(!validUsername) { throw new Error('username not exists') }
        if(!validPassword) { throw new Error('wrong password') }
            
        const loggedIn = validUsername
        return res.status(200).json({message: 'success', data: loggedIn}, res.send(loggedIn))
    },

    async verifyUserExists(req, res) {
        const userFind = await User.findOne({where: {username: req.params.username}})
        if(userFind){ throw new Error('user already exists try another username')}
        return res.status(200).json({message: `user: ${req.params.username} dont exists`})
    },

    async store(req, res) {
        const {username, password} = req.body

        const userAlreadyExists = await User.findOne({
            where: { username: username },
            attributes: ['username', 'id'],
        })

        if (userAlreadyExists){ throw new Error('This user already exists, try another username')}
        if (username.length < 4){ throw new Error('the username must be at least 4 characters') }
        if(password.length < 4){ throw new Error('the password must be at least 4 characters') }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
            picture: ''
        })

        await Information.create({
            user_id: createdUser.id,           
        })

        await Coordinates.create({
            user_id: createdUser.id,
            latitude: 0.000000000000000,
            longitude: 0.000000000000000,          
        })

        return res.status(200).json(createdUser)
    },

    async find(req, res) {
        const users = await User.findAll({
            attributes: ['username', 'id', 'picture', 'bg_picture', 'description'],
        })
        return res.json(users)
    }
}