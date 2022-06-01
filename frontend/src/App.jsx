import Header from "./Header"
import Main from "./Main"
import Log from "./Log"
import {useEffect, useState} from "react"

const userFromLS=localStorage.getItem("user")
const userDefault=userFromLS?JSON.parse(userFromLS):null

const tokenFromLS=localStorage.getItem("token")
const tokenDefault=tokenFromLS?tokenFromLS:null

export default function App(){
   const [user,setUser]=useState(userDefault)
   const [token,setToken]=useState(tokenDefault)

   useEffect(()=>{
      if(user){localStorage.setItem("user",JSON.stringify(user))
      }else{localStorage.removeItem("user")}
    },[user])
  
    useEffect(()=>{
      if(token){localStorage.setItem("token",(token))
      }else{localStorage.removeItem("token")}
    },[token])

   return(
      <>
         {user?
         <>
            <Header/>
            <Main user = {user} token = {token} />
         </>
         :<Log setUser={setUser} setToken={setToken}/>
         }
      </>
   )
}