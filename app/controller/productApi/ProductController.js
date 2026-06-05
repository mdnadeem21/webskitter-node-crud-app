const Product=require('../../models/product');
const StatusCode = require('../../utils/statusCode')
const fs = require('fs');



class ProductController{
    async createProduct(req,res){
      // console.log(req.file)
      try{
        const {productName,productPrice,desc}=req.body;

        const product= new Product({
            productName,
            productPrice,
            desc
        })
        if(req.file){
          product.productImage=req.file.path
        }
        const data=await product.save();
        return res.status(201).json({
            status:true,
            message:"Product created successfully",
            data:data
        })
     

      }catch(err){
        return res.status(500).json({
            status:false,
            message:"something went wrong",
            error:err.message
        })
      }
    }

    async getProduct(req,res){
        try{

            const products=await Product.find();
            return res.status(200).json({
                status:true,
                total:products.length,
                message:"Product fetched successfully",
                data:products
            })

        }catch(error){
            return res.status(500).json({
                status:false,
                message:"something went wrong in get product",
                error:error.message
            })
        }

    }


    // created by self
    // async updateProduct(req,res){
    //     try {
    //         const {oldProductName,newProductName} = req.body;
    //         console.log("Request Body : ",req.body)
            

    //         // Find the product by oldProductName and update its name to newProductName
    //          const updatedProduct = await Product.findOneAndUpdate(
    //         { productName: oldProductName }, // Filter: Find by old name
    //         { productName: newProductName },  // Update: Set new name
    //         { new: true } // Return the updated document
    //     );

    //     if (!updatedProduct) {
    //         return res.status(404).json({
    //             status: false,
    //             message: "Product not found",
    //         });
    //     }
    //     const products = await Product.find()
    //         return res
    //         .status(200)
    //         .json({
    //             status:true,
    //             total:products.length,
    //             message:"Product updated successfully",
    //             data:products
    //         })

    //     } catch (error) {
    //         // console.log(`Error in product update : ${error}`);
    //         return res.status(500).json({
    //             status:false,
    //             message:"something went wrong in product update",
    //             error:error.message
    //         })
            
    //     }
    // }
    // async deleteProduct(req,res){
    //     try {
    //         const {productName} = req.body;
    //         const productToDeleted = await Product.findOneAndDelete({productName })
    //         console.log("Product to be delete : ",productName)

    //         if(!productToDeleted){
    //             return res.status(404).json({
    //                 status: false,
    //                 message: "Product not found",
    //             });
    //         }

    //         const products = await Product.find()
    //         return res
    //         .status(200)
    //         .json({
    //             status:true,
    //             total:products.length,
    //             message:"Product deleted successfully",
    //             data:products
    //         })
            
    //     } catch (error) {
    //         // console.log(`Error in product deletion : ${error}`);
    //         return res.status(500).json({
    //             status:false,
    //             message:"something went wrong in product deletion",
    //             error:error.message
    //         })
    //     }
    // }


    async getsingleProduct(req, res) {
        try {
          const id = req.params.id;
          const edit = await Product.findById(id);
          return res.status(200).json({
            status: true,
            message: "get single product",
            data: edit,
          });
        } catch (error) {
          return res.status(500).json({
            status: false,
            message: "something went wrong",
            error: err,
          });
        }
      }

      async updateProduct(req, res) {
        try {
          const id = req.params.id;
          //const {productName,productPrice,desc}=req.body
          const product = await Product.findById(id)
          if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
          }

          if(req.file){
            product.productImage = req.file.path
          }
          await Product.findByIdAndUpdate(id, product, { new: true });
          return res.status(200).json({
            status: true,
            message: "Product updated successfully",
          });
        } catch (error) {
          return res.status(500).json({
            status: false,
            message: "something went wrong",
            error: error.message,
          });
        }
      }

      async deleteProduct(req, res) {
        try {
            const id = req.params.id;
    
            // 1. Fetch the product details
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ 
                    status: false, 
                    message: "Product not found" 
                });
            }
    
            
            if (product.productImage && fs.existsSync(product.productImage)) {
                try {
                    await fs.promises.unlink(product.productImage);
                } catch (fileError) {
                    console.error("File deletion failed:", fileError);
                }
            }
    
            // 3. Delete the document from MongoDB
            await Product.findByIdAndDelete(id);
    
            return res.status(200).json({
                status: true,
                message: "Product deleted successfully",
            });
    
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
                error: error.message, 
            });
        }
    }


}

module.exports=new ProductController();