import { Router } from 'express';
import usersRoutes from './users';
import projectRoutes from './projects';

const router = Router();


router.use('/users', usersRoutes);
router.use('/projects', projectRoutes);

export default router;
