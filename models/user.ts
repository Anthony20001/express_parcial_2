import {Schema, model, Model} from "mongoose"

const UserSchema:Schema = new Schema({
    user: String,
    salt: String,
    password: String,
    name: String,
    createdAt: Date,
    updatedAt: Date,
});

const UserModel:Model<any> = model("user", UserSchema)
export {UserModel}