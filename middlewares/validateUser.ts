import {NextFunction, Request, Response} from "express";
import {requestReturn} from "../utils/request";
import {UserModel} from "../models/user";

export const validateUser = async (req:Request, res: Response, next:NextFunction) => {
    console.log(req.body)
    const {user, password, name} = req.body

    if(!user) return res.status(400).json(error('El campo usuario es requerido.'))
    if(!password) return res.status(400).json(error('El campo contraseña es requerido.'))
    if(!name) return res.status(400).json(error('El campo nombre es requerido.'))

    if(user && user.length < 4) return res.status(400).json(error('El campo nombre debe contener al menos 4 caracteres.'))
    if(await UserModel.findOne({'user': user})) return res.status(409).json(error('El nombre de usuario ya existente. Por favor, elige otro.'))
    if(password && password.toString().length < 6) return res.status(400).json(error('El campo contraseña debe contener al menos 6 caracteres.'))

    next()
}

const error = (message: String) => {
    return requestReturn('ko', '', {'status':400, 'message': message})
}