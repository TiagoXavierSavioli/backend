const {Router} = require('express');
const ChatRoomController = require('../../Controllers/Chat/Chat_Room')
const MessageController = require('../../Controllers/Chat/Message')

const ChatRouter = Router();

//chat room
ChatRouter.get('/chat/find', ChatRoomController.find);
ChatRouter.post('/chat/new', ChatRoomController.store);
ChatRouter.get('/chat/:user_id1', ChatRoomController.index);

//message
ChatRouter.post('/chat/messages/:room_id/:user_id', MessageController.store)
ChatRouter.get('/chat/messages/find', MessageController.find)
ChatRouter.get('/chat/messages/:room_id', MessageController.index)

module.exports = ChatRouter