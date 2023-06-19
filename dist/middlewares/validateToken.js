"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const request_1 = require("../utils/request");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    try {
        let token = "";
        if (req.headers["authorization"])
            token = req.headers["authorization"].split(" ")[1];
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.LOCAL_KEY, (error, data) => {
            if (error)
                return res.status(401).json((0, request_1.requestReturn)('ko', '', { status: 401, 'message': 'El token proporcionado no es válido' }));
            next();
        });
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
};
exports.validateToken = validateToken;
