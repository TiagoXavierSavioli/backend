const { get } = require('mongoose');
const Location = require('../Models/Location');
const Post = require('../Models/Post');

module.exports = {
    async FistCoordinates (req, res) {
        const { user } = req.headers
        const { latitude, longitude } = req.body

        try{
            const newCoordinates = await Location.create({
                latitude,
                longitude,
                user
            })

            return res.status(200).send({ message: 'success', data: newCoordinates })

        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async updateCoordinates (req, res) {
        const { user } = req.headers
        const { latitude, longitude } = req.body

        try{
            const newCoordinates = await Location.findOneAndUpdate({
                user: user,
                latitude: latitude,
                longitude: longitude
            })

            return res.status(200).send({ message: 'new coordinates registered', data: newCoordinates })

        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listCoordinates(req, res) {
        try {
            const allCoordinates = await Location.find()

            return res.status(200).send({
                message: 'listed all coordinates',
                data: allCoordinates
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}