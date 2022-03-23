"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongoClient = void 0;
const mongodb_1 = require("mongodb");
const user = process.env.MONGO_USER;
// const user = process.env.MONGO_INITDB_ROOT_USER;
const password = process.env.MONGO_USER_PASSWORD;
// const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const uri = process.env.MONGO_URI || "mongo_store:27017";
const db = process.env.MONGO_INITDB_DATABASE || "";
const url = `mongodb://${user}:${password}@${uri}${db}`;
const createMongoClient = () => {
    let mongoOption;
    if (process.env.NODE_ENV === "production") {
        mongoOption = {
            tlsCAFile: `rds-combined-ca-bundle.pem`,
        };
    }
    console.log("url:", url);
    const client = new mongodb_1.MongoClient(url, mongoOption);
    return client;
};
exports.createMongoClient = createMongoClient;
