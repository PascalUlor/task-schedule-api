/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const Project_Assign = sequelize.define('Project_Assign', {
    ProjectId: DataTypes.INTEGER,
    ParticipantId: DataTypes.INTEGER,
  }, {});
  Project_Assign.associate = function (models) {
    // associations can be defined here
  };
  return Project_Assign;
};
