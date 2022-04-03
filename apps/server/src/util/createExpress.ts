import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { testRouter } from "../route/testRoute";
import { COOKIE_MAX_AGE, COOKIE_NAME, IS_PROD } from "./Constants";
import { Redis } from "ioredis";

type ExpressArgs = {
  redis: Redis;
};

const createExpress = async ({ redis }: ExpressArgs) => {
  const app = express();
  const RedisSessionStore = connectRedis(session);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisSessionStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: "lax",
        secure: IS_PROD,
        domain: IS_PROD ? "www.kurakichi.org" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.get("/t", (req, res) => {
    res.send("You have reached");
  });

  return app;
};

export { createExpress };
