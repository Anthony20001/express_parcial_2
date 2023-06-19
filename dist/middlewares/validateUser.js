"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const request_1 = require("../utils/request");
const validateUser = (req, res, next) => {
    const { user, password, name } = req.body;
    if (req.body)
        if (!user)
            return res.status(400).json(error('El campo usuario es requerido.'));
    if (!password)
        return res.status(400).json(error('El campo contraseña es requerido.'));
    if (!name)
        return res.status(400).json(error('El campo nombre es requerido.'));
    if (user && user.length < 4)
        return res.status(400).json(error('El campo nombre debe contener al menos 4 caracteres.'));
    if (password && password.toString().length < 6)
        return res.status(400).json(error('El campo contraseña debe contener al menos 6 caracteres.'));
    next();
};
exports.validateUser = validateUser;
const error = (message) => {
    return (0, request_1.requestReturn)('ko', '', { 'status': 400, 'message': message });
};
