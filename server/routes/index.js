import { Router } from 'express';
import usersRoutes from './users';
import projectRoutes from './projects';
import taskRoutes from './tasks';

const router = Router();


router.use('/users', usersRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

export default router;
