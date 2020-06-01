import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../middleware/UserValidator';

const router = Router();


router.route('/').post(UserValidator.userInput, UserController.createUser);

export default router;
