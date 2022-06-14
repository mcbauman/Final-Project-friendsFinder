import mongoose from 'mongoose'
import User from "./UserModel.js"

const chatSchema=new mongoose.Schema({
    user:       {type:[mongoose.Schema.Types.ObjectId], ref:"user", required:true},
    content:    {type: String, required:true,},
    member:     {type:[mongoose.Schema.Types.ObjectId], ref:"user", required:true},
    type:       {enum:["incomming","outgoing"]},
    unread:     {type:Boolean},
    time:       {type:Date}
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.__v
        },
    },
})


const Chat=mongoose.model("chat", chatSchema)

export default User