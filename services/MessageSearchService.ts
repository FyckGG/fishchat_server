import DialogMessage from "../models/DialogMessage";
import { Types } from "mongoose";

class MessageSearchService {
  async searchLastMessageByUsername(
    source_user_id: Types.ObjectId,
    target_user_id: Types.ObjectId
  ) {
    const search_message_result = await DialogMessage.findOne({
      source_id: source_user_id,
      target_id: source_user_id,
    });

    const swap_search_message_result = await DialogMessage.findOne({
      source_id: target_user_id,
      target_id: source_user_id,
    });

    if (search_message_result && swap_search_message_result) {
      if (
        search_message_result.message_date >
        swap_search_message_result.message_date
      )
        return search_message_result;
      else return swap_search_message_result;
    }

    if (search_message_result && !swap_search_message_result)
      return search_message_result;
    if (!search_message_result && swap_search_message_result)
      return swap_search_message_result;
    return null;
  }
}

export default new MessageSearchService();
