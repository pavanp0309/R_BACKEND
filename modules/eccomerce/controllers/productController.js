import Product from "../models/Product.js"

export const createProduct=async(req,res)=>{

   try {
    const {name,description,price,category,stock}=req.body

    // creating product (collection in the database) through the userInput
    const newProduct=new Product({
        name,
        description,
        price,
        category,
        stock ,
        image:req.file?{data:req.file.buffer,contentType:req.file.mimetype}:undefined
    })

    // saving the data into databases
    const savedProduct=await newProduct.save()

    // creating the statuscode for successful product creation
    res.status(201).json(savedProduct)

   } catch (error) {
      console.log("error in creating the message",error.message)

    //   creating the response status for failure of the Product
    res.status(500).json({message:"error in creating the Product"})
   }

}


// Reterving all the Products 
export const getProducts=async(req,res)=>{
    try {
        // find method is used for reteriving single and many documnets in mongodb 
        const products= await Product.find();

        // reterivg the Images stored in the Buffer format to normal format 
        const productWithimages=products.map(product=>({
            ...product._doc, // these will reterive all product information 
            image:product.image && product.image.data ?
             `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`:null

        }));

        // reading the data in paresed format with status code 
        res.status(200).json(productWithimages)
    } catch (error) {
        console.log("error in reteriving the message",error.message)

        //   creating the response status for failure of the Product
        res.status(404).json({message:"error in reterivg the Product"})
    }
}


// getting the single Products 
export const getProductById=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        // if product is not found
        if(!product) return res.status(404).json({message:"cant find a product"})
        
        // if product is found 
        res.status(200).json(
            {
                ...product._doc, // these will reterive all product information 
                image:product.image && product.image.data ?
                 `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`:null
     
            }
        )

    } catch (error) {
        console.log("error in creating the message",error.message)
        //   creating the response status for failure of the Product
        res.status(500).json({message:"error in creating the Product"})
    }
}

// upadate the Product  
export const  updateProduct=async (req,res)=>{
    try {
        let updateData={...req.body}
        
        // updating the Image
        if(req.file){
            updateData.image={
                data:req.file.Buffer,
                contentType:req.file.mimetype
            };
        }

        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!updatedProduct) return  res.status(404).json({message:"error find the product"})
        res.status(200).json({message:"product created successfully"})

    } catch (error) {
        console.log("error in  updating the product",error.message)
        //   creating the response status for failure of the Product
        res.status(500).json({message:"error in updating the Product"})
    }
}


// deleting the Product
export const deleteProduct=async (req,res)=>{
    try {
         let deletedProduct= await Product.findByIdAndDelete(req.params.id);
         if(!deletedProduct) return  res.status(404).json({message:"error find the product"});
         res.status(200).json({message:"successfully deleted product"})
    } catch (error) {
        console.log("error in  updating the product",error.message)
        //   creating the response status for failure of the Product
        res.status(500).json({message:"error in updating the Product"})
    }
}