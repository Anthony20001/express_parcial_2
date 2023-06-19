"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestReturn = exports.msg500 = void 0;
const requestReturn = (result, response, error) => {
    return Object.assign(Object.assign({ "result": result }, (response ? { "response": response } : '')), (error ? { "error": error } : ''));
};
exports.requestReturn = requestReturn;
const msg500 = "Internal Server Error.";
exports.msg500 = msg500;
