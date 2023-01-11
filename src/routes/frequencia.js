import { Router } from 'express';
import FrequenciaController from '../controllers/frequencia';
import loginRequired from '../middlewares/loginRequired';
import lastFrequency from '../controllers/lastFrequency';

const router = new Router();

router.get("/", loginRequired, FrequenciaController.index);
router.put("/", loginRequired, FrequenciaController.update);
router.get("/history", loginRequired, lastFrequency.index);
// router.post("/", FrequenciaController.create);
export default router;
