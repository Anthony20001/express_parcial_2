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
exports.validateLogin = void 0;
const request_1 = require("../utils/request");
const user_1 = require("../models/user");
const bcryptjs_1 = require("bcryptjs");
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, password } = req.body;
        if (!user)
            return res.status(400).json((0, request_1.requestReturn)('ko', '', { status: 400, 'message': 'El campo nombre es obligatorio.' }));
        if (!password)
            return res.status(400).json((0, request_1.requestReturn)('ko', '', { status: 400, 'message': 'El campo contraseña es obligatorio.' }));
        if (user && user.toString().length < 4)
            return res.status(400).json((0, request_1.requestReturn)('ok', '', { status: 400, 'message': 'El campo nombre debe contener al menos 4 caracteres.' }));
        const userDocument = yield user_1.UserModel.findOne({ 'user': user });
        if (!userDocument)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', { status: 404, 'message': 'No se encontró el usuario solicitado.' }));
        if (!(0, bcryptjs_1.compareSync)(password, userDocument.password))
            return res.status(401).json((0, request_1.requestReturn)('ko', '', { status: 401, 'message': 'Contraseña incorrecta. Intenta de nuevo.' }));
        next();
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.validateLogin = validateLogin;
