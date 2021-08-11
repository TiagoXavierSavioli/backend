
const Moment = require('../Models/Moment.js')
const User = require('../Models/User.js')
const Tag = require('../Models/Tag.js')

module.exports = {
    async index (req, res) {
        const {user_id} = req.params

        const userFind = await User.findByPk(user_id, {
            attributes: ['username', 'id', 'picture' ],
            include: [
                {association: 'informations'},
                {
                    association: 'moments',
                    attributes: ['id', 'description', 'picture', 'type', 'createdAt', 'updatedAt'],
                    include: {
                        association: 'tags',
                        attributes: ['id', 'name'],
                        through: {attributes: []}
                    }
                }
            ]
        })
        return res.json(userFind)
    },

    async store (req, res) {
        const { description, picture, type, tag } = req.body
        const { user_id } = req.params

        const findUser = await User.findByPk(user_id)

        if(!findUser){throw new Error('user not found')}
        if (description.length >= 100){ throw new Error('the description can contain a maximum of 100 characters') }

            const tags = await Tag.create({name: tag})

        
        const createMoment = await Moment.create({
            user_id,
            description,
            picture,
            type
        })
        return res.status(200).json({message: `post created sucessfully`, data: createMoment}, res.send([createMoment, tags]))
    },

}

