import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";
import UserInterationController from "../controllers/UserInterationController";

const router = Router();

router.post(
  "/send-follow",
  authenticateToken,
  UserInterationController.sendFollow
);
router.delete(
  "/cancel-follow",
  authenticateToken,
  UserInterationController.cancelFollow
);
router.post("/ban-user", authenticateToken, UserInterationController.banUser);
router.delete(
  "/cancel-ban-user",
  authenticateToken,
  UserInterationController.cancelBanUser
);

export default router;
