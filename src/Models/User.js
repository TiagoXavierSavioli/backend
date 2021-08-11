const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING(30),
            password: DataTypes.STRING(100),
            picture: DataTypes.BLOB
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Moment, { foreignKey: 'user_id', as: 'moments' })
        this.belongsToMany(models.Tag, { foreignKey: 'user_id', through: 'moment_tags', as: 'tags'})
        this.hasOne(models.Information, { foreignKey: 'user_id', as: 'informations' })
    }
}
module.exports = User
