import { Schema, model } from "mongoose";

const BlockedUsers = new Schema({
  source_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  target_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  blocking_date: { type: Date, default: Date.now, required: true },
});

//module.exports = new model("UserSchema", UserSchema);
//export const UserModel = model("UserSchema", UserSchema);
export default model("BlockedUsers", BlockedUsers);
