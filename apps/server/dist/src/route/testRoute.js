"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
const redis_1 = require("../util/redis");
const mongo_1 = require("../util/mongo");
const testRouter = (0, express_1.Router)();
exports.testRouter = testRouter;
testRouter.post("/mongo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoClient = (0, mongo_1.createMongoClient)();
    try {
        yield mongoClient.connect();
        const query = { name: "Charley" };
        const result = yield mongoClient
            .db("test")
            .collection("user")
            .insertOne(query);
        console.log("result:", result);
        res.send(result);
    }
    catch (err) {
        console.log("err:", err);
    }
    finally {
        yield mongoClient.close();
    }
}));
testRouter.get("/mongo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoClient = (0, mongo_1.createMongoClient)();
    try {
        yield mongoClient.connect();
        const users = mongoClient.db("test").collection("user");
        const result = yield users.find({}).toArray();
        // Query for a movie that has the title 'Back to the Future'
        console.log("result:", result);
        res.send(result);
    }
    catch (err) {
        console.log("err:", err);
    }
    finally {
        yield mongoClient.close();
    }
}));
testRouter.post("/redis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redis_1.redis.set(req.body.key, req.body.value);
    res.send(result);
}));
testRouter.get("/redis/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redis_1.redis.get(req.params.key);
    res.send(result);
}));
