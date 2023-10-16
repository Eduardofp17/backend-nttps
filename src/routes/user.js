import { Router } from 'express';
import UserController from '../controllers/user.js';
import loginRequired from '../middlewares/loginRequired.js';
import employeeRequired from '../middlewares/employeeRequired.js';
import adminRequired from '../middlewares/adminRequired.js';

const router = new Router();

router.get("/", loginRequired, employeeRequired, UserController.index);
// router.post("/", UserController.create);
router.put("/", loginRequired, UserController.update);
router.put("/update-user-role/:id", loginRequired, adminRequired, UserController.updateRole);
router.post("/forgotPassword", UserController.redefinePass);
router.put("/redefine/:id", UserController.redefinePassword);
router.delete("/:id", loginRequired, adminRequired, UserController.deleteUser);
export default router;
