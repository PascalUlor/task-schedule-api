import checkItem from '../utils/checkInputs';
import requestHandler from '../utils/requestHandler';
import { User, Project } from '../database/models';
import winston from '../config/winston';

/**
 * Validates all routes
 * @class UserValidator
 */
export default class UserValidator {
  /**
   * Validates all user details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  // eslint-disable-next-line consistent-return
  static async userInput(req, res, next) {
    const { name, surname, email } = req.body;

    const check = checkItem({
      name, surname, email,
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check,
      });
    }
    const userEmail = await User.findOne({
      where: { email },
    });

    if (userEmail) {
      return requestHandler.error(
        res,
        409,
        `User with email ${email} already exist`,
      );
    }
    const newUser = await User.create({ name, surname, email });

    req.newuser = newUser;
    winston.info('>>>>> user input validated');
    next();
  }
}
