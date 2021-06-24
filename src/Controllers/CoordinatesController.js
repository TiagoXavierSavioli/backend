const bcrypt = require('bcryptjs');

const User = require('../Models/User/Users');
const Location = require('../Models/User/Location');

module.exports = {
    async SendLocation(req, res) {
        const {latitude, longitude} = req.body
        const {user} = req.headers

        const userFind = await User.findById({_id: user})
        if(userFind){
            const findLocation = await Location.findOne({user: user})
            if(!findLocation){
                const createLocation = await Location.create({
                    user: user,
                    latitude: latitude,
                    longitude: longitude
                })
                return res.status(200).json({message: 'location created sucessfully', data: createLocation}, res.send(createLocation))
            }else{
                const updateLocation = await findLocation.updateOne({
                    latitude: latitude,
                    longitude: longitude
                })
                return res.status(200).json({message: 'location updated sucessfully', data: updateLocation}, res.send(updateLocation))
            }            
        }else{
            return res.status(400).send({ message: 'This user not exists' })
        }


    },

    async ListLocation(req, res){
        try{
            const findLocations = await Location.find()

            return res.status(200).json({message: 'locations finded sucessfully', data: findLocations}, res.send(findLocations))
        }catch(err){
            return res.status(400).send({ message: 'Not possble list all locations' })
        }
    },

    async ListProximLocations(req, res){
        const {latitude, longitude} = req.body
        try{
            const findLocations = await Location.find().populate('user')

            const filterLocations = findLocations.filter(location =>location.latitude < latitude + 5 && location.longitude < longitude +5)

              return res.status(200).json({message: 'locations finded sucessfully', data: filterLocations}, res.send(filterLocations))
        }catch(err){
            return res.status(400).send({ message: 'Not possible list all locations' })
        }
    }
}