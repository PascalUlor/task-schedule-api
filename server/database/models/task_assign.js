/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const Task_Assign = sequelize.define('Task_Assign', {
    TaskId: DataTypes.INTEGER,
    ParticipantId: DataTypes.INTEGER,
  }, {});
  Task_Assign.associate = function (models) {
    // associations can be defined here
  };
  return Task_Assign;
};
