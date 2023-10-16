import { Router } from 'express';
import HomeController from '../controllers/home.js';

const router = new Router();

router.get("/", HomeController.index);

export default router;
