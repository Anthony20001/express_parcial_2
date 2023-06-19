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
exports.validateUser = void 0;
const request_1 = require("../utils/request");
const user_1 = require("../models/user");
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { user, password, name } = req.body;
    if (!user)
        return res.status(400).json(error('El campo usuario es requerido.'));
    if (!password)
        return res.status(400).json(error('El campo contraseña es requerido.'));
    if (!name)
        return res.status(400).json(error('El campo nombre es requerido.'));
    if (user && user.length < 4)
        return res.status(400).json(error('El campo nombre debe contener al menos 4 caracteres.'));
    if (yield user_1.UserModel.findOne({ 'user': user }))
        return res.status(409).json(error('El nombre de usuario ya existente. Por favor, elige otro.'));
    if (password && password.toString().length < 6)
        return res.status(400).json(error('El campo contraseña debe contener al menos 6 caracteres.'));
    next();
});
exports.validateUser = validateUser;
const error = (message) => {
    return (0, request_1.requestReturn)('ko', '', { 'status': 400, 'message': message });
};
