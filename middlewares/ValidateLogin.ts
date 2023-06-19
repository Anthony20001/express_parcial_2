import {NextFunction, Request, Response} from "express";
import {msg500, requestReturn} from "../utils/request";
import {UserModel} from "../models/user";
import {compareSync} from "bcryptjs";

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user, password} = req.body
        if(!user) return res.status(400).json(requestReturn('ko', '', {status: 400, 'message': 'El campo nombre es obligatorio.'}))
        if(!password) return res.status(400).json(requestReturn('ko', '', {status: 400, 'message': 'El campo contraseña es obligatorio.'}))

        if(user && user.toString().length < 4) return res.status(400).json(requestReturn('ok', '', {status: 400, 'message': 'El campo nombre debe contener al menos 4 caracteres.'}));

        const userDocument = await UserModel.findOne({'user': user})

        if(!userDocument) return res.status(404).json(requestReturn('ko', '', {status: 404, 'message': 'No se encontró el usuario solicitado.'}))

        if(!compareSync(password, userDocument.password)) return res.status(401).json(requestReturn('ko', '', {status:401, 'message': 'Contraseña incorrecta. Intenta de nuevo.'}))

        next()
    }catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}