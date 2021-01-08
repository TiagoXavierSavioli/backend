const { populate } = require('../Models/User');
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
    },

    async findUser(req, res) {
        const { username } = req.body

        try {
            const findedUser = await User.findOne({username})
            .populate('user')
    
            if(!findedUser) {
                return res.status(400).json({message: 'user does not exists'})
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
        const { user_id } = req.headers
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
            if(description != null){
                await User.findByIdAndUpdate(user_id, {
                    description
                })
            }
            if(name != null){
                await User.findByIdAndUpdate(user_id, {
                    name
                })
            }
            if(age != null){
                await User.findByIdAndUpdate(user_id, {
                    age
                })
            }
            if(email != null){
                await User.findByIdAndUpdate(user_id, {
                    email
                })
            }
            if(phone != null){
                await User.findByIdAndUpdate(user_id, {
                    phone
                })
            }
            if(site != null){
                await User.findByIdAndUpdate(user_id, {
                    site
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
            const userExists = await User.findOne({username})
            .populate('user')
            if(userExists)return res.status(400).send('this user already exists')

            return res.status(200).send({
                message: "correct typed user",
                data: userExists
            })

        } catch(err){
            return res.status(400).send(err)
        }
    }
}