import express from "express"
import {createProduct,getProducts,getProductById,updateProduct,deleteProduct} from "../controllers/productController.js"
import upload from "../../../middleware/uploadImage.js"


const router=express.Router()


// creating the endpoints 

router.post("/",upload.single("image"),createProduct);
router.get("/",getProducts);
router.get("/:id",getProductById);
router.put("/:id",upload.single("image"),updateProduct);
router.delete("/:id",deleteProduct);

export default router 
