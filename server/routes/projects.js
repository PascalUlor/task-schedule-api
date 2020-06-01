import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidator from '../middleware/ProjectValidator';
import Authentication from '../api/auth/authenticate';

const router = Router();


router.route('/')
  .post(Authentication, ProjectValidator.projectInput, ProjectController.createProject);
//   .get(UserController.handleGetUserList);

export default router;
