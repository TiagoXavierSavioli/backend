const { Model, DataTypes, STRING } = require('sequelize');

class Information extends Model {
    static init(sequelize) {
        super.init({
            phone: DataTypes.STRING,
            email: DataTypes.STRING(100),
            gender: DataTypes.STRING(10),
            orientation: DataTypes.STRING(10),
            birthday: STRING(10)
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}
module.exports = Information
