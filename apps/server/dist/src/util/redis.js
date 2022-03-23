"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// import { RedisPubSub } from "graphql-redis-subscriptions";
const uri = process.env.REDIS_URI || "redis_store:6379";
const redisUri = `redis://${uri}`;
const redis = new ioredis_1.default(redisUri);
exports.redis = redis;
