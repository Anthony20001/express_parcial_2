import {Schema, model} from "mongoose"

const ChatgptSchema:Schema = new Schema({
    prompt: String,
    response: String,
    id_user: String,
    date_create: Date
});

const chatgptModel = model("chatgpt", ChatgptSchema)
export {chatgptModel}