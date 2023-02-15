import jwt from "jsonwebtoken";
import UserError from "../expections/UserError";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.autorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCES_TOKEN_SECRET_KEY as jwt.Secret,
      (err, user) => {
        if (err) {
          throw UserError.UnautorizedError();
        }
        req.user = user;
        next();
      }
    );
  } else {
    throw UserError.UnautorizedError();
  }
};
