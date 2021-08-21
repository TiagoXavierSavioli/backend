
const Moment = require('../Models/Moment/Moment')
const User = require('../Models/User/User')
const Tag = require('../Models/Moment/Tag')

module.exports = {
    async index (req, res) {
    },

    async store (req, res) {
        const { user_id } = req.params
        const { name } = req.body

        const user = await User.findByPk(user_id)

        if(!user){ throw new Error('user not found') }
        const [ tag ] = await Tag.findOrCreate({ where: {name: name} })

        await user.addTag(tag)
        return res.json(tag)
    },

}

