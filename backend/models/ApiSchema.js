import mongoose from "mongoose";

const required = true

const apiData = new mongoose.Schema({
    data:             { required, type: Array },
    // description:   { required, type: String },
    // content:       { required, type: String },
    // urlToImage:    { required, type: String },
    // publishedAt:   { required, type: String },
    // url:           { required, type: String }
})

const ApiData = mongoose.model("apiData", apiData)
export default ApiData 