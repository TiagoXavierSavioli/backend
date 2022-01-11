const bcrypt = require('bcryptjs');

const Fans = require('../Models/User/follow');
const User = require('../Models/User/User');

module.exports = {

    async store(req, res) {
        const {fan_id, follow_id} = req.body

        const relationAlreadyExists = await Fans.findOne({ where: {follow_id: follow_id, fan_id: fan_id}})

        if (relationAlreadyExists){ throw new Error('This relation already exists') }

        const createdUser = await Fans.create({
            follow_id: follow_id,
            fan_id: fan_id,                
        })
        return res.status(200).json(createdUser)
    },

    async delete(req, res) {
        const {fan_id, follow_id} = req.params

        const relationAlreadyExists = await Fans.findOne({ where: {follow_id: follow_id, fan_id: fan_id}})

        if (!relationAlreadyExists){
            throw new Error('This relation not exists')
        }else{
            const createdUser = await Fans.destroy({
                where: {
                    follow_id: follow_id,
                    fan_id: fan_id,                
                }

            })
            return res.status(200).json(createdUser)            
        }


    },

    async index(req, res) {
        const {user_id} = req.params

        const users = await Fans.findAll({
            where: { follow_id: user_id },
        })

        return res.json(users)
    }
}