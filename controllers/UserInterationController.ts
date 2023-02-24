import express from "express";
import UserInterationService from "../services/UserInterationService";

class UserInterationController {
  async sendFollow(req: express.Request, res: express.Response) {
    try {
      const { source_user_id, target_user_id } = req.body;
      const result = await UserInterationService.sendFollow(
        source_user_id,
        target_user_id
      );
      return res.json(result);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  }
}

export default new UserInterationController();
