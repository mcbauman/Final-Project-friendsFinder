import mongoose from "mongoose";

const required = true

const apiData = new mongoose.Schema({
    data:             { required, type: Array },
    
})

const ApiData = mongoose.model("apiData", apiData)
export default ApiData 