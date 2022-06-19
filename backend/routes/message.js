import express from 'express';
const router = express.Router();

import checkAuth from "../checkAuth.js"
import { messageRules } from "../validator/messageValidator.js"




// Create Message:
router.post("/create", checkAuth, messageRules, async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if(user){
            const message = await Message.create(req.body)
            res.send({message})
        }  
    } catch (err){
        next({status: 400, message: err.message })
    }
})

// Messages List:
router.get("/find",checkAuth,async(req, res, next) => {
    try {
        const query = Message.find({recipient: req.user.id})
        query.populate("author", "userName profilePicture")
//        query.sort("author","profilePicture")
        const messages = await query.exec()
        messages.reverse()
        res.send(messages)
    } catch (error) {
        next({status:400, message:err.message})
    }
})

// Delete Message:
router.delete("/:id", checkAuth, async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id)
        if(!message){
            next({status:400, message:"Message not found"})
        }
        await message.remove()
        res.send({ ok: true, deleted: message })
    } catch (error) {
        next({status:400, message:err.message})
    }
})


export { router }