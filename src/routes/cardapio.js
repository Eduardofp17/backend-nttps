import { Router } from 'express';
import CardapioController from '../controllers/cardapio';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get("/", loginRequired, CardapioController.index);
router.put("/:id", loginRequired, CardapioController.update);
router.post("/", loginRequired, CardapioController.create);
router.delete("/:id", loginRequired, CardapioController.delete);
export default router;
