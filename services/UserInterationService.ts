import UserFollowers from "../models/UserFollowers";
import User from "../models/User";
import DataBaseError from "../expections/DataBaseError";

class UserInterationService {
  async sendFollow(source_user_id: string, target_user_id: string) {
    const source_user = await User.findById(source_user_id);
    if (!source_user)
      throw DataBaseError.DocumentNotFound("Source user not found");
    const target_user = await User.findById(target_user_id);
    if (!target_user)
      throw DataBaseError.DocumentNotFound("Target user not found");
    const new_user_follow = await UserFollowers.create({
      source_id: source_user_id,
      target_id: target_user_id,
    });

    return new_user_follow;
  }
}

export default new UserInterationService();
