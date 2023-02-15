import { Schema, model } from "mongoose";

const UserToken = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refresh_token: { type: String, required: true },
});

export default model("UserToken", UserToken);
