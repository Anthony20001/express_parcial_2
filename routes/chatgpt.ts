import {Router} from "express";
import {validateToken} from "../middlewares/validateToken";
import {getChat, getChats, saveChat} from "../controllers/chatgpt";
import {validatePrompt,} from "../middlewares/validatePrompt";

const router:Router = Router()

router.post("/:id", validateToken, validatePrompt, saveChat)
router.get("/:id", validateToken, getChat)
router.get("/user/:id", validateToken, getChats)

export {router}