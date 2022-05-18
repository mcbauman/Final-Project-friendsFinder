import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Answer to /")
})

app.listen(process.env.PORT,()=>{
    console.log("Server listening to"+process.env.PORT);
})