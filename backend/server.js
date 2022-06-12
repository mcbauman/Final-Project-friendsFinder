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
import pictureRouter from "./routes/pictureRouter.js"

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

/*function async updateAge(){
    const Users=await User.find()
    
}
updateAge()
setInterval(()=>{
    updateAge()
},1000*60*60*24)
 */

//TESTING BASIC REQUEST TO SEE THAT SERVER IS RESPONDING AT ALL
app.get("/",(req,res)=>{
    res.send("Answer to /")
})

//TESTING Get a List of Users
app.get("/users/ListAll",async(req,res,next)=>{
    try {
        let users= await User.find()
        res.send(users)
    } catch (err) {
        next({status:400, message:err.message})
    }
})

//TESTING List all Messages:
app.get("/messageList",checkAuth,  async(req, res, next) => {
    try {
        console.log("Message list all: ", req.user.id);

        let messages = await Message.find()
        res.send(messages)
    } catch (error) {
        next({status:400,message:error})
    }
})

//Picture Router
app.use("/picture", pictureRouter)

// LOGIN User:
app.post("/user/login",async (req,res,next)=>{
    try {
        // find user
        const user=await User.findOne({email:req.body.email})
        if(!user){return next({status:405,message:"user doesnt exist"})}
        // compare password
        const loginSuccess = await compare(req.body.password, user.password)
        if(!loginSuccess){return next({status:405,message:"Password missmatch"})}
        // create token
        const token=jwt.sign({uid:user._id},process.env.SECRET)
        // send user the token
        res.send({token,_id:user._id, profilePicture:user.profilePicture.toString(),theme:user.theme,lang:user.lang})
//        res.send({token,_id:user._id, profilePicture:user.profilePicture?user.profilePicture.toString():null})
    } catch (error) {
        next({status:400,message:error})
    }
})

// CreateUser:
app.post("/user/create",userValidator, async(req, res, next)=>{
    const errors=validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return next({status:405,message:errors.errors.map(err=>err.msg)})
    } try {
        req.body.password=await hash(req.body.password)
        const user = await User.create(req.body)
        const user2=await User.findOne({email:req.body.email})
        const token=jwt.sign({uid:user2._id},process.env.SECRET)
        res.send({token,_id:user._id})
    } catch (err) {
        next({status:400, message:err.message})
    }
})

// Find users matching criteria
app.post("/user/find",checkAuth,async (req,res,next)=>{
    //console.log(req.body)
    // let age=(Date.now()-(new Date(reg.body.birthday)).getTime())/(365*24*60*60*1000)
    // console.log(Date.now())
    // console.log(new Date("1990-02-05T00:00:00.000Z").getTime())
    // console.log("YEAR",new Date("1990-02-05T00:00:00.000Z").getDate())
    // console.log("AGE from l88",age)
    const filter={age:{$gte:req.body.minAge, $lte:req.body.maxAge}}
    if(req.body.interests&&req.body.interests.length>0){
        filter.interests={
            $in:req.body.interests
        }
    }
    if(req.body.srchdGender!=="any"){
        filter.gender= req.body.srchdGender
    }
    try{
        let users=await User.find(filter)
        // console.log("Filter 95",filter)
        // console.log("BE SERVER.JS USER 89",users)
        res.send(users)
    }catch (e) {
        next({status:400, message:e.message})
    }
})

// Find Profile
app.get("/user/updateProfile",checkAuth,async(req,res,next)=>{
    try {
 //       const user=await User.findById(req.user._id)
 //       res.send(user)
        const user=await User.findById(req.user._id).populate("friends","userName profilePicture")
        console.log(user)
        res.send(user)
    } catch (err) {
        next({status:400, message:err.message})  
    }
})

// Update Profile
app.put("/user/updateProfile",checkAuth,requestValidator(userValidator),async(req,res,next)=>{
    try {
        const user=await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
        console.log(user)
        res.send(user)
    } catch (error) {
        next({status:400, message:error.message}) 
    }
})

// check friends
app.get("/user/checkFriends",checkAuth, async (req,res,next)=>{
    try {
        const user=await User.findById(req.user._id)
        res.send(user.friends)
    } catch (error) {
        next({status:400, message:error.message})
    }
})

// add an Friend
app.put("/user/addFriend",checkAuth, async (req,res,next)=>{
    try {
        const user=await User.findByIdAndUpdate(req.user._id, {$addToSet:req.body})
        res.send(user)
    } catch (error) {
        next({status:400, message:error.message})
    }
})

// Create Message:
app.post("/message/create", checkAuth, messageRules, async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if(user){
            const message = await Message.create(req.body)
            res.send({message})
        }  
    } catch (err){
        next({status: 400, message: err.message })
    }
})

// Messages List:
app.get("/message/find",checkAuth,async(req, res, next) => {
    try {
        const query = Message.find({recipient: req.user.id})
        query.populate("author", "userName profilePicture")
//        query.sort("author","profilePicture")
        const messages = await query.exec()
        messages.reverse()
        res.send(messages)
    } catch (error) {
        next({status:400, message:err.message})
    }
})

// Delete Message:
app.delete("/message/:id", checkAuth, async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id)
        if(!message){
            next({status:400, message:"Message not found"})
        }
        await message.remove()
        res.send({ ok: true, deleted: message })
    } catch (error) {
        next({status:400, message:err.message})
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