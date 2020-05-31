
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Project_Assigns', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ProjectId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Projects',
        },
        key: 'id',
      },
      allowNull: false,
    },
    ParticipantId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Project_Assigns'),
};
