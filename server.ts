import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import user_router from "./router/UserRouter";
import message_router from "./router/MessageRouter";
import createWss from "./websocket/websocket_server";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

const corsOptions = {
  credentials: true,
  origin: `${process.env.CLIENT_URL}`,
  optionSuccessStatus: 200,
};

const sessionConfig: session.SessionOptions = {
  secret: "sessoins",
  cookie: {
    sameSite: "none", // THIS is the config you are looing for.
    secure: true,
  },
};

app.use(session(sessionConfig));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded());
app.use(express.json());
app.use("/user", user_router);
app.use("/message", message_router);
mongoose.set("strictQuery", true);

const start = async () => {
  try {
    const db_url = process.env.DB_URL;
    await mongoose.connect(db_url as string);
    app.listen(PORT, () => console.log(`started on port ${PORT}`));
    createWss();
  } catch (e) {
    console.log(e);
  }
};

start();
