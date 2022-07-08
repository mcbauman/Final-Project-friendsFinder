
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from "./models/UserModel.js"
import userValidator from "./validator/userValidator.js"
import messageRules from "./validator/messageValidator.js"
import forumValidator from "./validator/forumValidator.js"
import commentValidator from "./validator/commentValidator.js"
import { validationResult } from "express-validator"
import { hash, compare } from "./crypto.js"
import jwt from "jsonwebtoken"
import checkAuth from "./middleware/checkAuth.js"
import requestValidator from "./validator/requestValidator.js"
import pictureRouter from "./routes/pictureRouter.js"
import Chat from "./models/chatSchema.js"
import CMessage from "./models/CMessageModel.js"
import Forum from "./models/ForumModel.js"
import locationFinder from "./middleware/locationFinder.js";

export function connect() {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
  const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

  mongoose.connection.on("connecting", () => console.log("[DB] connecting"));
  mongoose.connection.on("connected", () => console.log("[DB] connected"));
  mongoose.connection.on("disconnecting", () =>console.log("[DB] disconnecting"));
  mongoose.connection.on("disconnected", () =>console.log("[DB] disconnected"));
  mongoose.connection.on("reconnected", () => console.log("[DB] reconnected"));
  mongoose.connection.on("error", (er) => console.log("[DB] error", er));

  mongoose.connect(connectionString);
}

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connect();

/*function async updateAge(){
    const Users=await User.find()
    
}
updateAge()
setInterval(()=>{
    updateAge()
},1000*60*60*24)
 */


//Picture Router
app.use("/picture", pictureRouter);

//LOGIN USER
app.post("/user/login",async (req,res,next)=>{
  try {
      console.log(req.body);
      const user=await User.findOne({email:req.body.email})
      if(!user){return next({status:405,message:"user doesnt exist"})}
      const loginSuccess = await compare(req.body.password, user.password)
      if(!loginSuccess){return next({status:405,message:"Password missmatch"})}
      const token=jwt.sign({uid:user._id},process.env.SECRET,{expiresIn:"1d"})
      res.send({token,_id:user._id,theme:user.theme,lang:user.lang,userName:user.userName,latitude:user.latitude,longitude:user.longitude})
  } catch (error) {
      next({status:400,message:error})
  }
});

// CreateUser:
app.post("/user/create",userValidator,locationFinder,async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return next({
        status: 405,
        message: errors.errors.map((err) => err.msg),
      });
    }
    try {
      console.log(req.userCoordinate);
      req.body.password = await hash(req.body.password);
      const user = await User.create({ ...req.body, ...req.userCoordinate });
      const user2 = await User.findOne({ email: req.body.email });
      const token = jwt.sign({ uid: user2._id }, process.env.SECRET);
      res.send({ token, _id: user._id});
    } catch (err) {
      next({ status: 400, message: err.message });
    }
  }
);

// Find users matching criteria
app.post("/user/find", checkAuth, async (req, res, next) => {
  const filter = { age: { $gte: req.body.minAge, $lte: req.body.maxAge } };
  if (req.body.interests && req.body.interests.length > 0) {
    filter.interests = {
      $in: req.body.interests,
    };
  }
  if (req.body.srchdGender !== "any") {
    filter.gender = req.body.srchdGender;
  }
  try {
    let users = await User.find(filter);
    res.send(users);
  } catch (e) {
    next({ status: 400, message: e.message });
  }
});

// Find Profile to update
app.get("/user/updateProfile",checkAuth,locationFinder,async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id).populate("friends","userName profilePicture")
        console.log(user)
        res.send(user)
    } catch (err) {
        next({status:400, message:err.message})  
    }
})

// Update Profile
app.put("/user/updateProfile",checkAuth,requestValidator(userValidator), async (req, res, next) => {
    try {
      if(req.body.password){
        req.body.password = await hash(req.body.password);
      }
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      console.log(user);
      res.send(user);
    } catch (error) {
      next({ status: 400, message: error.message });
    }
  }
);


// Delete Profile
app.delete("/user/delete", checkAuth, async (req,res,next)=>{
  console.log("Deleting")
  try {
    await User.deleteOne({ _id: req.user._id });
    // //Delete Messages
    // await CMessage.deleteMany({user:req.user._id})
    // //Delete Chats
    await Chat.deleteMany({members:{$elemMatch:{id:req.user._id}}})
    // //Delete Forum
   await Forum.deleteMany({author:req.user._id})
    // //Delete Comments?
    let newComments =await Forum.updateMany({comments:{$elemMatch:{author:req.user._id}}},
      {$pull:{"comments":{author:req.user._id}}})
    res.send("User deleted");
  } catch (error) {
    next({ status: 400, message: error.message });
  }
})

// check friends
app.get("/user/checkFriends", checkAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user.friends);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

// add an Friend
app.put("/user/addFriend", checkAuth, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $addToSet: req.body,
    });
    res.send(user);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});


//Delete Friend
app.put("/deleteFriend/", checkAuth, async (req, res, next) => {
    try {
        const $pull={friends:req.body.friends}
        const user = await User.findByIdAndUpdate(req.user._id,{$pull})
        res.send(user)
    } catch (error) {
        next({status:400, message:err.message})
    }
})

//Get CHAT-Members )
app.get("/chats", checkAuth, async (req,res,next)=>{
    try {
        const query = Chat.find({members:{$elemMatch:{id:req.user._id}}})
        query.populate("members.id","userName profilePicture")
        const chats=await query.exec()
        const readableChats=chats.map(chat=>chat.toObject())
        chats.reverse()
        res.send(chats)
    } catch (err){
        next({status: 400, message: err.message })
    }
})

// Chat new entry: 
app.post("/chats", checkAuth, requestValidator(messageRules), async(req, res, next) => {
    try {
        let chatId
        const filterone=await Chat.find({members:{$elemMatch:{id:req.user._id}}})
        const existingChats=filterone.filter(item=>item.members.find(member=>{
            return member.id.toString()===req.body.recipient}))
        if(!existingChats.length>0){
            const chat = await Chat.create({members:[{id:req.user._id},{id:req.body.recipient}]})
            chatId=chat._id
            const message=await CMessage.create({...req.body,chatId:chatId})
            res.send(message)
        }else{
            chatId=existingChats[0]._id
            const message=await CMessage.create({...req.body,chatId:chatId})
            res.send(message)
        }
    } catch (err){
        next({status: 400, message: err.message })

    }
});

// Chat List Messages: 
app.post("/messages",checkAuth,async(req, res, next) => {
    try {
        const query = CMessage.find({chatId: req.body.chatId})
        const messages = await query.exec()
        res.send(messages)
    } catch (error) {
        next({status:400, message:error.message})
    }
})

// GET Forum:
app.get("/posts", checkAuth, async (req, res, next) => {
  try {
    const query = Forum.find();
    query.populate("author", "userName profilePicture");
    const something = await query.exec();
    something.reverse();
    //    console.log(something);
    res.send(something);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});

// POST Forum:
app.post("/posts", checkAuth,requestValidator(forumValidator), async(req, res, next) => {
    try {
        const forum = await Forum.create(req.body)
        res.send(forum)
    } catch (error) {
        next({status: 400, message: error.message })
    }
})

// Comment on Forum:
app.put("/posts/addComment/:id", checkAuth, requestValidator(commentValidator), async(req, res, next) => {
    try{
        console.log("Dta from frontend: ",req.body);
        const forum = await Forum.findById(req.params.id) 
        forum.comments.push(req.body)
        await forum.save()
        res.send(forum)
        console.log("Forum after save: ",forum);
    }catch (error) {
        next({status:400, message:error.message})
    }
})

// Global Error Handler:
app.use((error, req, res, next)=>{
    console.log("GlobalError",error);
    res.status(error.status || 500).send({
        error: error.message || error.errors ||"Something went wrong"
    })
})

app.listen(process.env.PORT, () => {
  console.log("Server listening to " + process.env.PORT);
});
