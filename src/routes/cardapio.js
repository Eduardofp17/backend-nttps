import { Router } from 'express';
import CardapioController from '../controllers/cardapio';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get("/", CardapioController.index);
router.put("/:id", loginRequired, CardapioController.update);
export default router;
