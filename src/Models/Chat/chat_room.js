const { Model, DataTypes } = require('sequelize');

class Chat_Room extends Model {
    static init(sequelize) {
        super.init({
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id1', as: 'user' })
    }
}
module.exports = Chat_Room
