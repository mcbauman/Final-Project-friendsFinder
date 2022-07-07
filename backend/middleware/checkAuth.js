import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

async function checkAuth(req,res,next){
//    console.log("HEADER from CHECKAUTH l5",req.headers);
//    console.log("URL from CHECKAUTH l6",req.url);
    try {
        const authHeader=req.headers.authorization
        console.log(authHeader);
        const token=authHeader.split(" ")[1]
        const payload=jwt.verify(token,process.env.SECRET)
        const user= await User.findById(payload.uid)
        // console.log("USER IN CHECKAUTH",user);
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
