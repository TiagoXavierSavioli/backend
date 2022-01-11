const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING(30),
            password: DataTypes.STRING(100),
            picture: DataTypes.BLOB,
            bg_picture: DataTypes.STRING(200),
            description: DataTypes.STRING(300)
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Moment, { foreignKey: 'user_id', as: 'moments' })
        this.belongsToMany(models.Tag, { foreignKey: 'user_id', through: 'moment_tags', as: 'tags'})
        this.hasOne(models.Information, { foreignKey: 'user_id', as: 'informations' })
        this.hasOne(models.Coordinates, { foreignKey: 'user_id', as: 'coordinates' })
        this.hasOne(models.Social_Links, { foreignKey: 'user_id', as: 'social_links' })
        this.hasMany(models.Fans, { foreignKey: 'follow_id', foreignKey: 'fan_id', as: 'fans'})
        this.hasMany(models.Message, { foreignKey: 'user_id', as: 'messages'})
        this.hasMany(models.Chat_Room, { foreignKey: 'user_id1', foreignKey: 'user_id2', as: 'chat_room' })
        this.belongsToMany(models.Like, { foreignKey: 'user_id', through: 'moment_likes', as: 'likes'})
        this.belongsToMany(models.Viewed, { foreignKey: 'user_id', through: 'moment_vieweds', as: 'vieweds'})
    }
}
module.exports = User
