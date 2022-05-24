import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from "./models/UserModel.js"
import userValidator from "./validator/userValidator.js"
import {validationResult} from "express-validator"
import {hash, compare } from "./crypto.js"
import jwt from "jsonwebtoken"
import checkAuth from "./checkAuth.js"
import requestValidator from "./validator/requestValidator.js"

export function connect() {
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
    const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

    mongoose.connection.on('connecting',    () => console.log("[DB] connecting"))
    mongoose.connection.on('connected',     () => console.log("[DB] connected"))
    mongoose.connection.on('disconnecting', () => console.log("[DB] disconnecting"))
    mongoose.connection.on('disconnected',  () => console.log("[DB] disconnected"))
    mongoose.connection.on('reconnected',   () => console.log("[DB] reconnected"))
    mongoose.connection.on('error',         er => console.log("[DB] error", er))

    mongoose.connect(connectionString)
}

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
connect()

app.get("/",(req,res)=>{
    res.send("Answer to /")
})

// LOGIN User
app.post("/loginUser",async (req,res,next)=>{
    try {
        // find user
        const user=await User.findOne({email:req.body.email})
        // compare password
        const loginSuccess = await compare(req.body.password, user.password) 
        if(!loginSuccess){throw {error:"Password missmatch"}}
        // create token
        const token=jwt.sign({uid:user._id},process.env.SECRET)
        // send user the token
        res.send({token})
    } catch (error) {
        next({status:400,message:error})
    }
})

//CreateUser
app.post("/createUser",requestValidator(userValidator),async(req,res,next)=>{
    try {
        req.body.password=await hash(req.body.password)
        const user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        next({status:400, message:err.message})
    }
})

//Get a List of Users
app.get("/usersList",async(req,res,next)=>{
    try {
        let users= await User.find()
        res.send(users)
    } catch (err) {
        next({status:400, message:err.message})
    }
})

//Edit Profile
// find profile
app.get("/updateProfile",checkAuth,async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id)
        res.send(user)
    } catch (error) {
        next({status:400, message:err.message})  
    }
})


app.put("/updateProfile",checkAuth,requestValidator(userValidator),async(req,res,next)=>{
    console.log(validationResult(req));
    try {
        const user=await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
        res.send(user)
    } catch (error) {
        next({status:400, message:error.message}) 
    }
})

//Global Error Handler
app.use("/",(error, req, res, next)=>{
    console.log("GlobalError",error);
    res.status(error.status || 500).send({
        error: error.message || error.errors ||"Something went wrong"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server listening to"+process.env.PORT);
})