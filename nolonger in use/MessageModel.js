import mongoose from "mongoose";
import User from "../backend/models/UserModel.js"

const { Schema, model } = mongoose

const messageSchema = new mongoose.Schema({
    author:    { type: Schema.Types.ObjectId, ref: "user", required: true },
    content:   { type: String, trim: true, required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "user", required: true },
    subject:   { type: String }
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.password
            delete ret.__v
        },
    },
})

messageSchema.pre("remove", async function(){
    const id = this._id.toString()
    console.log("Message is being removed " + id)

    const author = await User.findById(this.author)
    if ( author ) {
        author.messages = author.messages.filter(x => x.toString() !== id)
        await author.save()
    }
    // next() 
})

const Message = mongoose.model("message", messageSchema)

export default Message