/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const UserProjects = sequelize.define('UserProjects', {
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
  }, {});
  UserProjects.associate = function (models) {
    // associations can be defined here
  };
  return UserProjects;
};
