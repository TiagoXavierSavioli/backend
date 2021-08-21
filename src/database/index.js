const Sequelize = require('sequelize')
const debConfig = require('../config/database.js')

// all models imports
const User = require('../Models/User/User')
const Information = require('../Models/User/Information')
const Moment = require('../Models/Moment/Moment')
const Tag = require('../Models/Moment/Tag')
const Coordinates = require('../Models/Location/Coordinates')

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


//models associations
User.associate(connection.models)
Moment.associate(connection.models)
Information.associate(connection.models)
Tag.associate(connection.models)
Coordinates.associate(connection.models)

module.exports = connection