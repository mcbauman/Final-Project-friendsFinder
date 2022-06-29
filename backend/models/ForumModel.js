import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    comment: {type: String, required: true},
    author:  {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}
})

const forumPostSchema = new mongoose.Schema({
    author:   { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content:  { type: String, trim: true, required: true },
    subject:  { type: String },
    comments: [answerSchema]
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v
        },
    },
})

const Forum = mongoose.model("forum", forumPostSchema)

export default Forum