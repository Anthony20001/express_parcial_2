import express, {Express, Request, Response, json} from "express";
import dotenv from 'dotenv'
import {router as routeUsers} from "./routes/users"
import {connect as mongodbConnect} from "./databases/mongodb"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const apiV:String = '/api/v1'

app.use(json())

mongodbConnect()

app.use(apiV+"/user", routeUsers)

app.get(apiV+'/', (req:Request, res:Response) => res.send('Express + TypeScript'))

app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));