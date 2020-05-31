
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM(['active', 'inactive', 'declined', 'completed']),
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, { as: 'user', foreignKey: 'userId', onDelete: 'CASCADE' });
    Task.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId', onDelete: 'CASCADE' });
    Task.belongsToMany(models.User, { through: 'Task_Assign', as: 'participants' });
  };
  return Task;
};
