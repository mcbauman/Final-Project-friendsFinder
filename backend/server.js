import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from "./models/UserModel.js"
import Message from "./models/MessageModel.js"
import userValidator from "./validator/userValidator.js"
import { validationResult } from "express-validator"
import { hash, compare } from "./crypto.js"
import jwt from "jsonwebtoken"
import checkAuth from "./checkAuth.js"
import requestValidator from "./validator/requestValidator.js"
import { messageRules } from "./validator/messageValidator.js"
import createError from "http-errors"

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

// LOGIN User:
app.post("/user/login",async (req,res,next)=>{
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

// CreateUser:
app.post("/user/create",userValidator, async(req, res, next)=>{
    const errors=validationResult(req)
    console.log(errors);
    if(!errors.isEmpty()){
        return next(errors)
    } try {
        req.body.password=await hash(req.body.password)
        const user = await User.create(req.body)
        const user2=await User.findOne({email:req.body.email})
        // const token=jwt.sign({uid:user2._id},process.env.SECRET)
        res.send({message: "User was created!"})
    } catch (err) {
        next({status:400, message:err.message})
    }
})

//Get a List of Users
app.get("/users/ListAll",async(req,res,next)=>{
    try {
        let users= await User.find()
        res.send(users)
    } catch (err) {
        next({status:400, message:err.message})
    }
})

// Find users matching criteria
app.post("/user/find",async (req,res,next)=>{
    console.log(req.body)
    res.send("Endpoint user/find Answer")
})

// Find Profile
app.get("/user/updateProfile",checkAuth,async(req,res,next)=>{
    // console.log(req);
    try {
        const user=await User.findById(req.user._id)
        res.send(user)
    } catch (error) {
        next({status:400, message:err.message})  
    }
})


// Update Profile
app.put("/user/updateProfile",checkAuth,requestValidator(userValidator),async(req,res,next)=>{
    console.log(validationResult(req));
    try {
        const user=await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
        res.send(user)
    } catch (error) {
        next({status:400, message:error.message}) 
    }
})

// Create Message:
app.post("/message/create", messageRules, async(req, res, next) => {
    try {
        const user = await User.findById(req.body.author)
        console.log(user);
        if(user){
            const message = await Message.create(req.body)
            res.send({message})
        }  
    } catch (err){
        next({status: 400, message: err.message })
    }
})

// List all Messages:
app.get("/messageList",checkAuth,  async(req, res, next) => {
    try {
        console.log("Message list all: ", req.user.id);
        
        let messages = await Message.find()
        res.send(messages)
    } catch (error) {
        next(createError(400, error.message))
    }
})

// Messages List:
app.get("/message/find",checkAuth,  async(req, res, next) => {
    try {
        const query = Message.find({recipient: req.user._id})
        query.populate("author", "userName")
        const messages = await query.exec()
        console.log(messages);
        res.send(messages)

      
    } catch (error) {
        next(createError(400, error.message))
    }
})

// Delete Message:
app.delete("/message/:id", checkAuth, async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id)
        if(!message){
            return next(createError(404, "Message is not found"))
        }
        await message.remove()
        res.send({ ok: true, deleted: message })
    } catch (error) {
        next(createError(400, error.message))
    }
})

// Global Error Handler:
app.use("/",(error, req, res, next)=>{
    console.log("GlobalError",error);
    res.status(error.status || 500).send({
        error: error.message || error.errors ||"Something went wrong"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server listening to " + process.env.PORT);
})