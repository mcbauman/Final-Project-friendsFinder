import { useEffect } from "react";
import { useState } from "react";
import {FaHandshake} from "react-icons/fa"
import {MdOutlineEmail} from "react-icons/md";
import {CgCloseR} from "react-icons/cg"
import {NavLink} from "react-router-dom";
import axios from "axios"
import {isFriend,checkFriends,addFriend} from "../components/functions";
import logo from "../components/COF.png";
import exmpl from "../components/exmpl.jpeg"
import {toast, ToastContainer} from "react-toastify";
const notifyFeedback = (text) => toast(text);

export default function Chatview(props){
    const [messages,setMessages]=useState()
    const [content,setContent]=useState("")
    const [friends,setFriends]=useState([])

    function requestMessages(){
    const headers = { Authorization: `Bearer ${props.token}` }
    const body={chatId:props.itemKey}
    axios.post(`${process.env.REACT_APP_BE_SERVER}/messages`,body,{headers})
        .then(res => {
            setMessages(res.data)
            console.log(res.data);
            checkFriends(props.token,setFriends)
        })
        .catch(error => {
            if(error.response.data.error.message=="jwt expired"){
                localStorage.removeItem("token")
                props.setToken(null)
            }
            console.log(error)})
    }
    function sendMessage(e){
        e.preventDefault()
        if(content.length>1){
            const headers = { Authorization: `Bearer ${props.token}` }
            const data={content,user:props.user,recipient:props.memberId}
            console.log(data);
            axios.post(`${process.env.REACT_APP_BE_SERVER}/chats`,data, {headers})
                .then(res => {
                    setContent("")
                    requestMessages()
                    notifyFeedback(`Your message was send`)
                })
                .catch(error => notifyFeedback(error.response.data.error[0].content || "Unknown error"))
        }
    }

    props.sethide(true)
    useEffect(()=>{
        requestMessages()
    },[])

    return(
        <section className="cMessages">
            <span>
                <img src={props.img?props.img:exmpl} alt="UserProfile" />
                <div id="name">{props.member}</div>
                <button 
                    className={isFriend(props.memberId,friends)+" btn1"} 
                    onClick={()=>addFriend(props.memberId,props.token,setFriends)}>
                    <FaHandshake/>
                </button>
                <NavLink onClick={()=>props.sethide(false)} to="/Chats">
                    <button className="bntX"><CgCloseR/></button>  
                </NavLink> 
            </span> 
            <form>
                <input type="text" placeholder="your text" value={content} 
                onChange={(e)=>setContent(e.target.value)} 
                className="maxW"/>
                <button onClick={sendMessage} className="btn2">
                <MdOutlineEmail/></button>
            </form>
            {messages?(<div id="chat">
                {messages.map(item=>(
                    <div key={item._id} className={item.user==props.user?"right flex":"left flex"}>
                        <div className= "profileText">{item.content}</div>
                    </div>
                ))}
            </div>)
            :<img src={logo} id="henriksLoadingAnimation" />}
            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </section>
    )
}
