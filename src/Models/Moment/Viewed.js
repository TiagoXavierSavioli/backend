const { Model, DataTypes } = require('sequelize');

class Viewed extends Model {
    static init(sequelize) {
        super.init({
            type: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(models.Moment, { foreignKey: 'moment_id', as: 'moments'})
    }
}
module.exports = Viewed
