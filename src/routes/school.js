import { Router } from "express";
import school from "../controllers/school";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", school.index);
router.post("/", school.create);
router.put("/", loginRequired, school.update);
router.get("/confirm/:id", school.confirmEmail);
export default router;
