import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/authorization", UserController.authorization);
router.get("/refresh", UserController.refresh);

export default router;
