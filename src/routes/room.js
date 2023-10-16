import { Router } from 'express';
import RoomControler from '../controllers/room.js';
import adminRequired from '../middlewares/adminRequired.js';
import loginRequired from '../middlewares/loginRequired.js';
import leaderRequired from '../middlewares/leaderRequired.js';

const router = new Router();

router.get("/", loginRequired, leaderRequired, RoomControler.index);
router.post("/", loginRequired, adminRequired, RoomControler.create);
router.put("/:id", loginRequired, adminRequired, RoomControler.update);
router.delete("/:id", loginRequired, adminRequired, RoomControler.delete);
export default router;
