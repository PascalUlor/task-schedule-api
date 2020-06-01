import { Op } from 'sequelize';
import { User } from '../database/models';
import requestHandler from '../utils/requestHandler';


/**
 * @class UserController
*/

export default class UserController {
  /**
   * @description Users details are entered into the database to create account
   * @memberof userController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */

  static async createUser(req, res) {
    try {
      const newUser = req.newuser;
      return requestHandler.success(res, 201, 'User created successfully', newUser);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }

  static async handleGetUserList(req, res) {
    try {
      const { name, surname } = req.query;
      if (name) {
        const userName = name.replace(/ /g, '');
        const searchUsers = await User.findAll({
          where: {
            name: { [Op.iLike]: `%${userName}%` },
          },
        });
        if (searchUsers.length > 0) {
          return requestHandler.success(res, 200, 'Search by user name successfully', {
            searchUsers,
          });
        }
        return requestHandler.error(res, 400, 'Search by user name Failed');
      }

      if (surname) {
        const userSurname = surname.replace(/ /g, '');
        const searchUsers = await User.findAll({
          where: {
            surname: { [Op.iLike]: `%${userSurname}%` },
          },
        });
        if (searchUsers.length > 0) {
          return requestHandler.success(res, 200, 'Search by surname successfully', {
            searchUsers,
          });
        }
        return requestHandler.error(res, 400, 'Search by surname Failed');
      }

      const users = await User.findAll();
      return requestHandler.success(res, 200, 'Users fetched successfully', {
        users,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }
}
