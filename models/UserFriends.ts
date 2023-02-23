import { Schema, model } from "mongoose";

const UserFriends = new Schema({
  user_1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user_2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  add_date: { type: Date, default: Date.now, required: true },
});

//module.exports = new model("UserSchema", UserSchema);
//export const UserModel = model("UserSchema", UserSchema);
export default model("UserFriends", UserFriends);
