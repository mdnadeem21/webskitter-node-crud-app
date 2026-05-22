const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema=new Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        default: 'image'
    },
    desc:{
        type: String,
        required: true
    }

})

 const ProductModel= mongoose.model('product',ProductSchema);

 module.exports=ProductModel;

