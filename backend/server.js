import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from "./models/UserModel.js"
import userValidator from "./validator/userValidator.js"
import {validationResult} from "express-validator"
import {hash, compare } from "./crypto.js"
import jwt from "jsonwebtoken"

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

app.post("/loginUser",async (req,res,next)=>{
    try {
        // find user
        const user=await User.findOne({email:req.body.email})
        // compare password
        const loginSuccess = await compare(req.body.password, user.password) 
        if(!loginSuccess){throw Error("Password missmatch")}
        // create token
        const token=jwt.sign({uid:user._id},process.env.SECRET)
        // send user the token
        res.send({user,token})
    } catch (error) {
        next({status:400,message:error})
    }
})

//CreateUser
app.post("/createUser",userValidator,async(req,res,next)=>{
    const errors=validationResult(req)
    // console.log(errors);
    if(!errors.isEmpty()){
        return next(errors)
    }
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

//Global Error Handler
app.use("/",(error, req, res, next)=>{
    console.log(error);
    res.status(error.status || 500).send({
        error: error.message || error.errors.map((err)=>err.msg)||"Something went wrong"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("Server listening to"+process.env.PORT);
})