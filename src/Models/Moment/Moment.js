const { Model, DataTypes } = require('sequelize');

class Moment extends Model {
    static init(sequelize) {
        super.init({
            description: DataTypes.STRING(30),
            picture: DataTypes.BLOB,
            type: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsToMany(models.Tag, { foreignKey: 'moment_id', through: 'moment_tags', as: 'tags'})
    }
}
module.exports = Moment
