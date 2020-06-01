import { Project } from '../database/models';
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

      const newProject = await Project.create({
        name, body, status, userId,
      });
      return requestHandler.success(res, 201, 'Project created successfully', newProject);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }
}
