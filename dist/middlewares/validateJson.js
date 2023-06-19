"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJson = void 0;
const request_1 = require("../utils/request");
const validateJson = (req, res, next) => {
    try {
        JSON.parse(req.body);
    }
    catch (e) {
        return res.status(400).json((0, request_1.requestReturn)('ko', '', { 'status': 400, 'message': 'Formato JSON inválido' }));
    }
    next();
};
exports.validateJson = validateJson;
