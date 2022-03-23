import { Router } from "express";

import { redis } from "../util/createRedis";
import { createMongoClient } from "../util/createMongo";

const testRouter = Router();

testRouter.post("/mongo", async (req, res) => {
  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect();
    const query = { name: "Charley" };
    const result = await mongoClient
      .db("test")
      .collection("user")
      .insertOne(query);
    console.log("result:", result);
    res.send(result);
  } catch (err) {
    console.log("err:", err);
  } finally {
    await mongoClient.close();
  }
});

testRouter.get("/mongo", async (req, res) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const users = mongoClient.db("test").collection("user");
    const result = await users.find({}).toArray();
    // Query for a movie that has the title 'Back to the Future'
    console.log("result:", result);
    res.send(result);
  } catch (err) {
    console.log("err:", err);
  } finally {
    await mongoClient.close();
  }
});

testRouter.post("/redis", async (req, res) => {
  const result = await redis.set(req.body.key, req.body.value);
  res.send(result);
});

testRouter.get("/redis/:key", async (req, res) => {
  const result = await redis.get(req.params.key);
  res.send(result);
});

export { testRouter };
