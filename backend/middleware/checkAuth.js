import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

async function checkAuth(req,res,next){
    try {
        const authHeader=req.headers.authorization
        const token=authHeader.split(" ")[1]
        const payload=jwt.verify(token,process.env.SECRET)
        const user= await User.findById(payload.uid)
        if(!user){
            return next({status:401, message:"user not found"})
        }
        req.user=user
        next()
    } catch (error) {
        next({
            status:401,
            message:error
        })
    }

}
export default checkAuth
