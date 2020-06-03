
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.ENUM(['active', 'inactive', 'declined', 'completed']),

  }, {});
  Project.associate = function (models) {
    // associations can be defined here

    Project.hasMany(models.Task, { as: 'tasks', foreignKey: 'projectId', onDelete: 'CASCADE' });
    Project.belongsToMany(models.User, { through: 'UserProjects', as: 'users' });
  };
  return Project;
};
