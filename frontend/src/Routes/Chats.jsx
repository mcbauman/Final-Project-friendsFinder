import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";
import exmpl from "../components/exmpl.jpeg"
import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Chatview from "./Chatview";
import {Context}from "../components/context"
import {useContext} from "react";

export default function Messages(props){
    const [chats, setChats] = useState([])
    const {hide,setHide}=useContext(Context)

    function loadChats(){
    const headers = { Authorization: `Bearer ${props.token}` }
    axios.get(`${process.env.REACT_APP_BE_SERVER}/chats`, {headers})
        .then (res=>{
            console.log(res.data)
            console.log("HERE>>>",res.data[0]);
            setChats(res.data)
        })
    }

    function loopTrough(){
        chats.map(item=>{
            console.log("ITEM",item)
        })
    }
    useEffect(()=>{
        loadChats() 
        setHide(false)
    },[])

    useEffect(()=>{
        loopTrough()
    },[chats])

    console.log("USER FROM PROPS",props.user);

    return(
        <article>
            <section id="messages">
            {chats&&chats.length?(
                <>
                    <Routes> 
                        {chats.map(item=>(
                            <Route key={item._id} path={item._id} element={<Chatview  
                                itemKey={item._id} user={props.user} 
                                member={item.members[0].id._id=props.user?item.members[1].id.userName:item.members[0].id.userName}
                                memberId={item.members[0].id._id=props.user?item.members[1].id._id:item.members[0].id._id}
                                img={`${process.env.REACT_APP_BE_SERVER}/picture/${item.members[1].id._id=props.user}`}
                                sethide={setHide} token={props.token}/>}/>
                        ))} 
                    </Routes>
                    {!hide&&                    
                    chats.map(item=>(
                        <div key={item._id} >
                            <NavLink key={item._id} to={item._id} className="chatOV">
                                <img className="img2" 
                                src={item.members[1].id.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.members[1].id._id=props.user}`:exmpl}/>
                                <div className="author">{item.members[0].id._id=props.user?item.members[1].id.userName:item.members[0].id.userName}</div>
                            </NavLink>
                        </div>
                    ))}
                </>)
                :<div className="loadingio-spinner-ripple-jjyczsl43u">
                    <div className="ldio-qydde5o934a">
                        <div></div><div></div></div></div>
            }
            </section>
        </article>
    )
}