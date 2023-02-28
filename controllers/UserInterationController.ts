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

  async cancelFollow(req: express.Request, res: express.Response) {
    try {
      const { source_user_id, target_user_id } = req.body;
      const result = await UserInterationService.cancelFollow(
        source_user_id,
        target_user_id
      );
      return res.json(result);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  }

  async banUser(req: express.Request, res: express.Response) {
    try {
      const { source_user_id, target_user_id } = req.body;
      const result = await UserInterationService.banUser(
        source_user_id,
        target_user_id
      );
      return res.json(result);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  }

  async cancelBanUser(req: express.Request, res: express.Response) {
    try {
      const { source_user_id, target_user_id } = req.body;
      const result = await UserInterationService.cancelBanUser(
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
