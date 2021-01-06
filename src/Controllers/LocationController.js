const Location = require('../Models/Location');


module.exports = {
    async FistCoordinates (req, res) {
        const { user, latitude, longitude } = req.body

        try{

            const userAlreadyExists = await Location.findOne({
                user
            })
            if (userAlreadyExists) {
                const updateCoordinates = await Location.updateOne({
                    latitude,
                    longitude,
                })
                return res.status(200).send({ message: 'cordinates updated sucessfully', data: updateCoordinates })
            }
            const newCoordinates = await Location.create({
                latitude,
                longitude,
                user
            })
            return res.status(200).send({ message: 'coordinates created sucessfully', data: newCoordinates })

        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async ListProximCoordinates (req, res) {
        const { latitude, longitude } = req.headers

        latitude

        try {
            const CompareCoordinates = await Location.find({latitude, longitude})

            return res.status(200).send({
                message: 'locations finded sucessfully',
                data: CompareCoordinates
            })


        }catch(err){
           return res.status(400).send(err)
        }
    },

    async ListAllCoordinates ( req, res) {
        try {
            const allCoordinates = await Location.find()
            .populate('user')

            return res.status(200).send({
                message: 'listed all coordinates',
                data: allCoordinates
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}