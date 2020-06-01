import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import TaskValidator from '../middleware/TaskValidator';
import Authentication from '../api/auth/authenticate';

const router = Router();


router.route('/')
  .post(Authentication, TaskValidator.taskInput, TaskController.createTask);
//   .get(UserController.handleGetUserList);

export default router;
