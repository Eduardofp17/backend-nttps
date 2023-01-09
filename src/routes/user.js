import { Router } from 'express';
import UserController from '../controllers/user';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get("/", UserController.index);
router.post("/", UserController.create);
router.put("/", loginRequired, UserController.update);
export default router;
