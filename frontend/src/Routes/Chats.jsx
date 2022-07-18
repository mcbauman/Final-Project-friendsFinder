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
    const {hide,setHide, newMessageNotification, setNewMessageNotification}=useContext(Context)

    function loadChats(){
    const headers = { Authorization: `Bearer ${props.token}` }
    axios.get(`${process.env.REACT_APP_BE_SERVER}/chats`, {headers})
        .then (res=>{
            // res.data.forEach(item=>{
            //     if(!item.redBy.includes(props.user)){
            //         setNewMessageNotification(...newMessageNotification, item._id)
            //     }
            // })
           
            console.log(res.data)
            console.log(res.data[1].members[1].id.userName);
            setChats(res.data)
        })
        .catch(error => {
            if(error.response.data.error.message=="jwt expired"){
                localStorage.removeItem("token")
                props.setToken(null)
            }
            console.log(error)})
    }

    // function findMessageCreator(){
    //     let messageLength = 0
    //     const headers = { Authorization: `Bearer ${props.token}` }
    //     const body={chatId:chats} // HERE need to find right ID!!!!!!!!!!!!!!!!!!!!
    //     axios.post(`${process.env.REACT_APP_BE_SERVER}/chats/notification`,body,{headers})
    //     .then(res => {
    //         if(res.data.length > messageLength){
    //             setNewMessageNotification(true)
    //             messageLength = res.data.length
    //         }
    //         console.log(res.data);
    //     })
    //     .catch(error => {
    //         if(error.response.data.error.message=="jwt expired"){
    //             localStorage.removeItem("token")
    //             props.setToken(null)
    //         }
    //         console.log(error)})
    // }

    useEffect(()=>{
        loadChats() 
        setHide(false)
        checkFriends(props.token,setFriends)
        // findMessageCreator()
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
                        <section onClick={()=> setNewMessageNotification(false)} key={item._id}>
                            <NavLink key={item._id} to={item._id}>
                                <img className="img2" 
                                src={item.other.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.other.profilePicture}`:exmpl}/>
// unread style given by class name = newMessage (isNewMessageCame: is used, newMessageNotification: is not used)
                                <div className={"author" + (item.redBy.includes(props.user)? "" : " newMessage")}>{item.other.userName}</div> 
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