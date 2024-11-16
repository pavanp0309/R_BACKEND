import mongoose from "mongoose";


const ordersSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
        
    },
    status:{
        type:String,
        enum:["Pending","Shiped","delivered","Cancelled"],
        default:"Pending"
    }

},{timestamps:true})

const Order=mongoose.model("Orders",ordersSchema)
export default Order