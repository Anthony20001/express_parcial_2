import {Router} from "express";
import {createUser, deleteUser, getUser, loginUser, updateUser} from "../controllers/users"
import {validateUser} from "../middlewares/validateUser"

const router: Router = Router();

router.post("/", validateUser, createUser)
router.post("/login", loginUser)
router.get("/:id", getUser)
router.put("/:id", validateUser, updateUser)
router.delete("/:id", deleteUser)

export {router}