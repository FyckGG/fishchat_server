import UserService from "../services/UserService";
import express from "express";
class UserController {
  async registration(req: express.Request, res: express.Response) {
    try {
      const { email, login, password } = req.body;
      const result = await UserService.registration(email, login, password);
      res.cookie("refresh_token", result.refresh_token, {
        sameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      //console.log(gg);
      return res.json(result);
    } catch (e: any) {
      //console.log(e.message);
      res.status(400).send({ error: e.message });
    }
  }

  async authorization(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.authorization(email, password);
      res.cookie("refresh_token", result.refresh_token, {
        sameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(result);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
    }
  }

  async refresh(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refresh_token } = req.cookies;

      // console.log(refresh_token);

      const refresh_result = await UserService.refresh(refresh_token);
      res.cookie("refresh_token", refresh_result.refresh_token, {
        sameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(refresh_result);
    } catch (e: any) {
      next(e);
    }
  }

  async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { refresh_token } = req.cookies;
      const logout_result = await UserService.logout(refresh_token);
      res.clearCookie("refresh_token");
      return res.json(logout_result);
    } catch (e: any) {
      next(e);
    }
  }
}

export default new UserController();
