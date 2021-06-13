const User = require('../Models/User');

module.exports = {

    async Coordinates (req, res) {
        const { latitude, longitude } = req.body
        const { user_id, online } = req.headers

        try{
            const userAlreadyExists = await User.find({_id: user_id})
            
            if (userAlreadyExists) {
                const updateCoordinates = await User.updateOne({
                    latitude,
                    longitude,
                    online
                })
                return res.status(200).send({ message: 'cordinates updated sucessfully', data: updateCoordinates })
            }

        } catch(err) {
            return res.status(400).send(err)
        }
    },
}