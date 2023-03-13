//dialog/get-user-dialogs/?user_id=${user_id}&dialog_count=20&dialog_part=0`
import User from "../models/User";
import DialogMessage from "../models/DialogMessage";
import DataBaseError from "../expections/DataBaseError";
import { Dialog } from "../globalInterfaces/Dialog";

class DialogService {
  async getUserDialogs(
    user_id: string,
    dialog_count: number,
    dialog_part: number
  ) {
    const is_user = await User.findById(user_id);

    if (!is_user) throw DataBaseError.DocumentNotFound("User not found");
    const interlocutors: string[] = [];
    const dialog_list: Dialog[] = [];
    const user_messages = await DialogMessage.find({
      $or: [{ source_id: user_id }, { target_id: user_id }],
    });

    user_messages.reverse();

    user_messages.map((message) => {
      if (
        !interlocutors.includes(message.source_id.toString()) &&
        message.source_id.toString() != user_id
      )
        interlocutors.push(message.source_id.toString());

      if (
        !interlocutors.includes(message.target_id.toString()) &&
        message.target_id.toString() != user_id
      )
        interlocutors.push(message.target_id.toString());
    });

    //console.log(interlocutors.length);

    for (let interlocutor of interlocutors) {
      const interlocutor_model = await User.findById(interlocutor);
      if (!interlocutor_model)
        throw DataBaseError.DocumentNotFound("Interlocutor not found");
      const dialog_messages = await DialogMessage.find({
        $or: [
          { source_id: user_id, target_id: interlocutor },
          { source_id: interlocutor, target_id: user_id },
        ],
      });
      dialog_messages.reverse();
      const dialog_messages_part = dialog_messages.slice(
        dialog_part * dialog_count,
        (dialog_part + 1) * dialog_count
      );
      dialog_messages_part.reverse();

      dialog_list.push({
        interlocutor_id: interlocutor,
        interlocutor_name: interlocutor_model.login,
        messages: dialog_messages_part,
        dialog_length: dialog_messages.length,
      });
    }

    //return dialog_list;
    return { dialogs: dialog_list, dialogs_count: interlocutors.length };
  }
}

export default new DialogService();
