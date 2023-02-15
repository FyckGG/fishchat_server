import { Schema } from "mongoose";

class UserDto {
  id: Schema.Types.ObjectId;
  email: string;
  login: string;
  constructor(user_model: any) {
    this.id = user_model._id;
    this.email = user_model.email;
    this.login = user_model.login;
  }
}

export default UserDto;
