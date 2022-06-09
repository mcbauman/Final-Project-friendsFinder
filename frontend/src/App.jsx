import Header from "./Header"
import Main from "./Main"
import Log from "./Log"
import {useEffect, useState} from "react"

const userFromLS=localStorage.getItem("user")
const userDefault=userFromLS?JSON.parse(userFromLS):null

const userProfPicLS = localStorage.getItem("userProfPic")
console.log("LOCAL STORAGE USER PROFILE PIC from APP.JSX",userProfPicLS);
const userProfPicDefault=userFromLS?userProfPicLS:null
console.log("USERPROFDEFAULT",userProfPicDefault)

const tokenFromLS=localStorage.getItem("token")
const tokenDefault=tokenFromLS?tokenFromLS:null

export default function App(){
   const [user,setUser]=useState(userDefault)
   const [token,setToken]=useState(tokenDefault)
   const [userProfPic, setUserProfPic] = useState(userProfPicDefault)
   console.log(userProfPic);

   useEffect(()=>{
      if(user){localStorage.setItem("user",JSON.stringify(user))
      }else{localStorage.removeItem("user")}
    },[user])
  
    useEffect(()=>{
      if(token){localStorage.setItem("token",(token))
      }else{localStorage.removeItem("token")}
    },[token])

    useEffect(()=>{
      localStorage.setItem("userProfPic",(userProfPic))
          console.log("USERPROFPIC from APP.JS L34",userProfPic)
    },[userProfPic])

   return(
      <>
         {user?
         <>
            <Header setUser={setUser} setToken={setToken}/>
            <Main user = {user} token = {token} userProfPic = {userProfPic} setUserProfPic={setUserProfPic}/>
         </>
         :<Log setUser={setUser} setToken={setToken} setUserProfPic= {setUserProfPic} />
         }
      </>
   )
}