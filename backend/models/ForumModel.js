import mongoose from "mongoose";

const forumSchema= new mongoose.Schema({
    author:    { type: Schema.Types.ObjectId, ref: "user", required: true },
    content:   { type: String, trim: true, required: true },
    subject:   { type: String }
},{
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.__v
        },
    },
})

const Forum=mongoose.model("forum", forumSchema)

export default Forum