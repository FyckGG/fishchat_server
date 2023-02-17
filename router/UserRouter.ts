import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/authorization", UserController.authorization);
router.get("/refresh", UserController.refresh);
router.get("/logout", authenticateToken, UserController.logout);

export default router;
