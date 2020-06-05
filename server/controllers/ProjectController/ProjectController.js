import { Op } from 'sequelize';
import { Project, User } from '../../database/models';
import requestHandler from '../../utils/requestHandler';
import pagination from '../../utils/pagination';


/**
 * @class ProjectController
*/

export default class ProjectController {
  /**
   * @description Project details are entered into the database to create a Project
   * @memberof ProjectController
   * @static
   *
   * @param   {object} req the server/http(s) request object
   * @param   {object} res the server/http(s) response object
   *
   * @returns {object} failure or success message
   * object with the persisted database data
   */

  static async createProject(req, res) {
    try {
      const { userId } = req.decodedToken;
      const { name, body, status } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      const project = await Project.findOne({
        where: { name },
      });
      if (project) {
        return requestHandler.error(
          res,
          409,
          `Project with name ${name} already exist`,
        );
      }
      const newProject = await Project.create({
        name, body, status,
      });
      user.addProjects(newProject);
      return requestHandler.success(res, 201, 'Project created successfully', newProject);
    } catch (err) {
      return requestHandler.error(res, 500, `server error ${err.message}`);
    }
  }

  static async projectAssign(req, res) {
    try {
      const { assigneeId } = req.body;

      const userProject = req.wip;

      const assignee = await User.findOne({
        where: { id: assigneeId },
        include: [
          {
            model: Project,
            as: 'projects',
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

      if (assignee.projects.length > 0) {
        return requestHandler.error(
          res,
          409,
          'User is already assigned this project',
        );
      }

      await userProject.addUser(assignee);

      return requestHandler.success(res, 200, 'New Assignee added to project successfully', {
        assignee,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }

  static async getProjects(req, res) {
    try {
      const {
        name, body,
      } = req.query;
      const { perPage, currentPage } = req.query;
      if (name || body) {
        const searchProjects = await Project.findAndCountAll(
          pagination(
            {
              where: {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${name}%` } },
                  { body: { [Op.iLike]: `%${body}%` } },
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

        if (searchProjects.rows.length > 0) {
          return requestHandler.success(res, 200, 'Search by project name successfully', {
            ...searchProjects,
          });
        }
        return requestHandler.error(res, 400, 'Search by project name Failed');
      }
      const projects = await Project.findAndCountAll(
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

      return requestHandler.success(res, 200, 'Projects fetched successfully', {
        ...projects,
      });
    } catch (error) {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    }
  }
}
