const Sequelize = require('sequelize')
const debConfig = require('../Config/database')

// all models imports
const User = require('../Models/User/User')
const Information = require('../Models/User/Information')
const Moment = require('../Models/Moment/Moment')
const Tag = require('../Models/Moment/Tag')
const Coordinates = require('../Models/Location/Coordinates')
const Social_Links = require('../Models/User/Social_Links')
const Fans = require('../Models/User/follow')
const Chat_Room = require('../Models/Chat/chat_room')
const Message = require('../Models/Chat/message')
const Like = require('../Models/Moment/Like')
const Viewed = require('../Models/Moment/Viewed')


//mysql database connection
const connection = new Sequelize(debConfig)
try{
    connection.authenticate(),
    console.log('mysql databse connected')
}catch(error){
    console.log(error)
}

//models connections
User.init(connection)
Moment.init(connection)
Information.init(connection)
Tag.init(connection)
Coordinates.init(connection)
Social_Links.init(connection)
Fans.init(connection)
Message.init(connection)
Chat_Room.init(connection)
Like.init(connection)
Viewed.init(connection)


//models associations
User.associate(connection.models)
Moment.associate(connection.models)
Information.associate(connection.models)
Tag.associate(connection.models)
Coordinates.associate(connection.models)
Social_Links.associate(connection.models)
Fans.associate(connection.models)
Message.associate(connection.models)
Chat_Room.associate(connection.models)
Like.associate(connection.models)
Viewed.associate(connection.models)

module.exports = connection