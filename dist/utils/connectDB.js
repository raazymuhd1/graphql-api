"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    try {
        const dbUrl = process.env.MONGODB_URL;
        if (dbUrl) {
            await mongoose_1.default.connect(dbUrl, // enabling/disabling autoIndex on development and production 
            { autoIndex: process.env.NODE_ENV === "development" ? true : false });
            console.log("db is connected");
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDb = connectDb;
