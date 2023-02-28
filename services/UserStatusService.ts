import { Types } from "mongoose";
import UserFriends from "../models/UserFriends";
import UserFollowers from "./../models/UserFollowers";
import BlockedUsers from "../models/BlockedUsers";
import userRelationships from "./../textConstants/userRelationships";

class UserStatusService {
  async getUsersRelationships(
    source_user_id: Types.ObjectId | string,
    target_user_id: Types.ObjectId | string
  ) {
    const is_friends = await UserFriends.findOne({
      user_1: source_user_id,
      user_2: target_user_id,
    });
    const swap_is_friends = await UserFriends.findOne({
      user_1: target_user_id,
      user_2: source_user_id,
    });
    if (is_friends || swap_is_friends) return userRelationships.FRIEND;
    const is_follow_source = await UserFollowers.findOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    if (is_follow_source) return userRelationships.SUBSCRIBER_SOURCE;
    const is_follow_target = await UserFollowers.findOne({
      source_id: target_user_id,
      target_id: source_user_id,
    });
    if (is_follow_target) return userRelationships.SUBSCRIBER_TARGET;
    const is_blocked_source = await BlockedUsers.findOne({
      source_id: source_user_id,
      target_id: target_user_id,
    });
    if (is_blocked_source) return userRelationships.BLOCKED_SOURCE;
    const is_blocked_target = await BlockedUsers.findOne({
      source_id: target_user_id,
      target_id: source_user_id,
    });
    if (is_blocked_target) return userRelationships.BLOCKED_TARGET;
    return userRelationships.DEFAULT;
  }
}

export default new UserStatusService();
