import MessageService from "../services/MessageService";
import express from "express";

class MessageContorller {
  async getDialogMessages(req: express.Request, res: express.Response) {
    try {
      const user_1 = req.query.user_1;
      const user_2 = req.query.user_2;
      const message_count = req.query.message_count;
      const list_part = req.query.list_part;

      if (!user_1 || !user_2 || !list_part || !message_count) throw new Error();
      if (isNaN(Number(message_count)) || isNaN(Number(list_part)))
        throw new Error();
      const result = await MessageService.getDialogMessages(
        user_1.toString(),
        user_2.toString(),
        Number(message_count),
        Number(list_part)
      );
      return res.json(result);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  }
}

export default new MessageContorller();
