import Start from "./Routes/Start"
import Search from "./Routes/Search.jsx"
import Messages from "./Routes/Messages"
import Profile from "./Routes/Profile"
import {Routes,Route} from "react-router-dom"
import { useState } from "react"

export default function Main(props){
    return(
        <main>
            <Routes>
                <Route path="*" element={<Start user= {props.user} token= {props.token} /> }/>
                <Route path="Search" element={<Search user= {props.user} token= {props.token}/>}/>
                <Route path="Messages" element={<Messages user= {props.user} token= {props.token}/>}/>
                <Route path="Profile" element={<Profile 
                    userProfPic={props.userProfPic} 
                    setUserProfPic={props.setUserProfPic} 
                    user= {props.user} 
                    token= {props.token}  
                    theme={props.theme} 
                    setTheme={props.setTheme}/> }/>
            </Routes>
        </main>
    )
}