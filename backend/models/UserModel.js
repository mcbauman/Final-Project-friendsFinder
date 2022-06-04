import mongoose from 'mongoose'
import Message from './MessageModel.js'

const { Schema, model } = mongoose

// email-Type
// password -coded
// avatar Type

const userSchema=new Schema({
    messages:    { type: [Schema.Types.ObjectId], ref: "message"},
    name:        { type:String,required:true},
    familyName:  { type:String,required:true},
    email:       { type:String, required:true, unique:true},
    password:    { type:String,required:true},
    userName:    { type:String},
    avatar:          String,
    dateOfBirth: { type:Date,required:true},
    age:            Number,
    gender:      { type:String, required:true, enum:["⚧","♂️","♀️"]},
    interests:    Array,
    //Stored last search?
    profileText:    String,
    friends:    {type:Array},
    emailVerified:{type:Boolean,default:false},
    score:        { type:Number, default:0}

}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.password
            delete ret.__v
        },
    },
})

userSchema.pre('remove', async function() {
    console.log("User is being removed " + this._id)
    await Message.deleteMany({ author: this._id })
})

const User=mongoose.model("user", userSchema)

export default User