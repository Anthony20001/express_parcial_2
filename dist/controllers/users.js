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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.loginUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const request_1 = require("../utils/request");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => {
    try {
        const { user, password } = req.body;
        // @ts-ignore
        jsonwebtoken_1.default.sign({ user, password }, process.env.LOCAL_KEY, { expiresIn: "259200s" }, (error, token) => {
            if (error)
                return res.status(500).json((0, request_1.requestReturn)('ko', '', {
                    status: 500,
                    'message': 'No se pudo generar el token de autenticación. Inténtalo nuevamente más tarde.'
                }));
            if (token)
                return res.status(200)
                    .setHeader('X-Auth-Token', token)
                    .json((0, request_1.requestReturn)('ok', 'Sesión iniciada'));
        });
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
};
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.UserModel.findById(id);
        if (!user)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', {
                status: 404,
                'message': 'No se encontró el usuario solicitado.'
            }));
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
        if (user && user.toString().length < 4)
            return res.status(400).json(error('El campo nombre debe contener al menos 4 caracteres.'));
        if (password && password.toString().length < 6)
            return res.status(400).json(error('El campo contraseña debe contener al menos 6 caracteres.'));
        let hash;
        if (password) {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            hash = (0, bcryptjs_1.hashSync)(password.toString(), salt.toString());
        }
        const updatedAt = new Date();
        const originalUserDocument = yield user_1.UserModel.findById(id);
        const newUserDocument = yield user_1.UserModel.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign({ 'user': user ? user : originalUserDocument.user }, { 'name': name ? name : originalUserDocument.name }), { 'password': hash !== null && hash !== void 0 ? hash : originalUserDocument.password }), { updatedAt }), { new: true });
        if (!newUserDocument)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', {
                status: 404,
                'message': 'No se encontró el usuario solicitado.'
            }));
        return res.status(200).json((0, request_1.requestReturn)('ok', newUserDocument));
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
            return res.status(404).json((0, request_1.requestReturn)('ko', '', {
                status: 404,
                'message': 'No se encontró el usuario solicitado.'
            }));
        return res.status(200).json((0, request_1.requestReturn)('ok', user));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.deleteUser = deleteUser;
const error = (message) => {
    return (0, request_1.requestReturn)('ko', '', { 'status': 400, 'message': message });
};
