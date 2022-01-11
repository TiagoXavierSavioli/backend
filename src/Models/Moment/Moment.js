const { Model, DataTypes } = require('sequelize');

class Moment extends Model {
    static init(sequelize) {
        super.init({
            description: DataTypes.STRING(30),
            picture: DataTypes.BLOB,
            picture_low: DataTypes.BLOB,
            type: DataTypes.STRING,
            deleted: DataTypes.BOOLEAN
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsToMany(models.Tag, { foreignKey: 'moment_id', through: 'moment_tags', as: 'tags'})
        this.hasMany(models.Like, { foreignKey: 'moment_id', as: 'likes'})
        this.hasMany(models.Viewed, { foreignKey: 'moment_id', as: 'vieweds'})
    }
}
module.exports = Moment
