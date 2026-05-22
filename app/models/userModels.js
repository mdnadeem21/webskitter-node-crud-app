const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username :{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{
    timestamps:true
})

const UserModel = mongoose.model('user',UserSchema);
module.exports = UserModel;