import {Request, Response} from "express";
import {Configuration, OpenAIApi} from "openai"
import {ChatgptModel} from "../models/chatgpt"
import {msg500, requestReturn} from "../utils/request";

const getChat = async (req: Request, res: Response) => {
    try {
        const chat_id = req.params.id

        const chatDocument = await ChatgptModel.findById(chat_id)
        if(!chatDocument) return res.status(404).json(requestReturn('ko', '', {status:404, 'message': 'No se encontró registro del usuario solicitado'}))
        return res.status(200).json(requestReturn('ok', chatDocument))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const getChats = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id

        const chatDocument = await ChatgptModel.findOne({'id_user': user_id})
        if(!chatDocument) return res.status(404).json(requestReturn('ko', '', {status:404, 'message': 'No se encontró registro del usuario solicitado'}))
        return res.status(200).json(requestReturn('ok', chatDocument))
    } catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

const saveChat = async (req: Request, res: Response) => {
    try{
        const id_user = req.params.id
        const {prompt} = req.body

        const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
        });

        // @ts-ignore
        const response = completion.data.choices[0].message.content
        const createAt = new Date()

        const chatgptDocument = await new ChatgptModel({prompt, response, id_user, createAt})
        chatgptDocument.save()
        if(!chatgptDocument) return res.status(500).json(requestReturn('ko', '', {status:500, 'message': 'Lamentablemente, no ha sido posible guardar el registro.'}))
        //return res.status(200).json(requestReturn('ok', 'El registro ha sido guardado exitosamente'))
        return res.status(200).json(requestReturn('ok', response))
    }catch (e) {
        return res.status(500).json(requestReturn("ko", '', {status: 500, "message": msg500}))
    }
}

export {saveChat, getChat, getChats}