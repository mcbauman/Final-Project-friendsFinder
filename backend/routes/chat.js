import express from 'express';
const router = express.Router();

import checkAuth from "../checkAuth.js"
import Chat from "../models/chatSchema.js"
import cMessage from "../models/CMessageModel.js"


// Chat new entry: 
router.post("/add", checkAuth, async(req, res, next) => {
  try {
//        const existingChats = await Chat.find({members:{$elemMatch:{$eq: req.user._id}}}, {members:{$elemMatch:{$eq: req.body.recipient}}})
let existingChats = await Chat.find({members:[{id:req.user._id},{id:req.body.recipient}]})
//        const existingChats = await Chat.find({members:req.user._id,member:req.body.recipient})
      console.log("USER ID Sended",req.user._id);
      console.log("RECRIPIENT ID Sended", req.body.recipient);
      if(!existingChats.length){
          const chat = await Chat.create({members:[{id:req.user._id},{id:req.body.recipient}]})
          // const chat = await Chat.create({members:[req.user._id,req.recipient]})
          existingChats=Chat
      }
//        console.log("l237",existingChats[0]._id);
      const body2={chatId:existingChats[0]._id}
      console.log("BODY2",body2);
      req.chatId=existingChats
      console.log("BODY",req.body);
      const message=await cMessage.create(req.body)
      res.send(message)
  } catch (err){
      next({status: 400, message: err.message })
  }
})

// Chat List Chats: 
router.get("/find",checkAuth,async(req, res, next) => {
  try {
      const query = Chat.find({members: req.user.id})
//        query.populate("member", "userName profilePicture")
      const chats = await query.exec()
      chats.reverse()
      res.send(chats)
  } catch (error) {
      next({status:400, message:error.message})
  }
})

// Chat List send:
router.get("/find/send",checkAuth,async(req, res, next) => {
  try {
      const query = Chat.find({member: req.user.id})
      query.populate("user", "userName profilePicture")
      const chats = await query.exec()
      chats.reverse()
      res.send(chats)
  } catch (error) {
      next({status:400, message:error.message})
  }
})


export { router }