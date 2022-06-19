import mongoose from "mongoose";
import User from "./UserModel.js"

const { Schema, model } = mongoose

const cMessageSchema = new mongoose.Schema({
    user:     { type: Schema.Types.ObjectId, ref: "user"},
    content:  { type: String, trim: true, required: true},
    chatId:   { type: Schema.Types.ObjectId, ref: "chat"},
    readBy:   { type:Schema.Types.ObjectId, ref:"user" }
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.__v
        },
    },
})

cMessageSchema.pre("remove", async function(){
    const id = this._id.toString()
    console.log("Message is being removed " + id)

    const author = await User.findById(this.author)
    if ( author ) {
        author.messages = author.messages.filter(x => x.toString() !== id)
        await author.save()
    }
    // next() 
})

const cMessage = mongoose.model("cMessage", cMessageSchema)

export default cMessage