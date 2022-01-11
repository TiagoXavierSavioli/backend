'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('social_links', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  
      },
      instagram: {
        type: Sequelize.STRING(100),
      },
      tiktok: {
        type: Sequelize.STRING(100),
      },
      snapchat: {
        type: Sequelize.STRING(100),
      },
      whatsapp: {
        type: Sequelize.STRING(100),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false  
      }
    })  
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('social_links')
  }
};
