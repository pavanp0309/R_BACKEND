import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from  './modules/eccomerce/routes/productRoutes.js'
import orderRoutes from  "./modules/eccomerce/routes/orderRoutes.js"
import userRoutes from  "./modules/eccomerce/routes/userRoutes.js"
import analyticsRoutes from  "./modules/eccomerce/routes/analyticsRoute.js"
import cors from "cors"

// configurig the dotenv
dotenv.config({
    path:"./.env"
})

// setting the default portNo for development
const port = process.env.PORT || 3000

// creating the server instance 
let app=express() 
app.use(express.json())
app.use(cors.apply({
  origin:" http://localhost:5173/"
}))


// connecting the Database 
connectDB()

// creating the ApiRoutes for Product 
app.use("/api/products",productRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/users",userRoutes)
app.use("/api/analytics",analyticsRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
    
app.listen(port, () => {
  console.log(`Example app on port ${port}`)
})