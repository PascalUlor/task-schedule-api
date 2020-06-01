
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.ENUM(['active', 'inactive', 'declined', 'completed']),
    userId: DataTypes.INTEGER,
  }, {});
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Project.hasMany(models.Task, { as: 'tasks', foreignKey: 'projectId', onDelete: 'CASCADE' });
    Project.belongsToMany(models.User, { through: 'Project_Assign', as: 'participants' });
  };
  return Project;
};
