import mongoose from 'mongoose'

const required = true

const fileSchema = new mongoose.Schema({
    originalname:   { required, type: String },
    mimetype:       { required, type: String },
    filename:       { required, type: String },
    path:           { required, type: String },
    size:           { required, type: Number },
})

const File = mongoose.model("file", fileSchema)
export default File