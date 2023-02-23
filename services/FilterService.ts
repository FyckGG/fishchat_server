import User from "../models/User";
import natural from "natural";

class FilterService {
  async filterUsersByName(search_string: string) {
    const users_list = await User.find();
    const filtered_users_list = users_list.filter((user) =>
      natural.PorterStemmer.stem(user.login).includes(
        natural.PorterStemmer.stem(search_string)
      )
    );
    return filtered_users_list;
  }
}

export default new FilterService();
