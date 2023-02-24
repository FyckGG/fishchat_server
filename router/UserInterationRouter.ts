import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";
import UserInterationController from "../controllers/UserInterationController";

const router = Router();

// router.post("/registration", UserController.registration);
// router.post("/authorization", UserController.authorization);
// router.get("/refresh", UserController.refresh);
// router.get("/logout", authenticateToken, UserController.logout);
router.post(
  "/send-follow",
  authenticateToken,
  UserInterationController.sendFollow
);

export default router;
