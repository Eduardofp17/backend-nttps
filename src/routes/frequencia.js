import { Router } from 'express';
import FrequenciaController from '../controllers/frequencia';
import loginRequired from '../middlewares/loginRequired';
import lastFrequency from '../controllers/lastFrequency';
import leaderRequired from '../middlewares/leaderRequired';
import employeeRequired from '../middlewares/employeeRequired';

const router = new Router();

router.get("/", loginRequired, leaderRequired, FrequenciaController.index);
router.put("/", loginRequired, leaderRequired, FrequenciaController.update);
router.get("/history", loginRequired, employeeRequired, lastFrequency.index);
router.post("/", loginRequired, employeeRequired, FrequenciaController.create);
export default router;
