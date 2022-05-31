import mongoose from "mongoose";
import User from "./UserModel.js"

const messageSchema = new mongoose.Schema({
    // author:  { type: Schema.type.Object, ref: "user", required: true},
    content: { type: String, trim: true, required: true},
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.password
            delete ret.__v
        },
    },
})

const Message = mongoose.model("message", messageSchema)

export default Message