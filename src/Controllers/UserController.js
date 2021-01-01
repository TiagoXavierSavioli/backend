const User = require('../Models/User');

module.exports = {
    async createUser(req, res) {
        const {
            username,
            password,
            name,
            age,
            description,
            email,
            phone,
            site,
            relationship,
            birthday
        } = req.body

        try {
            const userAlreadyExists = await User.findOne({
                username
            })
            if (userAlreadyExists) return res.status(200).send({
                message: 'This user already exists, try another username'
            })

            if (username.length < 6) return res.status(200).send({
                message: 'the username must be at least 6 characters'
            })

            if(password.length < 6)return res.status(200).send({
                message: 'the password must be at least 6 characters'
            })

            if(age < 10)return res.status(200).send({
                message: 'you have to be at least 10 years old to create your account'
            })
            const createdUser = await User.create({
                username,
                password,
                name,
                age,
                description,
                email,
                phone,
                site,
                relationship,
                birthday
            })

            return res.status(200).send({
                message: 'user created',
                data: createdUser
            })
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
    }
}