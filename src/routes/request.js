import { Router } from "express";
import RequestsController from "../controllers/request";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, RequestsController.index);
router.post("/", RequestsController.create);
export default router;
