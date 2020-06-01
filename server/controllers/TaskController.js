import { Task } from '../database/models';
import requestHandler from '../utils/requestHandler';


/**
 * @class TaskController
*/

export default class TaskController {
  /**
   * @description Project details are entered into the database to create a Project
   * @memberof TaskController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */

  static async createTask(req, res) {
    try {
      const { userId } = req.decodedToken;
      const {
        name, description, score, status, projectId,
      } = req.body;

      const newProject = await Task.create({
        name, description, score, status, projectId, userId,
      });
      return requestHandler.success(res, 201, 'Task created successfully', newProject);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }
}
