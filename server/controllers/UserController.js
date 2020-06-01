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
}
