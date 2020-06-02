import checkItem from '../utils/checkInputs';
import requestHandler from '../utils/requestHandler';
import { User, Project, Task } from '../database/models';
// import winston from '../config/winston';

/**
 * Validates all routes
 * @class TaskValidator
 */
export default class TaskValidator {
  /**
   * Validates all user details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  // eslint-disable-next-line consistent-return
  static async taskInput(req, res, next) {
    const {
      name, description, score, status, projectId,
    } = req.body;
    const check = checkItem({
      name, description, score, status, projectId,
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check,
      });
    }
    next();
  }

  static async assignedTask(req, res, next) {
    const { userId } = req.decodedToken;

    const { taskId, assigneeId } = req.body;

    const userTask = await Task.findOne({
      where: { id: taskId },
      includes: [
        {
          model: User.findOne({ where: { id: userId } }),
        },
      ],
    });

    if (!userTask) {
      return requestHandler.error(
        res,
        403,
        'You don\'t have permission to assign this task',
      );
    }

    const check = checkItem({
      assigneeId,
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check,
      });
    }

    req.wip = userTask;
    winston.info('>>>>> task input validated');
    next();
  }
}
