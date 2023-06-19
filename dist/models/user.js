"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user: String,
    salt: String,
    password: String,
    name: String,
    createdAt: Date,
    updatedAt: Date,
});
const UserModel = (0, mongoose_1.model)("user", UserSchema);
exports.UserModel = UserModel;
