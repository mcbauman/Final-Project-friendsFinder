import mongoose from 'mongoose'

// email-Type
// password -coded
// avatar Type

const userSchema=new mongoose.Schema({
  
    name:{type:String,required:true},
    familyName:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    userName:{type:String},
    avatar:String,
    dateOfBirth:{type:Date,required:true},
    gender:{type:String, required:true, enum:["male","female","diverse"]},
    interests:Array,
    emailVerified:{type:Boolean,default:false},
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