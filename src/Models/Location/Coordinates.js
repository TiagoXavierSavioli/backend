const { Model, DataTypes } = require('sequelize');

class Coordinates extends Model {
    static init(sequelize) {
        super.init({
            latitude: DataTypes.DECIMAL(20, 15),
            longitude: DataTypes.DECIMAL(20, 15),
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}
module.exports = Coordinates
