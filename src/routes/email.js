import { Router } from 'express';
import EmailController from '../controllers/email.js';

const router = new Router();

router.post('/pedido-aceito/', EmailController.PedidoAceito);
router.post('/pedido-negado/', EmailController.PedidoNegado);
router.post('/confirmar-email/', EmailController.ConfirmarEmail);
router.post('/enviar-feedback/', EmailController.EnviarFeedback);

export default router;
