import {NextFunction, Request, Response} from "express";
import {msg500, requestReturn} from "../utils/request";

export const validatePrompt = (req: Request, res:Response, next: NextFunction) => {
    try {
        const {prompt} = req.body
        if(prompt.toString().length < 10) return res.status(500).json(requestReturn('ko', '', {status:400, 'message': 'La pregunta no cumple con la cantidad de caracterés.'}))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}