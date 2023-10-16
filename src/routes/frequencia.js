import { Router } from 'express';
import FrequenciaController from '../controllers/frequencia.js';
import loginRequired from '../middlewares/loginRequired.js';
import lastFrequency from '../controllers/lastFrequency.js';
import leaderRequired from '../middlewares/leaderRequired.js';
import employeeRequired from '../middlewares/employeeRequired.js';

const router = new Router();

router.get("/", loginRequired, leaderRequired, FrequenciaController.index);
router.get("/only-today/", loginRequired, leaderRequired, FrequenciaController.indexOnlyToday);
router.get("/list-room-frequencies/:id", loginRequired, leaderRequired, FrequenciaController.indexRoomFrequency);
router.put("/:id", loginRequired, leaderRequired, FrequenciaController.update);
router.get("/history", loginRequired, employeeRequired, lastFrequency.index);
router.post("/", loginRequired, employeeRequired, FrequenciaController.create);
router.delete("/:id", loginRequired, employeeRequired, FrequenciaController.delete);
export default router;
