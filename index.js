require('dotenv').config()


const express=require('express');
const path=require('path')

const connectDB = require('./app/config/db');

// DB configure
connectDB();

const app=express();


//middleware
app.use(express.json());

// Routes

const productRoutes = require('./app/routes/productRoute');
const userRoutes = require('./app/routes/userRoute')
const studentRoute = require('./app/routes/studentRoute')
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the code...</h1>')
})
app.use('/api/product',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/student',studentRoute)

//static folder
app.use(express.static('public'))
app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads'))

const PORT=process.env.PORT ;

app.listen(3000,(error)=>{
    if(error){
        console.log(`Error in PORT Listening : ${error.message}`);
    }else{
        console.log("server is running on port ",`http://localhost:3000`);
    }
})