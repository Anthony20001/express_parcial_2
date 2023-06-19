"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatgptModel = void 0;
const mongoose_1 = require("mongoose");
const ChatgptSchema = new mongoose_1.Schema({
    prompt: String,
    response: String,
    id_user: String,
    date_create: Date
});
const chatgptModel = (0, mongoose_1.model)("chatgpt", ChatgptSchema);
exports.chatgptModel = chatgptModel;
