import {NextFunction, Request, Response} from "express";
import {appendFileSync} from "fs";

export const regAccess = (req: Request, res: Response, next: NextFunction) => {
    appendFileSync('access.log',  `${new Date().toString()} - ${req.rawHeaders}\n`)
    next()
}