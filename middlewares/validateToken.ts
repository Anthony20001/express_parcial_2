import {NextFunction, Request, Response} from "express";
import {msg500, requestReturn} from "../utils/request";
import jwt from "jsonwebtoken"

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = ""
        if(req.headers["authorization"]) token = req.headers["authorization"].split(" ")[1]

        // @ts-ignore
        jwt.verify(token, process.env.LOCAL_KEY, (error, data) => {
            if(error) return res.status(401).json(requestReturn('ko', '', {status:401, 'message': 'El token proporcionado no es válido'}))
            next()
        })
    }catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}