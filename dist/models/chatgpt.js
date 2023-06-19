"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatgptModel = void 0;
const mongoose_1 = require("mongoose");
const ChatgptSchema = new mongoose_1.Schema({
    prompt: String,
    response: String,
    id_user: String,
    createAt: Date
});
exports.ChatgptModel = (0, mongoose_1.model)("chatgpt", ChatgptSchema);
