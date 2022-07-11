import express from 'express'
import File from '../models/FileModel.js'
import multer from 'multer'
import path from 'path'
import createError from "http-errors"
import checkAuth from '../middleware/checkAuth.js'


const pictureRouter = express.Router()

// create multer "middleware factory" (here we can configure multer)
const __dirname = path.resolve(path.dirname(''))
const dirPath = path.join(__dirname, '/uploads');
const multerOptions = { dest: dirPath }
const upload = multer(multerOptions)

const handleUpload = upload.fields([{ name: "selectedFile", maxCount: 1 }])
// Create Profile Picture:
pictureRouter.post("/createPicture", checkAuth, handleUpload, async(req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    try {
        const file = await File.create(req.files.selectedFile[0])
        console.log("Prof. Pic: ",req.user.profilePicture);

        req.user.profilePicture = file._id
        console.log(file._id);
        const bla = await req.user.save()
        console.log("Bla: ", bla);
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