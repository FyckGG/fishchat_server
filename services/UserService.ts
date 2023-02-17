import UserSchema from "./../models/User";
import UserError from "../expections/UserError";
import DataBaseError from "../expections/DataBaseError";
import UserDto from "../dtos/UserDto";
import TokensService from "./TokenService";
import bcrypt from "bcryptjs";

class UserService {
  async registration(email: string, login: string, password: string) {
    const candidat_by_email = await UserSchema.findOne({ email: email });
    if (candidat_by_email)
      throw UserError.BadRequest("A user with this email already exists");
    const candidate_by_login = await UserSchema.findOne({ login: login });
    if (candidate_by_login)
      throw UserError.BadRequest("A user with this username already exists");
    const hash_password = bcrypt.hashSync(password, 7);
    const new_user = await UserSchema.create({
      email: email,
      login: login,
      password: hash_password,
    });
    const new_user_dto = new UserDto(new_user);
    const tokens = await TokensService.generateTokens({ ...new_user_dto });
    await TokensService.saveToken(new_user._id, tokens.refresh_token);
    return { ...tokens, user: new_user_dto };
  }

  async authorization(email: string, password: string) {
    const user = await UserSchema.findOne({ email: email });
    //console.log(user);
    if (!user) throw UserError.BadRequest(`User with email ${email} not found`);
    const is_valid_password = bcrypt.compareSync(password, user.password);
    if (!is_valid_password) throw UserError.BadRequest(`Invalid password`);
    const user_dto = new UserDto(user);
    const tokens = await TokensService.generateTokens({ ...user_dto });
    await TokensService.saveToken(user._id, tokens.refresh_token);
    return { ...tokens, user: user_dto };
  }

  async refresh(refresh_token: string) {
    if (!refresh_token) throw UserError.UnautorizedError();

    const UserData = TokensService.validateRerfreshToken(refresh_token);
    const token_from_DB = await TokensService.findToken(refresh_token);
    if (!UserData || !token_from_DB) throw UserError.UnautorizedError();
    const user = await UserSchema.findById(UserData.id);
    if (!user) throw DataBaseError.DocumentNotFound("User not found");
    const new_user_dto = new UserDto(user);
    const tokens = await TokensService.generateTokens({ ...new_user_dto });
    await TokensService.saveToken(user._id, tokens.refresh_token);
    return { ...tokens, user: new_user_dto };
  }

  async logout(refrehs_token: string) {
    if (!refrehs_token) throw UserError.UnautorizedError();
    const deleted_refresh_token = await TokensService.deleteToken(
      refrehs_token
    );
    return deleted_refresh_token;
  }
}

export default new UserService();
