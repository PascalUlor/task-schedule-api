
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here

    User.belongsToMany(models.Task, { through: 'UserTasks', as: 'tasks' });
    User.belongsToMany(models.Project, { through: 'UserProjects', as: 'projects' });
  };
  return User;
};
