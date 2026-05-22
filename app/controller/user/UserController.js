const User = require('../../models/userModels');


class UserController{
    async createUser(req,res){
        try {
            const {username,fullname,email,password,role} = req.body;

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
            const user = new User({
                username,
                fullname,
                email,
                password,
                role
            })

            const users=await user.save();
            console.log(`New User : ${user}`)
        return res.status(201).json({
            status:true,
            message:"User created successfully",
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
            const {oldUserName,newUserName} = req.body;
            const updatedUser = await User.findOneAndUpdate(
                {username : oldUserName},
                {username:newUserName},
                {new:true}
            )

            if(!updatedUser){
                return res.status(404)
                          .json({
                            status:false,
                            message:"User not found"
                          })
            }
            const users = await User.find();
            return res
                    .status(200)
                    .json({
                        status: true,
                        total:users.length,
                        message:"User updated successfully",
                        data:users
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
            const {username} = req.body;
            const userToDeleted = await User.findOneAndDelete({username })
            console.log("User to be delete : ",username)

            if(!userToDeleted){
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }

            const users = await User.find()
            return res
            .status(200)
            .json({
                status:true,
                total:users.length,
                message:"User deleted successfully",
                data:users
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

            const user = await User.findOne({
                $and:[{email},{password}]
            });

            if(!user){
                throw new Error("User not found")
            }
            const loggedInUser = await User.findOne({email})
            return res.status(200)
                    .json({
                        status:true,
                        message:"User loggedIn Successfully",
                        user:loggedInUser
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
}

module.exports = new UserController();