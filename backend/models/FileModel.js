import mongoose from 'mongoose'
import User from './UserModel.js'

const required = true

const fileSchema = new mongoose.Schema({
    originalname:   { required, type: String },
    mimetype:       { required, type: String },
    filename:       { required, type: String },
    path:           { required, type: String },
    size:           { required, type: Number },
    user:           { type: mongoose.Schema.Types.ObjectId, ref: "user"}
})

const File = mongoose.model("file", fileSchema)
export default File