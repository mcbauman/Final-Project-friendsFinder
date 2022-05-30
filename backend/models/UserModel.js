import mongoose from 'mongoose'

// email-Type
// password -coded
// avatar Type

const userSchema=new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    userName:{type:String},
    avatar:String,
    score:{type:Number, default:0}
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.password
            delete ret.__v
        },
    },
})

const User=mongoose.model("user", userSchema)

export default User