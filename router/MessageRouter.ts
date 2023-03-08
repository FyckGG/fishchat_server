import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";
import MessageController from "../controllers/MessageController";

const router = Router();

router.get(
  "/get-dialog-messages",
  authenticateToken,
  MessageController.getDialogMessages
);

export default router;
