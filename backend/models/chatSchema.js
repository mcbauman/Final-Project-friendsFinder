import mongoose from 'mongoose'

const chatSchema=new mongoose.Schema({
    user:       {type:[mongoose.Schema.Types.ObjectId], ref:"user", required:true},
    content:    {type: String, required:true,},
    member:     {type:[mongoose.Schema.Types.ObjectId], ref:"user", required:true},
    type:       {enum:["incoming","outgoing"]},
    unread:     {type:Boolean}
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.__v
        },
    },
})

const Chat=mongoose.model("chat", chatSchema)

export default Chat