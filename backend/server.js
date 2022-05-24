import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from "./models/UserModel.js"
import userValidator from "./validator/userValidator.js"
import {validationResult} from "express-validator"


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

app.post("/user",userValidator,async(req,res,next)=>{
    const errors=validationResult(req)
    // console.log(errors);
    if(!errors.isEmpty()){
        return next(errors)
    }
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (err) {
        next({status:400, message:err.message})
    }
})

app.get("/user",async(req,res,next)=>{
    try {
        let users= await User.find()
        res.send(users)
    } catch (err) {
        next({status:400, message:err.message})
    }
})

app.get("/user:/id",async(req,res)=>{
    // try {
    //     const user = await User.findById(req.params.id)
    //     if (!user) {
    //         return next(createError(404, "User not found"))
    //     }
    //     res.send(user)
    // } catch (e) {
    //     next(createError(400, e.message))
    // }
    res.send("Login passed or failed")
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