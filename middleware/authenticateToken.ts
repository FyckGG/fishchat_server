import express from "express";
import jwt from "jsonwebtoken";
import UserError from "../expections/UserError";

const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization as string;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCES_TOKEN_SECRET_KEY as jwt.Secret,
      //(err, user) => {
      (err) => {
        if (err) {
          throw UserError.UnautorizedError();
        }
        //req.user = user;
        next();
      }
    );
  } else {
    throw UserError.UnautorizedError();
  }
};

export default authenticateToken;
