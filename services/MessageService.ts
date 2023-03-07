import DialogMessage from "../models/DialogMessage";
import UserFriend from "../models/UserFriends";
import MessageError from "../expections/MessageError";

class MessageService {
  async sendDialogMessage(
    source_user_id: string,
    target_user_id: string,
    message_text: string
  ) {
    const is_friends = await UserFriend.findOne({
      user_1: source_user_id,
      user_2: target_user_id,
    });
    const swap_is_friends = await UserFriend.findOne({
      user_1: target_user_id,
      user_2: source_user_id,
    });
    if (!is_friends && !swap_is_friends)
      throw MessageError.BadRequest("You can send message only friends");
    const new_message = await DialogMessage.create({
      source_id: source_user_id,
      target_id: target_user_id,
      message_text: message_text,
    });
    return new_message;
  }

  async changeMessageReadStatus(message_id: string) {
    const message = await DialogMessage.findById(message_id);
    if (!message) throw MessageError.BadRequest("Message not found");
    message.is_message_read = true;
    message.save();

    return {
      message_id: message._id,
      source_user_id: message.source_id,
      target_user_id: message.target_id,
    };
  }
}

export default new MessageService();
