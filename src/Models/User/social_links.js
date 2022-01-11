const { Model, DataTypes, STRING } = require('sequelize');

class Social_Links extends Model {
    static init(sequelize) {
        super.init({
            instagram: DataTypes.STRING(100),
            tiktok: DataTypes.STRING(100),
            snapchat: DataTypes.STRING(100),
            whatsapp: DataTypes.STRING(100),
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}
module.exports = Social_Links;
