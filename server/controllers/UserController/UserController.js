import { Op } from 'sequelize';
import { User, Project } from '../../database/models';
import requestHandler from '../../utils/requestHandler';
import generateToken from '../../utils/generateToken';
import pagination from '../../utils/pagination';

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
      return generateToken(res, 201, 'User created successfully', newUser);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }

  static async handleGetUserList(req, res) {
    try {
      const { name, surname } = req.query;
      const { perPage, currentPage } = req.query;

      if (name) {
        const userName = name.replace(/ /g, '');
        const searchUsers = await User.findAndCountAll(
          pagination(
            {
              where: {
                name: { [Op.iLike]: `%${userName}%` },
              },
              order: [
                ['id', 'ASC'],
              ],
              include: [
                {
                  model: Project,
                  as: 'projects',
                  attributes: ['name', 'body'],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
            perPage, currentPage,
          ),
        );

        if (searchUsers.rows.length > 0) {
          return requestHandler.success(res, 200, 'Search by user name successfully', {
            ...searchUsers,
          });
        }
        return requestHandler.error(res, 400, 'Search by user name Failed');
      }

      if (surname) {
        const userSurname = surname.replace(/ /g, '');
        const searchUsers = await User.findAndCountAll(
          pagination(
            {
              where: {
                surname: { [Op.iLike]: `%${userSurname}%` },
              },
              order: [
                ['id', 'ASC'],
              ],
              include: [
                {
                  model: Project,
                  as: 'projects',
                  attributes: ['name', 'body'],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
            perPage, currentPage,
          ),
        );
        if (searchUsers.rows.length > 0) {
          return requestHandler.success(res, 200, 'Search by surname successfully', {
            ...searchUsers,
          });
        }
        return requestHandler.error(res, 400, 'Search by surname Failed');
      }

      const users = await User.findAndCountAll(
        pagination(
          {
            include: [
              {
                model: Project,
                as: 'projects',
                attributes: ['name', 'body'],
                through: {
                  attributes: [],
                },
              },
            ],
          },
          perPage, currentPage,
        ),
      );
      return requestHandler.success(res, 200, 'Users fetched successfully', {
        ...users,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }
}
