"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrompt = void 0;
const request_1 = require("../utils/request");
const validatePrompt = (req, res, next) => {
    try {
        const { prompt } = req.body;
        if (prompt.toString().length < 10)
            return res.status(500).json((0, request_1.requestReturn)('ko', '', { status: 400, 'message': 'La pregunta no cumple con la cantidad de caracterés.' }));
        next();
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
};
exports.validatePrompt = validatePrompt;
