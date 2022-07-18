import Start from "./Routes/Start"
import Search from "./Routes/Search.jsx"
import Profile from "./Routes/Profile"
import Chats from "./Routes/Chats"
import axios from "axios";
import React, { useEffect } from "react";
import {Routes,Route} from "react-router-dom"
import { useContext } from "react";
import { Context } from "./components/context.js"

export default function Main(props){
    const {setIsNewMessageCame} = useContext(Context)
    function loadChats(){
        const headers = { Authorization: `Bearer ${props.token}` }
        axios.get(`${process.env.REACT_APP_BE_SERVER}/chats`, {headers})
            .then (res=>{
                res.data.map(item=>{
                    if(!item.redBy.includes(props.user)){
                        setIsNewMessageCame(true)
                    }
                })
            })
            .catch(error => {
                if(error.response.data.error.message=="jwt expired"){
                    localStorage.removeItem("token")
                    props.setToken(null)
                }
                console.log(error)})
    }
    
    //setInterval(loadChats,5000)
    useEffect(()=>{
        loadChats() 
    },[])

    return(
        <main>
            <Routes>
                <Route path="*" element={<Start user= {props.user} setToken={props.setToken} token= {props.token} /> }/>
                <Route path="Search" element={<Search user= {props.user} setToken={props.setToken} token= {props.token}/>}/>
                <Route path="Chats/*" element={<Chats user= {props.user} setToken={props.setToken} token= {props.token}/>}/>
                <Route path="Profile" element={<Profile
                    setToken={props.setToken}
                    setUser={props.setUser} 
                    userProfPic={props.userProfPic} 
                    setUserProfPic={props.setUserProfPic} 
                    user= {props.user} 
                    token= {props.token}/> }/>
            </Routes>
        </main>
    )
}