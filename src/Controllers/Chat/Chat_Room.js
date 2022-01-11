const bcrypt = require('bcryptjs');

const User = require('../../Models/User/User');
const Chat_Room = require('../../Models/Chat/chat_room');
const Message = require('../../Models/Chat/message');

module.exports = {
    async index(req, res) {
        const { user_id1 } = req.params

        const createdRoom = await Chat_Room.findAll({
            where: {user_id1: user_id1},
        })

        const createdRoom2 = await Chat_Room.findAll({
            where: {user_id2: user_id1},
        })

        const user_id = createdRoom2.user_id2

        const user_room= await User.findByPk(user_id)
        
        return res.status(200).json([createdRoom, createdRoom2, user_room])

       
    },
    
    async store(req, res) {
        const { user_id1, user_id2 } = req.body

        const createdRoom = await Chat_Room.findOrCreate({
            where: {
                user_id1: user_id1,
                user_id2: user_id2,
            },


        })
        return res.status(200).json(createdRoom)
    },

    async find(req, res) {
        const chat_room = await Chat_Room.findAll()
        return res.json(chat_room)
    }
}