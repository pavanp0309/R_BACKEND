import Order from "../models/Order.js";
import Product from "../models/Product.js"
import User from "../models/User.js";


// to Get the Total matrics

export const getMetrics=async(req,res)=>{
    try {
        // calculate the Total orders 
   const totalOrders=await Order.countDocuments()

        //  calculate to revenue based on orders
   const orders=await Order.find()
   const  totalRevenue=orders.reduce((acu,total)=>acu+total.totalAmount ,0)
        // calculate total products
    const totalProducts=await Product.countDocuments()
// calculate total customers
   const totalUsers=await User.countDocuments()
 
   res.status(200).json({
    totalOrders,
    totalRevenue,
    totalUsers,
    totalProducts
   })


    } catch (error) {
        //   creating the response status for failure of the order
        res.status(500).json({message:"error in getting the data"})
    }
}