/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const UserTasks = sequelize.define('UserTasks', {
    TaskId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {});
  UserTasks.associate = function (models) {
    // associations can be defined here
  };
  return UserTasks;
};
