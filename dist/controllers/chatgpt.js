"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = exports.getChat = exports.saveChat = void 0;
const openai_1 = require("openai");
const chatgpt_1 = require("../models/chatgpt");
const request_1 = require("../utils/request");
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat_id = req.params.id;
        const chatDocument = yield chatgpt_1.ChatgptModel.findById(chat_id);
        if (!chatDocument)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', { status: 404, 'message': 'No se encontró registro del usuario solicitado' }));
        return res.status(200).json((0, request_1.requestReturn)('ok', chatDocument));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.getChat = getChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const chatDocument = yield chatgpt_1.ChatgptModel.findOne({ 'id_user': user_id });
        if (!chatDocument)
            return res.status(404).json((0, request_1.requestReturn)('ko', '', { status: 404, 'message': 'No se encontró registro del usuario solicitado' }));
        return res.status(200).json((0, request_1.requestReturn)('ok', chatDocument));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.getChats = getChats;
const saveChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_user = req.params.id;
        const { prompt } = req.body;
        const configuration = new openai_1.Configuration({ apiKey: process.env.OPENAI_API_KEY });
        const openai = new openai_1.OpenAIApi(configuration);
        const completion = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        // @ts-ignore
        const response = completion.data.choices[0].message.content;
        const createAt = new Date();
        const chatgptDocument = yield new chatgpt_1.ChatgptModel({ prompt, response, id_user, createAt });
        chatgptDocument.save();
        if (!chatgptDocument)
            return res.status(500).json((0, request_1.requestReturn)('ko', '', { status: 500, 'message': 'Lamentablemente, no ha sido posible guardar el registro.' }));
        //return res.status(200).json(requestReturn('ok', 'El registro ha sido guardado exitosamente'))
        return res.status(200).json((0, request_1.requestReturn)('ok', response));
    }
    catch (e) {
        return res.status(500).json((0, request_1.requestReturn)("ko", '', { status: 500, "message": request_1.msg500 }));
    }
});
exports.saveChat = saveChat;
