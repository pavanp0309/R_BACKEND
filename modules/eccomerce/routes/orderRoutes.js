import express from "express"
import {createOrder,updateOrder,getOrderById,getOrders,deleteOrder} from "../controllers/orderController.js"


const router=express.Router()


router.post("/",createOrder);
router.get("/",getOrders);
router.get("/:id",getOrderById);
router.put("/:id",updateOrder);
router.delete("/:id",deleteOrder);

export default router 
