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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.loginUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const request_1 = require("../utils/request");
const user_1 = require("../models/user");
const loginUser = (req, res) => {
    const user = new user_1.UserModel({});
};
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.UserModel.findById(id);
        if (!user)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', { status: 404, 'message': 'No se encontró el usuario solicitado.' }));
        return res.status(200).json((0, request_1.requestReturn)('ok', user));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, password, name } = req.body;
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const hash = (0, bcryptjs_1.hashSync)(password.toString(), salt.toString());
        const createdAt = new Date();
        const updatedAt = new Date();
        const userModel = new user_1.UserModel({ user, salt, 'password': hash, name, createdAt, updatedAt });
        yield userModel.save();
        return res.status(200).json((0, request_1.requestReturn)('ok', userModel));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user, password, name } = req.body;
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const hash = (0, bcryptjs_1.hashSync)(password.toString(), salt.toString());
        const updatedAt = new Date();
        const userModel = yield user_1.UserModel.findByIdAndUpdate(id, { name, 'password': hash, user, updatedAt }, { new: true });
        if (!userModel)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', { status: 404, 'message': 'No se encontró el usuario solicitado.' }));
        return res.status(200).json((0, request_1.requestReturn)('ok', userModel));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.UserModel.findByIdAndDelete(id);
        if (!user)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', { status: 404, 'message': 'No se encontró el usuario solicitado.' }));
        return res.status(200).json((0, request_1.requestReturn)('ok', user));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.deleteUser = deleteUser;
