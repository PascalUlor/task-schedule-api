import { Op } from 'sequelize';
import { Task, User, Project } from '../../database/models';
import requestHandler from '../../utils/requestHandler';
import pagination from '../../utils/pagination';


/**
 * @class TaskController
*/

export default class TaskController {
  /**
   * @description Task details are entered into the database to create a Project
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

  static async taskAssign(req, res) {
    try {
      const { assigneeId } = req.body;

      const userTask = req.wip;

      const assignee = await User.findOne({
        where: { id: assigneeId },
        include: [
          {
            model: Task,
            as: 'tasks',
          },
        ],
      });

      if (!assignee.id) {
        return requestHandler.error(
          res,
          409,
          'User does not exist',
        );
      }

      if (assignee.tasks.length > 0) {
        return requestHandler.error(
          res,
          409,
          'User is already assigned this task',
        );
      }

      await userTask.addUser(assignee);

      return requestHandler.success(res, 200, 'New Assignee added to task successfully', {
        assignee,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }

  static async getTasks(req, res) {
    try {
      const {
        name, description, score,
      } = req.query;
      const scoreQuery = parseInt(score, 10);
      const { perPage, currentPage } = req.query;
      if (name || description || score) {
        const searchTasks = await Task.findAndCountAll(
          pagination(
            {
              where: {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${name}%` } },
                  { description: { [Op.iLike]: `%${description}%` } },
                  { score: scoreQuery },
                ],
              },
              order: [
                ['id', 'ASC'],
              ],
              include: [
                {
                  model: User,
                  as: 'users',
                  attributes: ['name', 'email'],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
            perPage, currentPage,
          ),
        );


        if (searchTasks.rows.length > 0) {
          return requestHandler.success(res, 200, 'Search by task name successfully', {
            ...searchTasks,
          });
        }
        return requestHandler.error(res, 400, 'Search by task name Failed');
      }
      const tasks = await Task.findAndCountAll(
        pagination(
          {
            order: [
              ['id', 'ASC'],
            ],
            include: [
              {
                model: User,
                as: 'users',
                attributes: ['name', 'email'],
                through: {
                  attributes: [],
                },
              },
            ],
          },
          perPage, currentPage,
        ),
      );

      return requestHandler.success(res, 200, 'Tasks fetched successfully', {
        ...tasks,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }
}
