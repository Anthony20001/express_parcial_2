import express, {Express, Request, Response, json} from "express";
import dotenv from 'dotenv'
import {router as routerUsers} from "./routes/users"
import {router as routerChatGpt} from "./routes/chatgpt"
import {connect as mongodbConnect} from "./databases/mongodb"
import {regAccess} from "./middlewares/regAccess";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const apiV:String = '/api/v1'

app.use(json())
app.use(regAccess)

mongodbConnect()

app.use(apiV+"/user", routerUsers)
app.use(apiV+"/chatgpt", routerChatGpt)

app.get(apiV+'/', (req:Request, res:Response) => res.send('Express + TypeScript'))

app.listen(port, () => console.log(`⚡️ [server]: Server is running at http://localhost:${port}`));