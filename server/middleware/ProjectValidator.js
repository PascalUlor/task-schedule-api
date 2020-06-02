import checkItem from '../utils/checkInputs';
import requestHandler from '../utils/requestHandler';
import { User, Project } from '../database/models';
import winston from '../config/winston';

/**
 * Validates all routes
 * @class ProjectValidator
 */
export default class ProjectValidator {
  /**
   * Validates all user details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  // eslint-disable-next-line consistent-return
  static async projectInput(req, res, next) {
    const { name, body, status } = req.body;

    const check = checkItem({
      name, body, status,
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check,
      });
    }
    winston.info('>>>>> project input validated');
    next();
  }


  static async assignedProject(req, res, next) {
    const { userId } = req.decodedToken;

    const { projectId, assigneeId } = req.body;

    const userProject = await Project.findOne({
      where: { id: projectId },
      includes: [
        {
          model: User.findOne({ where: { id: userId } }),
        },
      ],
    });

    if (!userProject) {
      return requestHandler.error(
        res,
        403,
        'You don\'t have permission to assign this project',
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

    req.wip = userProject;
    next();
  }
}
