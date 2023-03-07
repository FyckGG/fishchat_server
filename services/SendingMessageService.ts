import DialogMessage from "./../models/DialogMessage";
import UserFriend from "./../models/UserFriends";
import SendingMessageError from "../expections/SendingMessageError";

class SendingMessageService {
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
      throw SendingMessageError.BadRequest("You can send message only friends");
    const new_message = await DialogMessage.create({
      source_id: source_user_id,
      target_id: target_user_id,
      message_text: message_text,
    });
    return new_message;
  }
}

export default new SendingMessageService();
