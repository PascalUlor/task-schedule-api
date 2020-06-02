import { Task, User } from '../database/models';
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
      const user = await User.findOne({ where: { id: userId } });
      const task = await Task.findOne({
        where: { name },
      });
      if (task) {
        return requestHandler.error(
          res,
          409,
          `Task with name ${name} already exist`,
        );
      }

      const newTask = await Task.create({
        name, description, score, status, projectId,
      });
      user.addTasks(newTask);

      return requestHandler.success(res, 201, 'Task created successfully', newTask);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }
}
