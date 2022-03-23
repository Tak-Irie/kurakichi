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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { UserProps } from "@kurakichi/user";
const testRoute_1 = require("./route/testRoute");
// import { connectMongo, createUser } from "./util/mongoose";
const app = (0, express_1.default)();
const port = 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: [
            process.env.CORS_NEXT,
            "https://studio.apollographql.com",
        ],
        credentials: true,
    }));
    //TODO:temp
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // await connectMongo();
    // console.log("mongo?:", process.env.MONGO_ROOT_USERNAME);
    app.get("/", (req, res) => {
        res.send("hello world");
    });
    // app.get("/user", async (req, res) => {
    //   const result = await createUser("test", "test@email.com");
    //   res.send(result);
    // });
    app.use("/test", testRoute_1.testRouter);
    app.listen(port, () => {
        console.log(`server started at ${port}`);
        console.log(`nice!!!!!!`);
        console.log(process.env.CORS_NEXT);
    });
});
main().catch((err) => {
    console.log("catching err:", err);
});
