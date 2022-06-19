

const getChats = async (req,res,next)=>{
  try {
//        console.log("REQ_USER",req.user);
      const chats = Chat.find({members: { $elemMatch: {$eq: req.user._id} }}).populate("members","userName profilePicture");
//        query.populate("members","userName profilePicture")
//        const chats=await query.exec()
      console.log("EXISTINGCHATS SERVER L207",chats)
// {
//     "_id": "62ac4e6e48fe636cf41af079",
//     "members": [],
//     "__v": 0
//   }
          res.send(chats)
  } catch (err){
      next({status: 400, message: err.message })
  }
}


export { getChats }