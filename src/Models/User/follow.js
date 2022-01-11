const { Model, DataTypes, STRING } = require('sequelize');

class Fans extends Model {
    static init(sequelize) {
        super.init({
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'follow_id', through: 'user'})
        this.belongsTo(models.User, { foreignKey: 'fan_id', through: 'user'})
    }
}
module.exports = Fans
