import { Types } from "mongoose";
import FilterService from "./FilterService";
import UserStatusService from "./UserStatusService";
import UserDtoForSearch from "../dtos/UserDtoForSearch";
import MessageDto from "../dtos/MessageDto";
import MessageSearchService from "./MessageSearchService";

class UserSearchService {
  async searchUsersByName(
    searching_user: Types.ObjectId,
    search_string: string
  ) {
    const filtered_users_list = await FilterService.filterUsersByName(
      search_string
    );
    const user_dto_for_search: UserDtoForSearch[] = [];
    const messages_for_search: MessageDto[] = [];
    await Promise.all(
      filtered_users_list.map(async (user) => {
        const user_status = await UserStatusService.getUsersRelationships(
          searching_user,
          user._id
        );

        user_dto_for_search.push({
          ...new UserDtoForSearch(user, user_status),
        });

        const user_message =
          await MessageSearchService.searchLastMessageByUsername(
            searching_user,
            user._id
          );
        if (user_message)
          messages_for_search.push({ ...new MessageDto(user_message) });
      })
    );

    return {
      users: { ...user_dto_for_search },
      dialogs: { ...messages_for_search },
    };
  }
}

export default new UserSearchService();
