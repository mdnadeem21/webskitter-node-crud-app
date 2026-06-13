const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        city:{
            type:String,
        },
        zipcode:{
            type:Number
        }
    },
    phone:{
        type:Number,
    },
    website:{
        type:String,
    },
    company:{
        name:{
            type:String
        },
        catchPhrase:{
            type:String
        },
        bs:{
            type:String
        }
        
    }
},{
    timestamps:true
})

const EmployeeModel = mongoose.model('manage-employee',EmployeeSchema)
module.exports = EmployeeModel