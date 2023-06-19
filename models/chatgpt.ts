import {Schema, model} from "mongoose"

const ChatgptSchema:Schema = new Schema({
    prompt: String,
    response: String,
    id_user: String,
    createAt: Date
});

export const ChatgptModel = model("chatgpt", ChatgptSchema)