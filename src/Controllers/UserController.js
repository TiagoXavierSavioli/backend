const bcrypt = require('bcryptjs')
const User = require('../Models/User/User')
const Moment = require('../Models/Moment/Moment')

module.exports = {
    async findBy(req, res) {
        const {user_id} = req.params

        const validUsername = await User.findOne({
            where: { id: user_id},
            attributes: ['username', 'id', 'picture', 'bg_picture', 'description'],
            include: [
                {association: 'coordinates'},
                {association: 'informations'},
                {association: 'fans'},
            ]
        })

        const moments = await Moment.findAll({
            where: { user_id: validUsername.id, deleted: false},
                include: [
                    {
                        association: 'likes',
                        attributes: ['user_id', 'moment_id', 'type']
                    },
                    {association: 'vieweds'},
                    {association: 'tags'}        
                ]
        })

        if(!validUsername) { throw new Error('username not exists') }
            
        return res.status(200).json([validUsername, moments.reverse()])
    },
    async verifyUserExists(req, res) {
        const userFind = await User.findOne({where: {username: req.params.username}})
        if(userFind){ throw new Error('user already exists try another username')}
        return res.status(200).json({message: `user: ${req.params.username} dont exists`})
    },
    async store(req, res) {
        const {username, password} = req.body

        const userAlreadyExists = await User.findOne({where: { username: username }})

        if (userAlreadyExists){ throw new Error('This user already exists, try another username') }
        if (username.length < 4){ throw new Error('the username must be at least 4 characters') }
        if(password.length < 4){ throw new Error('the password must be at least 4 characters') }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
        })
        return res.status(200).json({message: `user: ${username} created`, data: createdUser}, res.send(createdUser))
    },
    async find(req, res) {
        const users = await User.findAll()
        return res.json(users)
    },
    async search(req, res) {
        const users = await User.findAll({
            attributes: ['username', 'id', 'picture'],
        })
        return res.json(users)
    },
    async pictureUpload (req, res){
        const { user_id } = req.params 
        const { picture } = req.body

        console.log(picture)

        const findUser = await User.findOne({ where: {id: user_id}})

        if(findUser){
            try{

                const selector = { where: { id: user_id } }
                const values = { picture: picture}

                console.log(picture)

                const pictureUpdate = await User.update(values, selector)
                return res.status(200).json(pictureUpdate)
            }catch(err){
                console.log(err.message)
            }


        }
        
    },
    async delete(req, res) {
        const {user_id} = req.params

        const deleteUser = await User.destroy({
            where: { id: user_id},
        })
        return res.status(200).json(deleteUser)
    }
}