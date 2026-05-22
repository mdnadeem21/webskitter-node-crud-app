const express = require('express')
const ProductController = require('../controller/productApi/ProductController')

const router=express.Router();


router.post('/create/product',ProductController.createProduct)
router.get('/product',ProductController.getProduct)

router.get('/product/:id',ProductController.getsingleProduct)
router.put('/product/update/:id',ProductController.updateProduct)
router.delete('/product/delete/:id',ProductController.deleteProduct)

// created by self
// router.delete('/delete-product',ProductController.deleteProduct)
// router.put('/update-product',ProductController.updateProduct)



module.exports=router;