const Sequelize = require('sequelize')

const debConfig = require('../config/database.js')

const connection = new Sequelize(debConfig)
// import models
const User = require('../Models/User')
const Moment = require('../Models/Moment')
const Information = require('../Models/Information')
const Tag = require('../Models/Tag')

try{
    connection.authenticate(),
    console.log('mysql databse connected')
}catch(error){
    console.log(error)
}

User.init(connection)
Moment.init(connection)
Information.init(connection)
Tag.init(connection)

User.associate(connection.models)
Moment.associate(connection.models)
Information.associate(connection.models)
Tag.associate(connection.models)

module.exports = connection