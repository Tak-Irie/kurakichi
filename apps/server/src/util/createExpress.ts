import express from "express";
import cors from "cors";

import { testRouter } from "../route/testRoute";

const createExpress = async () => {
  const app = express();
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [
        process.env.CORS_WEB || "http://localhost:3000",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );

  //TODO:temp
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.use("/test", testRouter);

  return app;
};

export { createExpress };
