import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";
import exmpl from "../components/exmpl.jpeg"
import {FaUserFriends} from "react-icons/fa"
import {isFriend,checkFriends,addFriend} from "../components/functions";
import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Chatview from "./Chatview";
import {Context}from "../components/context"
import {useContext} from "react";
import logo from "../components/COF.png";

export default function Messages(props){
    const [chats, setChats] = useState([])
    const [friends,setFriends]=useState([])
    const {hide,setHide}=useContext(Context)

    function loadChats(){
    const headers = { Authorization: `Bearer ${props.token}` }
    axios.get(`${process.env.REACT_APP_BE_SERVER}/chats`, {headers})
        .then (res=>{
            console.log(res.data)
            setChats(res.data)
        })
    }

    useEffect(()=>{
        loadChats() 
        setHide(false)
        checkFriends(props.token,setFriends)
    },[])

    return(
        <article>
            <section id="messages">
            {chats&&chats.length?(
                <>
                    <Routes> 
                        {chats.map(item=>(
                            <Route key={item._id} path={item._id} element={<Chatview  
                                itemKey={item._id} user={props.user} 
                                member={item.members[0].id._id===props.user?
                                    item.members[1].id.userName:
                                    item.members[0].id.userName}
                                memberId={item.members[0].id._id===props.user?
                                    item.members[1].id._id:
                                    item.members[0].id._id}
                                img={`${process.env.REACT_APP_BE_SERVER}/picture/${item.members[1].id._id}`}
                                sethide={setHide} token={props.token}/>}/>
                        ))} 
                    </Routes>   
                    {!hide&&                    
                    chats.map(item=>(
                        <div key={item._id} >
                            <NavLink key={item._id} to={item._id} className="chatOV">
                                <img className="img2" 
                                src={item.members[1].id.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.members[1].id._id}`:exmpl}/>
                                <div className="author">{item.members[0].id._id===props.user?item.members[1].id.userName:item.members[0].id.userName}</div>
                            </NavLink>
                            <button className={isFriend(
                                    item.members[0].id._id===props.user?item.members[1].id._id:item.members[0].id._id,friends
                                    )+" btn1"} onClick={()=>addFriend(
                                        item.members[0].id._id===props.user?item.members[1].id._id:item.members[0].id._id,friends,props.token,setFriends
                                        )}><FaUserFriends/></button>
                        </div>
                    ))}
                </>)
                :<img src={logo} id="henriksLoadingAnimation" />
            }
            </section>
        </article>
    )
}