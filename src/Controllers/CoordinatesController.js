const bcrypt = require('bcryptjs');
const sequelize = require('sequelize')

const User = require('../Models/User/User');
const Coordinates = require('../Models/Location/Coordinates');

module.exports = {
    async index(req, res) {
        const allCoordinates = await Coordinates.findAll()
        return res.json(allCoordinates)
    },

    async store(req, res) {
        const { latitude, longitude } = req.body
        const { user_id } = req.params

        const findUser = await Coordinates.findOne({ where: {user_id: user_id} })
        if(findUser){
            const where = { where: { user_id }};
            const values = { latitude, longitude };
            const options = { multi: true, };
            const updateUserCoordinates = await Coordinates.update(values, where, options)

            return res.status(200).json({message: `user coordinates has updated`, data: updateUserCoordinates})

        }else{
            const createUserCoordinates = await Coordinates.create({ latitude, longitude, user_id })  
            return res.status(200).json({message: `user coordinates has created`, data: createUserCoordinates})          
        }
    },

    async findProximUsers(req, res) {
        const { latitude, longitude } = req.body

        const allCoordinates = await Coordinates.findAndCountAll({
            where: { latitude: latitude + 0.5, longitude: longitude+0.5 },
        })
        return res.json(allCoordinates)
    }
}