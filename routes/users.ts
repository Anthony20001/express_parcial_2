import {json, Router} from "express";
import {createUser, deleteUser, getUser, loginUser, updateUser} from "../controllers/users"
import {validateUser} from "../middlewares/validateUser"
import {validateLogin} from "../middlewares/ValidateLogin";
import {validateToken} from "../middlewares/validateToken";
import {regAccess} from "../middlewares/regAccess";

const router: Router = Router();
router.use(json())

router.post("/", validateUser, createUser)
router.post("/login", validateLogin, loginUser)
router.get("/:id", validateToken, getUser)
router.put("/:id", validateToken, updateUser)
router.delete("/:id", validateToken, deleteUser)

export {router}