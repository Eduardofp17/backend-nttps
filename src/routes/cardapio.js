import { Router } from 'express';
import CardapioController from '../controllers/cardapio.js';
import loginRequired from '../middlewares/loginRequired.js';
import employeeRequired from '../middlewares/employeeRequired.js';

const router = new Router();

router.get("/", CardapioController.index);
router.get("/all", loginRequired, CardapioController.indexAll);
router.put("/:id", loginRequired, employeeRequired, CardapioController.update);
router.post("/", loginRequired, employeeRequired, CardapioController.create);
router.delete("/:id", loginRequired, employeeRequired, CardapioController.delete);
export default router;
