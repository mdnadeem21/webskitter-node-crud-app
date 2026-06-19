const User = require('../../models/userModels');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


class UserController{
    async createUser(req,res){
        try {
            const {username,fullname,email,password,role} = req.body;
            if(!(username && email && fullname && password)){
                return res.status(400).json({
                    status:false,
                    message:"Please enter all the details"
                })
            }

            const existedUser = await User.findOne({email}).catch(err => {
                console.error("Error checking for existing user:", err);
                throw err;
            });
            if(existedUser){
                return res.status(409)
                .json({
                    status:false,
                    message:"User already registered with the current email, Please use another email.",
                
                })
            }

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password,salt);

            const user = new User({
                username,
                fullname,
                email,
                password:hashedPassword,
                role
            })

            const users=await user.save();
        return res.status(201).json({
            status:true,
            message:"User created or registered successfully",
            data:users
        })
        } catch (error) {
            return res.status(500)
                    .json({
                        status:false,
                        message:"something went wrong on creating user",
                        error:error.message
                    })
        }
    }

    
    async getUsers(req,res){
        try {
            const users = await User.find();

            return res.status(200).json({
                status:true,
                total:users.length,
                message:"Users fetched successfully",
                data:users
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:"something went wrong in get users",
                error:error.message
            })
        }
    }
    
    async updateUser(req,res){
        try {
            // const {oldUserName,newUserName} = req.body;
            // const updatedUser = await User.findOneAndUpdate(
            //     {username : oldUserName},
            //     {username:newUserName},
            //     {new:true}
            // )
            const id = req.params.id
            const userTobeUpdate = await User.findById(id)

            if(!userTobeUpdate){
                return res.status(404)
                          .json({
                            status:false,
                            message:"User not found"
                          })
            }
            const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true});
            return res
                    .status(200)
                    .json({
                        status: true,
                        message:"User updated successfully",
                        data:updatedUser
                    })
        } catch (error) {
            return res
                    .status(500)
                    .json({
                        status: false,
                        message:"something went wrong in user updation",
                        error:error.message
                    })
        }
    }
    
    async deleteUser(req,res){
        try {
            const id = req.params.id;
            const userToDeleted = await User.findById(id)

            if(!userToDeleted){
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }

            const deletedUser = await User.findByIdAndDelete(id)
            return res
            .status(200)
            .json({
                status:true,
                message:"User deleted successfully",
                data:deletedUser
            })
            
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:"something went wrong in user deletion",
                error:error.message
            })
        }
    }

    async loginUser(req,res){
        try {
                const {email,password} = req.body
            if(!(email && password)){
                throw new Error('Please enter email or password')
            }

            const user = await User.findOne({email});

            if(!user){
                throw new Error("User not found")
            }
            const loggedInUser = await User.findOne({email})
            if(!loggedInUser){
                return res.status(400).json({
                    status:false,
                    message:"User does not exist"
                })
            }
            // console.log("loggedIn User : ",loggedInUser)

            const isMatch = await bcryptjs.compare(password,loggedInUser.password)
            if(!isMatch){
                return res.status(400).json({
                    status:false,
                    message:"Invalid credentials"
                });
            }

            const token = await jwt.sign({
                id:loggedInUser._id,
                fullname:loggedInUser.fullname,
                username:loggedInUser.username,
                email:loggedInUser.email,
                phone:loggedInUser.phone,
                role:loggedInUser.role
            },process.env.JWT_SECRET_CODE,
            {
               expiresIn:"1h" 
            })
            return res.status(200)
                    .json({
                        status:true,
                        message:"User loggedIn Successfully",
                        user:loggedInUser,
                        token:token
                    })
        } catch (error) {
            return res.status(500)
                    .json({
                        status:false,
                        message:"Something went wrong in login",
                        error:error.message
                    })
        }

    }

    async userDashboard(req,res){
        return res.status(200)
                    .json({
                        status:true,
                        message:"Dashboard Access granted",
                        user:req.user
                    })
    }
}

module.exports = new UserController();