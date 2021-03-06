import mongoose from 'mongoose'

const memberSchema=new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
}, { _id: false })

const chatSchema=new mongoose.Schema({
    members:    [memberSchema],
    redBy:      {type:[mongoose.Schema.Types.ObjectId],ref:"user"}
 })

const Chat=mongoose.model("chat", chatSchema)

export default Chat