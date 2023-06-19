import {Request, Response} from "express";
import {genSaltSync, hashSync} from "bcryptjs"
import {requestReturn, msg500} from "../utils/request"
import {UserModel} from "../models/user"


const loginUser = (req: Request, res: Response) => {
    const user = new UserModel({})
}

const getUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await UserModel.findById(id)
        if (!user) return res.status(404).json(requestReturn('ko', '', {status: 404, 'message': 'No se encontró el usuario solicitado.'}))
        return res.status(200).json(requestReturn('ok', user))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const {user, password, name} = req.body
        const salt: String = genSaltSync(10)
        const hash:String = hashSync(password.toString(), salt.toString())
        const createdAt: Date = new Date()
        const updatedAt:Date = new Date()

        const userModel = new UserModel({user, salt, 'password': hash, name, createdAt, updatedAt})
        await userModel.save()
        return res.status(200).json(requestReturn('ok', userModel))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {user, password, name} = req.body
        const salt: String = genSaltSync(10)
        const hash = hashSync(password.toString(), salt.toString())
        const updatedAt = new Date()

        const userModel = await UserModel.findByIdAndUpdate(id, {name, 'password': hash, user, updatedAt}, {new:true})
        if (!userModel) return res.status(404).json(requestReturn('ko', '', {status: 404, 'message': 'No se encontró el usuario solicitado.'}))
        return res.status(200).json(requestReturn('ok', userModel))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await UserModel.findByIdAndDelete(id)
        if (!user) return res.status(404).json(requestReturn('ko', '', {status: 404, 'message': 'No se encontró el usuario solicitado.'}))
        return res.status(200).json(requestReturn('ok', user))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}


export {loginUser, getUser, createUser, updateUser, deleteUser}