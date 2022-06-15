import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";
import exmpl from "../components/exmpl.jpeg"
import {FaUserFriends} from "react-icons/fa"
import {MdOutlineEmail} from "react-icons/md";
import {isFriend,checkFriends,addFriend} from "../components/functions";

export default function Messages(props){
    const [inMsg,setInMsg]=useState([])
    const [outMsg, setOutMsg]=useState([])
    const [allMsg, setAllMsg] = useState([])
    const [resDat,setResDat]=useState(false)
    const [vis,setVis]=useState(false)
    const [content,setContent]=useState("")
    const [friends,setFriends]=useState([])

    function requestMessages(){
        const headers = { Authorization: `Bearer ${props.token}` }
        axios.get(`${process.env.REACT_APP_BE_SERVER}/chat/find/incoming`, {headers})
            .then(res => {
                const data2=res.data.map(item=>item={...item,type:"incoming"})
                setInMsg(data2)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
        axios.get(`${process.env.REACT_APP_BE_SERVER}/chat/find/send`, {headers})
            .then(res => {
                const data2=res.data.map(item=>item={...item,type:"outgoing"})
                setOutMsg(data2)
                setResDat(true)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }

    useEffect(() => {
        requestMessages()
        checkFriends(props.token,setFriends)
    }, [])
    
    if(resDat){
        setAllMsg(inMsg.concat(outMsg))
        setResDat(false)
    }
    
    function writeMessage(id,author){
        setVis(vis?0:id)
        if(vis&&content.length>1){
            const headers = { Authorization: `Bearer ${props.token}` }
            const data={content,author:props.user,recipient:author}
            axios.post(`${process.env.REACT_APP_BE_SERVER}/message/create`,data, {headers})
                .then(res => {
                    setContent("")
                    requestMessages()
                })
                .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
    }

    console.log(allMsg)
    return(
        <article>
            {allMsg&&allMsg.length?(
                <section id="messages">
                    {allMsg.map(item=>(
                        <div key={item._id} className="messages">
                            <img className="img2" src={item.member.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.member.profilePicture}`:exmpl}/>
                            <div className="author">{item.member.userName?item.member.userName:item.user.userName}</div>
                            <button className={isFriend(item.member._id,friends)+" btn1"} onClick={()=>addFriend(item.member._id,props.token,setFriends)}><FaUserFriends/></button>
                            <button className="btn2" onClick={()=>writeMessage(item._id,item.member._id)}><MdOutlineEmail/></button>
                            <form className={vis===item._id?"show":"hide"}>
                                <input type="text" placeholder="your text" value={content} onChange={(e)=>setContent(e.target.value)}/>
                            </form>
                            <div className="profileText">{item.content}</div>
                        </div>
                    ))}
                </section>):<div>LOADING</div>}
        </article>
    )
}