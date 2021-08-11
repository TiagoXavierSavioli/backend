const { Model, DataTypes, STRING } = require('sequelize');

class Tag extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING(30),
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsToMany(models.Moment, { foreignKey: 'tag_id', through: 'moment_tags', as: 'moments'})
    }
}
module.exports = Tag
