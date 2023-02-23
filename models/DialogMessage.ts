import { Schema, model } from "mongoose";

const DialogMessage = new Schema({
  source_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  target_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message_text: { type: String, required: true },
  is_message_read: { type: Boolean, required: true },
  message_date: { type: Date, default: Date.now, required: true },
});

export default model("DialogMessage", DialogMessage);
