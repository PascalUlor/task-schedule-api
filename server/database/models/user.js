
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Project, { as: 'projects', foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Task, { as: 'tasks', foreignKey: 'userId', onDelete: 'CASCADE' });
    User.belongsToMany(models.Task, { through: 'Task_Assign', as: 'taskAssigned' });
    User.belongsToMany(models.Project, { through: 'Project_Assign', as: 'projectAssigned' });
  };
  return User;
};
