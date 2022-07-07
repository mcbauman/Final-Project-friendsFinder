import mongoose from 'mongoose'
import Forum from './ForumModel.js'
import Chat from './chatSchema.js'
import cMessage from './CMessageModel.js'

const userSchema=new mongoose.Schema({
    name:           {type:String, required:true},
    familyName:     {type:String, required:true},
    email:          {type:String, required:true, unique:true},
    password:       {type:String, required:true},
    userName:       {type:String, required:true, unique:true},
    street:         {type:String, required:true},
    number:         {type:Number, required:true},
    city:           {type:String, required:true},
    zipCode:        {type:Number, required:true},
    country:        {type:String, required:true},
    latitude:       {type: Number},
    longitude:      {type: Number},
    dateOfBirth:    {type:Date, required:true},
    age:            Number,
    gender:         {type:String, required:true, enum:["⚧","♂️","♀️"]},
    interests:      Array,
    profileText:    String,
    friends:        {type: [mongoose.Schema.Types.ObjectId], ref: "user"},
    emailVerified:  {type:Boolean,default:false},
    score:          {type:Number, default:0},
    profilePicture: {type: mongoose.Schema.Types.ObjectId, ref: "file"},
    lang:           {type:String,default:"de",enum:["de","en"]},
    theme:          {type:String,default:"red", enum:["BW","red","green","blue"]}
}, {
    timestamps: true,
    toJSON:{
        transform(doc, ret){
            delete ret.password
            delete ret.__v
        },
    },
})

// userSchema.pre('deleteOne', function() {
//     const idToDelete = this._conditions._id
//     console.log("User is being removed " + idToDelete)
//     cMessage.deleteMany({ user: idToDelete })
//     Chat.deleteMany({members:{$elemMatch:{id:idToDelete}}})
//     Forum.deleteMany({author:idToDelete})
// })

const User=mongoose.model("user", userSchema)

export default User