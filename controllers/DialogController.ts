import DialogService from "../services/DialogService";
import express from "express";

class DialogController {
  async getDialogMessages(req: express.Request, res: express.Response) {
    try {
      // const user_1 = req.query.user_1;
      // const user_2 = req.query.user_2;
      // const message_count = req.query.message_count;
      // const list_part = req.query.list_part;

      // if (!user_1 || !user_2 || !list_part || !message_count) throw new Error();
      // if (isNaN(Number(message_count)) || isNaN(Number(list_part)))
      //   throw new Error();
      // const result = await MessageService.getDialogMessages(
      //   user_1.toString(),
      //   user_2.toString(),
      //   Number(message_count),
      //   Number(list_part)
      // );
      // return res.json(result);
      const user_id = req.query.user_id;
      const dialog_count = req.query.dialog_count;
      const dialog_part = req.query.dialog_part;
      //console.log(user_id);
      if (!user_id || isNaN(Number(dialog_count)) || isNaN(Number(dialog_part)))
        throw new Error();
      const result = await DialogService.getUserDialogs(
        user_id.toString(),
        Number(dialog_count),
        Number(dialog_part)
      );
      return res.json(result);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  }
}

export default new DialogController();
