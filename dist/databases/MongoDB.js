"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    // @ts-ignore
    mongoose_1.default.connect(process.env.DB_URI)
        .then(() => console.log(`⚡️ [database]: Database is running`))
        .catch(() => console.log(`❌ [database]: Database is not running`));
};
exports.connect = connect;
