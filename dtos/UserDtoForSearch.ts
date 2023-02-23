import { Schema } from "mongoose";
import RouteNames from "../textConstants/userRelationships";

class UserDtoForSearch {
  id: Schema.Types.ObjectId;
  //   email: string;
  login: string;
  status: RouteNames;
  constructor(user_model: any, status: RouteNames) {
    this.id = user_model._id;
    //this.email = user_model.email;
    this.login = user_model.login;
    this.status = status;
  }
}

export default UserDtoForSearch;
