import express from 'express'
import File from '../models/FileModel.js'
import multer from 'multer'
import path from 'path'
import createError from "http-errors"
import checkAuth from '../checkAuth.js'


const pictureRouter = express.Router()

// create multer "middleware factory" (here we can configure multer)
const multerOptions = { dest: 'uploads/' }
const upload = multer(multerOptions)

const handleUpload = upload.fields([{ name: "selectedFile", maxCount: 1 }])
// Create Profile Picture:
pictureRouter.post("/createPicture", checkAuth, handleUpload, async(req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    try {
        const file = await File.create(req.files.selectedFile[0])
        req.user.profilePicture.push(file._id)
        await req.user.save()
        res.send(file)
    } catch (error) {
        next({status:400, message:error.message})
    }
    console.log("picture file: ", req.files);
})

pictureRouter.get("/file", async (req, res) => {
    res.send(await File.find())
})

// Show a Picture:
pictureRouter.get("/:id", async(req, res, next)=> {
    try {
        const pic = await File.findById(req.params.id)
        if(!pic){
            return next(createError(404, "Picture is not found"))
        }
        const absolutePath = path.resolve(pic.path)
        console.log("Absolute Path: ",absolutePath);
        res.sendFile(absolutePath)
    } catch (error) {
        next(createError(400, error.message))
    }
})

export default pictureRouter