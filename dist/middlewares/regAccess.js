"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regAccess = void 0;
const fs_1 = require("fs");
const regAccess = (req, res, next) => {
    (0, fs_1.appendFileSync)('access.log', `${new Date().toString()} - ${req.rawHeaders}\n`);
    next();
};
exports.regAccess = regAccess;
