import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from '../models/UserModel.js'

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

app.post("/user",async(req,res)=>{
    // try {
    //     const user = await User.create(req.body)
    //     res.send(user)
    // } catch (err) {
    //     next(createError(400, err.message))
    // }
    res.send("Saving USER Funtion")
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

app.listen(process.env.PORT,()=>{
    console.log("Server listening to"+process.env.PORT);
})