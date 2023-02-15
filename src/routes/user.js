import { Router } from 'express';
import UserController from '../controllers/user';
import loginRequired from '../middlewares/loginRequired';
import employeeRequired from '../middlewares/employeeRequired';

const router = new Router();

router.get("/", loginRequired, employeeRequired, UserController.index);
// router.post("/", UserController.create);
router.put("/", loginRequired, UserController.update);
router.post("/forgotPassword", UserController.redefinePass);
router.put("/redefine/:id", UserController.redefinePassword);
export default router;
