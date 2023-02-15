import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  login: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  sign_date: { type: Date, default: Date.now },
});

//module.exports = new model("UserSchema", UserSchema);
//export const UserModel = model("UserSchema", UserSchema);
export default model("UserSchema", UserSchema);
