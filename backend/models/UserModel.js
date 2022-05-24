import mongoose from 'mongoose'

// email-Type
// password -coded
// avatar Type

const userSchema=new mongoose.Schema({
    email:{type:String, required:true},
    password:{required:true},
    userName:{type:String},
    avatar:String
})

const User=mongoose.model("user", userSchema)

export default User