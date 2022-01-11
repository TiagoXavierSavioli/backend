const { Model, DataTypes } = require('sequelize');

class Message extends Model {
    static init(sequelize) {
        super.init({
            text: DataTypes.STRING(1500),
            file_type: DataTypes.STRING(10),
            file: DataTypes.BLOB,
            seen: DataTypes.BOOLEAN,
            reaction: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Chat_Room, { foreignKey: 'room_id', as: 'chat_room'})
    }
}
module.exports = Message
