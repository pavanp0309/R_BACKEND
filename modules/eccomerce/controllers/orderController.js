import Order from "../models/Order.js";


// function to create order 
export const createOrder=async(req,res)=>{
    try {
        let order=new Order(req.body)
        let saveOrder= await order.save()

       // creating the statuscode for successful product creation
        res.status(201).json(saveOrder)

    } catch (error) {
        console.log("error in creating the order",error.message)

    //   creating the response status for failure of the Product
     res.status(500).json({message:"error in creating the order"})
    }
}


// function to getOrders
export const getOrders=async(req,res)=>{
    try {
         // find method is used for reteriving single and many documnets in mongodb 
         const orders= await Order.find()
          // reading the data in paresed format with status code 
        res.status(200).json(orders);
    } catch (error) {
        console.log("error in getting the order",error.message)

        //   creating the response status for failure of the order
         res.status(500).json({message:"error in getting the order"})
    }
}


// function to getOrderByID
export const getOrderById=async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("Products.productId");
        // if product is not found
        if(!order) return res.status(404).json({message:"cant find a order"})
        // reading the data in paresed format with status code 
        res.status(200).json(order);

    } catch (error) {
        console.log("error in getting the order",error.message)

        //   creating the response status for failure of the order
         res.status(500).json({message:"error in getting the order"})
    }
}

// function to UpdateOrderById 
export const updateOrder=async(req,res)=>{
    try {
         const updatedOrder=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate("Products.productId");
        if(!updatedOrder) return  res.status(404).json({message:"error find the product"})
        res.status(200).json(updatedOrder)
    } catch (error) {
        //   creating the response status for failure of the order
        res.status(500).json({message:"error in updating the order"})
    }
}


// function To delete order
export const deleteOrder=async(req,res)=>{
    try {
        let deletedOrder= await Order.findByIdAndDelete(req.params.id);
        if(!deletedOrder) return  res.status(404).json({message:"error find the order"});
        res.status(200).json({message:"successfully deleted order"})
    } catch (error) {
         //   creating the response status for failure of the order
         res.status(500).json({message:"error in deleting the order"})
    }
}