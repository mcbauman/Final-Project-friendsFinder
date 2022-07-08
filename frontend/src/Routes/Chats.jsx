import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";
import exmpl from "../components/exmpl.jpeg"
import {FaHandshake} from "react-icons/fa"
import {isFriend,checkFriends,addFriend} from "../components/functions";
import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Chatview from "./Chatview";
import {Context}from "../components/context"
import {useContext} from "react";
import logo from "../components/COF.png";
import "../components/Chat.scss";

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
        .catch(error => {
            if(error.response.data.error.message=="jwt expired"){
                localStorage.removeItem("token")
                props.setToken(null)
            }
            console.log(error)})
    }

    useEffect(()=>{
        loadChats() 
        setHide(false)
        checkFriends(props.token,setFriends)
    },[])

    chats.forEach(item=>{
        if(item.members[0].id._id===props.user){
            item.self=item.members[0].id;
            item.other=item.members[1].id
        }else{
            item.self=item.members[1].id;
            item.other=item.members[0].id
        }
    })

    console.log(chats);

    return(
        <article id="chats">
            {chats&&chats.length?(
                <>
                    <Routes> 
                        {chats.map(item=>(
                            <Route key={item._id} path={item._id} element={<Chatview  
                                itemKey={item._id} user={props.user} 
                                member={item.other.userName}
                                memberId={item.other._id}
                                img={item.other.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.other.profilePicture}`:null}
                                sethide={setHide} token={props.token}/>}/>
                        ))} 
                    </Routes>   
                    {!hide&&                    
                    chats.map(item=>(
                        <section key={item._id}>
                            <NavLink key={item._id} to={item._id}>
                                <img className="img2" 
                                src={item.other.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.other.profilePicture}`:exmpl}/>
                                <div className="author">{item.other.userName}</div>
                            </NavLink>
                            <button className={isFriend(
                                item.other._id,friends
                                )+" btn1"} onClick={()=>addFriend(
                                    item.other._id,props.token,setFriends
                                    )}><FaHandshake/></button>
                        </section>
                    ))}
                </>)
                :<img src={logo} id="henriksLoadingAnimation" />
            }
        </article>
    )
}