import { Router } from 'express';
import ProjectController from '../controllers/ProjectController/ProjectController';
import ProjectValidator from '../middleware/ProjectValidator';
import Authentication from '../api/auth/authenticate';

const router = Router();


router.route('/')
  .post(Authentication, ProjectValidator.projectInput, ProjectController.createProject)
  .get(ProjectController.getProjects);

router.route('/assign')
  .post(Authentication, ProjectValidator.assignedProject, ProjectController.projectAssign);

export default router;
