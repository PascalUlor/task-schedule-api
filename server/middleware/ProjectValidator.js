import checkItem from '../utils/checkInputs';
// import requestHandler from '../utils/requestHandler';
// import { User, Project } from '../database/models';
// import winston from '../config/winston';

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
    next();
  }
}
