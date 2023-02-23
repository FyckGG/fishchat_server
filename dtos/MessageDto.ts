import { Types } from "mongoose";

class MessageDto {
  id: Types.ObjectId;
  source_id: Types.ObjectId;
  target_id: Types.ObjectId;
  message_text: string;
  is_message_read: boolean;
  message_date: Date;
  constructor(message: any) {
    this.id = message._id;
    this.source_id = message.source_id;
    this.target_id = message.target_id;
    this.message_text = message.message_text;
    this.is_message_read = message.is_message_read;
    this.message_date = message.message_date;
  }
}

export default MessageDto;
