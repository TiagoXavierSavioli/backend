const { get } = require('mongoose');
const Location = require('../Models/Location');
const Post = require('../Models/Post');

module.exports = {
    async FistCoordinates (req, res) {
        const { user } = req.headers
        const { coordinates } = req.body

        try{
            const newCoordinates = await Location.create({
                coordinates, 
                user
            })

            return res.status(200).json({ message: 'success', data: newCoordinates })

        } catch(err) {
            return res.status(400).json(err)
        }
    },

    async updateCoordinates (req, res) {
        const { user } = req.headers
        const { coordinates } = req.body

        try{
            const newCoordinates = await Location.findOneAndUpdate({
                user: user,
                coordinates: coordinates
            })

            return res.status(200).json({ message: 'success', data: newCoordinates })

        } catch(err) {
            return res.status(400).json(err)
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