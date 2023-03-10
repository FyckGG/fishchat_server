import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";
import DialogController from "../controllers/DialogController";

const router = Router();

router.get(
  "/get-user-dialogs",
  authenticateToken,
  DialogController.getDialogMessages
);

export default router;
