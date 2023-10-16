import { Router } from 'express';
import StudentController from '../controllers/student.js';
import leaderRequired from '../middlewares/leaderRequired.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();
const student_controller = new StudentController();
router.get("/", loginRequired, leaderRequired, student_controller.index);
router.post("/", loginRequired, leaderRequired, student_controller.create);
router.put("/:id", loginRequired, leaderRequired, student_controller.update);
router.delete("/:id", loginRequired, leaderRequired, student_controller.delete);

export default router;
