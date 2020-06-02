import { Project, User } from '../database/models';
import requestHandler from '../utils/requestHandler';


/**
 * @class ProjectController
*/

export default class ProjectController {
  /**
   * @description Project details are entered into the database to create a Project
   * @memberof ProjectController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */

  static async createProject(req, res) {
    try {
      const { userId } = req.decodedToken;
      const { name, body, status } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      const project = await Project.findOne({
        where: { name },
      });
      if (project) {
        return requestHandler.error(
          res,
          409,
          `Project with name ${name} already exist`,
        );
      }
      const newProject = await Project.create({
        name, body, status,
      });
      user.addProjects(newProject);
      return requestHandler.success(res, 201, 'Project created successfully', newProject);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }

  static async projectAssign(req, res) {
    try {
      const { userId } = req.decodedToken;
      const { projectId, assigneeId } = req.body;

      const assignee = await User.findOne({ where: { id: assigneeId } });
      const userProject = await Project.findOne({
        where: { userId, id: projectId },
      });

      if (!userProject) {
        return requestHandler.error(
          res,
          403,
          'You don\'t have permission to access this project',
        );
      }

      await userProject.addUser(assignee);

      return requestHandler.success(res, 200, 'New Assignee added to project successfully', {
        userProject,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }
}
