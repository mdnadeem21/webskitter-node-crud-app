const User = require('../../app/models/userModels')
const jwt = require('jsonwebtoken')

const userAuth = async (req,res,next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
       const decodedToken = jwt.verify(token,process.env.JWT_SECRET_CODE)
       const user = await User.findById(decodedToken?._id).select("-password")
       if (!user) {
            throw new Error("Unauthorise user")
       }
       req.user = user;
       next();
    } catch (error) {
        
    }
}

module.exports = userAuth

