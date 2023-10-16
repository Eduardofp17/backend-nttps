import { Router } from "express";
import RequestsController from "../controllers/request.js";
import loginRequired from "../middlewares/loginRequired.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = new Router();

router.get("/", loginRequired, adminRequired, RequestsController.index);
router.post("/", RequestsController.create);
router.get("/confirm/:id", RequestsController.confirmEmail);
router.post("/accept/", loginRequired, adminRequired, RequestsController.acceptRequest);
router.post("/reject/", loginRequired, adminRequired, RequestsController.rejectRequest);

export default router;
