import jwt from "jsonwebtoken";
import UserTokens from "../models/UserTokens";
import mongoose from "mongoose";

class TokenService {
  async generateTokens(payload: object) {
    const acces_token = jwt.sign(
      payload,
      process.env.ACCES_TOKEN_SECRET_KEY as jwt.Secret,
      {
        expiresIn: "30m",
      }
    );
    const refresh_token = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY as jwt.Secret,
      {
        expiresIn: "30d",
      }
    );
    return { acces_token, refresh_token };
  }

  validateAccessToken(token: string) {
    try {
      const UserData = jwt.verify(
        token,
        process.env.ACCES_TOKEN_SECRET_KEY as jwt.Secret
      );
      return UserData;
    } catch (e) {
      return null;
    }
  }

  validateRerfreshToken(token: string) {
    try {
      const UserData = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET_KEY as jwt.Secret
      );
      return UserData as any;
    } catch (e) {
      return null;
    }
  }

  async saveToken(user_id: mongoose.Types.ObjectId, refresh_token: string) {
    const token_data = await UserTokens.findOne({ user: user_id });
    if (token_data) {
      token_data.refresh_token = refresh_token;
      return token_data.save();
    }
    const new_token_data = await UserTokens.create({
      user: user_id,
      refresh_token: refresh_token,
    });
    return new_token_data.save();
  }

  async findToken(token: string) {
    const finded_token = await UserTokens.findOne({ refresh_token: token });
    return finded_token;
  }

  async deleteToken(token: string) {
    const deleted_token = await UserTokens.deleteOne({ refresh_token: token });
    return deleted_token;
  }
}
export default new TokenService();
