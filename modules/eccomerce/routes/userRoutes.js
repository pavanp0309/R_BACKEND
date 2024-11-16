import express from "express"
import {createUser,getUsers,getUsersById,updateUsers,deleteUsers} from "../controllers/userContoller.js"


const router=express.Router()


router.post("/",createUser);
router.get("/",getUsers);
router.get("/:id",getUsersById);
router.put("/:id",updateUsers);
router.delete("/:id",deleteUsers);

export default router 
