import { Types } from "mongoose";
import FilterService from "./FilterService";
import UserStatusService from "./UserStatusService";
import UserDtoForSearch from "../dtos/UserDtoForSearch";

class UserSearchService {
  async searchByName(searching_user: Types.ObjectId, search_string: string) {
    const filtered_users_list = await FilterService.filterUsersByName(
      search_string
    );
    const user_dto_for_search: UserDtoForSearch[] = [];
    await Promise.all(
      filtered_users_list.map(async (user) => {
        const user_status = await UserStatusService.getUsersRelationships(
          searching_user,
          user._id
        );

        user_dto_for_search.push({
          ...new UserDtoForSearch(user, user_status),
        });
      })
    );

    return { ...user_dto_for_search };
  }
}

export default new UserSearchService();
