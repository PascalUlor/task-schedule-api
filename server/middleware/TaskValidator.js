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
    const { userId } = req.decodedToken;
    const {
      name, description, score, status, projectId,
    } = req.body;
    const userProject = await Project.findOne({
      where: { userId },
    });

    if (!userProject) {
      return requestHandler.error(
        res,
        403,
        'You don\'t have permission to access this project',
      );
    }

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
}
