
const Moment = require('../Models/Moment/Moment')
const User = require('../Models/User/User')
const Tag = require('../Models/Moment/Tag')
const Like = require('../Models/Moment/Like')
const Viewed = require('../Models/Moment/Viewed')

const ImageDecoder = require('../middlewares/imageDecoder')

module.exports = {
    async index (req, res) {
        const {user_id} = req.params

        const momentsFind = await User.findAll({
            where: {id: user_id},
            attributes: ['username', 'id', 'picture'],
            include: [
                {
                    association: 'coordinates',
                    attributes: ['latitude', 'longitude']
                },
                {
                    association: 'moments',
                    where: {deleted: false},
                    include: [
                        {association: 'likes'},
                        {association: 'vieweds'},
                        {association: 'tags'}
                    ]
                }
            ]
        })

        const momentsOrded = momentsFind.sort(function(a, b) {
            return a.moments.id < b.moments.id
        })

        return res.json(momentsOrded)
    },

    async store (req, res) {
        const { description, picture, picture_low } = req.body
        const { user_id } = req.params

        const findUser = await User.findByPk(user_id)

        if(!findUser){throw new Error('user not found')}
        if (description.length >= 300){ throw new Error('the description can contain a maximum of 300 characters') }

        const createMoment = await Moment.create({
            user_id: user_id,
            description: description,
            picture: picture,
            picture_low: picture_low,
            type: 'IMAGE',
            deleted: false
        })
        return res.status(200).json(createMoment)
    },

    async delete (req, res) {
        const { user_id, moment_id} = req.params

        const findUser = await User.findByPk(user_id)

        if(!findUser){throw new Error('user not found')}

        const deleteMoment = await Moment.destroy({
            where: {
                id: moment_id,
                user_id: user_id,                
            }

            
        })
        return res.status(200).json(deleteMoment)
    },

    async pictureUpload (req, res){
        const { user_id, moment_id } = req.params 
        const { picture } = req.body

        console.log(picture)

        const findMoment = await Moment.findOne({ where: {user_id: user_id, id: moment_id}})

        if(findMoment){
            try{

                const selector = { where: { user_id: user_id, id: moment_id } }
                const values = { picture: picture}

                console.log(picture)

                const pictureUpdate = await Moment.update(values, selector)
                return res.status(200).json(pictureUpdate)
            }catch(err){
                console.log(err.message)
            }


        }
        
    },

    async find (req, res) {

        const momentsFind = await User.findAll({
            attributes: ['username', 'id', 'picture'],
            include: [
                {
                    association: 'coordinates',
                    attributes: ['latitude', 'longitude']
                },
                {
                    association: 'moments',
                    where: {deleted: false},
                    include: [
                        {
                            association: 'likes',
                            attributes: ['user_id', 'moment_id', 'type']
                        },
                        {association: 'vieweds'},
                        {association: 'tags'}        
                    ]
                },

                

            ]
        })
        
        return res.json(momentsFind.reverse())
    },

    //moment actions (like, dislike, comment, viewed)

    async like (req, res) {

        const { user_id, moment_id } = req.params
        const { type } = req.body

        const findLikeMoment = await Like.findOne({
            where: {
                user_id: user_id,
                moment_id: moment_id,
                type: 'MOMENT'
            }
        })

        if(!findLikeMoment){
            const likeMoment = await Like.create({
                user_id: user_id,
                moment_id: moment_id,
                type: type                

            })

            return res.status(200).json(likeMoment)            
        }else{throw new Error('ths like exists')}


    },

    async dislike (req, res) {

        const { user_id, moment_id } = req.params

        const findLikeMoment = await Like.findOne({
            where: {
                user_id: user_id,
                moment_id: moment_id,
                type: 'MOMENT'
            }
        })

        if(findLikeMoment){
            const DislikeMoment = await Like.destroy({
                where: {
                    user_id: user_id,
                    moment_id: moment_id,
                }
            })

            return res.status(200).json(DislikeMoment)

        }else{throw new Error('ths like does not exists')}

    },

    async viewed (req, res) {

        const { user_id, moment_id } = req.params
        const { type } = req.body

            const viewedMoment = await Viewed.create({
                user_id: user_id,
                moment_id: moment_id,
                type: type

            })

            return res.status(200).json(viewedMoment)           


    },

}

