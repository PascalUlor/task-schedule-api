import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import TaskValidator from '../middleware/TaskValidator';
import Authentication from '../api/auth/authenticate';

const router = Router();


router.route('/')
  .post(Authentication, TaskValidator.taskInput, TaskController.createTask)
  .get(TaskController.getTasks);

router.route('/assign')
  .post(Authentication, TaskValidator.assignedTask, TaskController.taskAssign);

export default router;
