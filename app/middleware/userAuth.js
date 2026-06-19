const User = require('../../app/models/userModels')
const jwt = require('jsonwebtoken')

const userAuth = async (req,res,next) => {
    try {
        const token = req.headers['authorization']
        if(!token){
           return res.status(401).json({
            status:false,
            message:"Access denied. No token provided"
           })
        }
       const bearertoken=token.split(' ')[1];

       if(!bearertoken){
            return res.status(401).json({
                status:false,
                message:"Access denied. Invalid token"
            });
        }
        try {
            const decodedToken = jwt.verify(bearertoken,process.env.JWT_SECRET_CODE)
            req.user = decodedToken;
            // const user = await User.findById(decodedToken?._id).select("-password")
        //     if (!user) {
        //         return res.status(401).json({
        //             status:false,
        //             message:"Unauthorised User"
        //         });
        //    }
        } catch (error) {
            return res.status(400).json({
                status:false,
                message:"Invalid token"
            });
        }
       
       next();
    } catch (error) {
        
    }
}

module.exports = userAuth

