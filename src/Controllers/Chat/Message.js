const bcrypt = require('bcryptjs');

const User = require('../../Models/User/User');
const Chat_Room = require('../../Models/Chat/chat_room');
const Message = require('../../Models/Chat/message');

module.exports = {
    async index(req, res) {
        const { room_id } = req.params
        const messages = await Message.findAll({
            where: {room_id: room_id},
        })
        return res.status(200).json(messages.reverse())
    },
    
    async store(req, res) {
        const { text, file_type, file, seen, reaction } = req.body
        const { user_id, room_id } = req.params

        const room_find = await Chat_Room.findAll({where: {id: room_id}})

        if(!room_find) { throw new Error('chat room not exists') }
        if(text == '' || null) { throw new Error('message dont have body text') }

        const createdMessage = await Message.create({
            user_id: user_id,
            room_id: room_id,
            text: text,
            file_type: file_type,
            file: file,
            seen: seen,
            reaction: reaction,
        })
        return res.status(200).json(createdMessage)
    },

    async find(req, res) {
        const chat_room = await Message.findAll()
        return res.json(chat_room)
    }
}