import {Request, Response} from "express";
import {genSaltSync, hashSync} from "bcryptjs"
import {requestReturn, msg500} from "../utils/request"
import {UserModel} from "../models/user"
import jwt from "jsonwebtoken"


const loginUser = (req: Request, res: Response) => {
    try {
        const {user, password} = req.body
        // @ts-ignore
        jwt.sign({user, password}, process.env.LOCAL_KEY, {expiresIn: "259200s"}, (error, token) => {
            if (error) return res.status(500).json(requestReturn('ko', '', {
                status: 500,
                'message': 'No se pudo generar el token de autenticación. Inténtalo nuevamente más tarde.'
            }))
            if (token) return res.status(200)
                .setHeader('X-Auth-Token', token)
                .json(requestReturn('ok', 'Sesión iniciada'))
        })
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await UserModel.findById(id)
        if (!user) return res.status(404).json(requestReturn('ko', '', {
            status: 404,
            'message': 'No se encontró el usuario solicitado.'
        }))
        return res.status(200).json(requestReturn('ok', user))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const {user, password, name} = req.body
        const salt: String = genSaltSync(10)
        const hash: String = hashSync(password.toString(), salt.toString())
        const createdAt: Date = new Date()
        const updatedAt: Date = new Date()

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

        if (user && user.toString().length < 4) return res.status(400).json(error('El campo nombre debe contener al menos 4 caracteres.'))
        if (password && password.toString().length < 6) return res.status(400).json(error('El campo contraseña debe contener al menos 6 caracteres.'))

        let hash
        if (password) {
            const salt: String = genSaltSync(10)
            hash = hashSync(password.toString(), salt.toString())
        }

        const updatedAt = new Date()

        const originalUserDocument = await UserModel.findById(id)

        const newUserDocument = await UserModel.findByIdAndUpdate(id, {
            ...{'user': user ? user : originalUserDocument.user},
            ...{'name': name ? name : originalUserDocument.name},
            ...{'password': hash ?? originalUserDocument.password},
            updatedAt
        }, {new: true})

        if (!newUserDocument) return res.status(404).json(requestReturn('ko', '', {
            status: 404,
            'message': 'No se encontró el usuario solicitado.'
        }))

        return res.status(200).json(requestReturn('ok', newUserDocument))

    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await UserModel.findByIdAndDelete(id)
        if (!user) return res.status(404).json(requestReturn('ko', '', {
            status: 404,
            'message': 'No se encontró el usuario solicitado.'
        }))
        return res.status(200).json(requestReturn('ok', user))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const error = (message: String) => {
    return requestReturn('ko', '', {'status': 400, 'message': message})
}

export {loginUser, getUser, createUser, updateUser, deleteUser}