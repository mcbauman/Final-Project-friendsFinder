import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";
import exmpl from "../components/exmpl.jpeg"
import {FaUserFriends} from "react-icons/fa"
import {MdOutlineEmail} from "react-icons/md";
import {isFriend,checkFriends,addFriend} from "../components/functions";

export default function Messages(props){
    const [allMsg, setAllMsg] = useState([])
    const [vis,setVis]=useState(false)
    const [subject,setSubject]=useState("")
    const [content,setContent]=useState("")
    const [friends,setFriends]=useState([])
    
    function requestMessages(){
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.get(`${process.env.REACT_APP_BE_SERVER}/message/find`, {headers})
            .then(res => {
                setAllMsg(res.data)
                console.log(res.data)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    useEffect(() => {
        requestMessages()
        checkFriends(props.token,setFriends)
    }, [])

    function writeMessage(id,author){
        setVis(vis?0:id)
        if(vis&&subject.length>1){
            const headers = { Authorization: `Bearer ${props.token}` }
            const data={subject,content,author:props.user,recipient:author}
            axios.post(`${process.env.REACT_APP_BE_SERVER}/message/create`,data, {headers})
                .then(res => {
                    setSubject("")
                    setContent("")
                    requestMessages()
                })
                .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
    }
    
    return(
        <article>
            {allMsg&&allMsg.length?(
            <section id="messages">
                {allMsg.map(item=>(
                    <div key={item._id} className="messages">
                        <img className="img2" src={item.author.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.author.profilePicture}`:exmpl}/>
                        <div className="author">{item.author.userName}</div>
                        <div className="subject">{item.subject}</div>
                        <button className={isFriend(item.author._id,friends)+" btn1"} onClick={()=>addFriend(item.author._id,props.token,setFriends)}><FaUserFriends/></button>
                        <button className="btn2" onClick={()=>writeMessage(item._id,item.author._id)}><MdOutlineEmail/></button>
                        <form className={vis===item._id?"show":"hide"}>
                            <input type="text" placeholder="subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                            <input type="text" placeholder="your text" value={content} onChange={(e)=>setContent(e.target.value)}/>
                        </form>
                        <div className="profileText">{item.content}</div>
                    </div>
                ))}
            </section>):<div class="loadingio-spinner-ripple-jjyczsl43u"><div class="ldio-qydde5o934a"><div></div><div></div></div></div>}
        </article>
    )
}