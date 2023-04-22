import { Router } from 'express';
import EmailController from '../controllers/email';

const router = new Router();

router.post('/', EmailController.create);

export default router;
