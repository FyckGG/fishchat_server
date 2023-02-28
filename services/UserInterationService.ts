import UserFriends from "../models/UserFriends";
import UserFollowers from "../models/UserFollowers";
import BlockedUsers from "../models/BlockedUsers";
import User from "../models/User";
import UserStatusService from "./UserStatusService";
import DataBaseError from "../expections/DataBaseError";

class UserInterationService {
  // добавить проверку что юзеры не заблочены не дружат и тд
  async sendFollow(source_user_id: string, target_user_id: string) {
    const source_user = await User.findById(source_user_id);
    if (!source_user)
      throw DataBaseError.DocumentNotFound("Source user not found");
    const target_user = await User.findById(target_user_id);
    if (!target_user)
      throw DataBaseError.DocumentNotFound("Target user not found");
    const is_follow = await UserFollowers.findOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    if (is_follow) throw DataBaseError.AddingAgainError();
    await UserFollowers.create({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    const user_status = await UserStatusService.getUsersRelationships(
      source_user_id,
      target_user_id
    );

    return user_status;
  }

  async cancelFollow(source_user_id: string, target_user_id: string) {
    const source_user = await User.findById(source_user_id);
    if (!source_user)
      throw DataBaseError.DocumentNotFound("Source user not found");
    const target_user = await User.findById(target_user_id);
    if (!target_user)
      throw DataBaseError.DocumentNotFound("Target user not found");
    const is_follow = await UserFollowers.findOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });

    if (!is_follow) throw DataBaseError.CancelActionError();

    await UserFollowers.deleteOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    const user_status = await UserStatusService.getUsersRelationships(
      source_user_id,
      target_user_id
    );

    return user_status;
  }

  async banUser(source_user_id: string, target_user_id: string) {
    const source_user = await User.findById(source_user_id);
    if (!source_user)
      throw DataBaseError.DocumentNotFound("Source user not found");
    const target_user = await User.findById(target_user_id);
    if (!target_user)
      throw DataBaseError.DocumentNotFound("Target user not found");
    const is_ban_user = await BlockedUsers.findOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    if (is_ban_user) throw DataBaseError.AddingAgainError();
    await UserFriends.deleteOne({
      user_1: source_user_id,
      user_2: target_user_id,
    });
    await UserFriends.deleteOne({
      user_1: target_user_id,
      user_2: source_user_id,
    });
    await UserFollowers.deleteOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    await UserFollowers.deleteOne({
      source_id: target_user_id,
      target_id: source_user_id,
    });

    await BlockedUsers.create({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    const user_status = await UserStatusService.getUsersRelationships(
      source_user_id,
      target_user_id
    );
    return user_status;
  }

  async cancelBanUser(source_user_id: string, target_user_id: string) {
    const source_user = await User.findById(source_user_id);
    if (!source_user)
      throw DataBaseError.DocumentNotFound("Source user not found");
    const target_user = await User.findById(target_user_id);
    if (!target_user)
      throw DataBaseError.DocumentNotFound("Target user not found");
    const is_ban = await BlockedUsers.findOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });

    if (!is_ban) throw DataBaseError.CancelActionError();

    await BlockedUsers.deleteOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    const user_status = await UserStatusService.getUsersRelationships(
      source_user_id,
      target_user_id
    );

    return user_status;
  }
}

export default new UserInterationService();
