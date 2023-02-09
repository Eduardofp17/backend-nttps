import { Router } from 'express';
import CardapioController from '../controllers/cardapio';
import loginRequired from '../middlewares/loginRequired';
import employeeRequired from '../middlewares/employeeRequired';

const router = new Router();

router.get("/", loginRequired, CardapioController.index);
router.put("/:id", loginRequired, employeeRequired, CardapioController.update);
router.post("/", loginRequired, employeeRequired, CardapioController.create);
router.delete("/:id", loginRequired, employeeRequired, CardapioController.delete);
export default router;
