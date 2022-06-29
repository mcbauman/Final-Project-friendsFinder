import { useEffect } from "react";
import { useState } from "react";
import {IoIosCloseCircleOutline} from "react-icons/io"
import {FaUserFriends} from "react-icons/fa"
import {MdCardMembership, MdCleaningServices, MdOutlineEmail} from "react-icons/md";
import {NavLink} from "react-router-dom";
import axios from "axios"
import {isFriend,checkFriends,addFriend} from "../components/functions";
import {Context}from "../components/context"
import {useContext} from "react";
import logo from "../components/COF.png";
import {toast, ToastContainer} from "react-toastify";
const notifyFeedback = (text) => toast(text);

export default function Chatview(props){
    const [messages,setMessages]=useState()
    const [content,setContent]=useState("")
    const [friends,setFriends]=useState([])
    const {hide,setHide}=useContext(Context)

//    console.log("PROPS",props);

    function requestMessages(){
    const headers = { Authorization: `Bearer ${props.token}` }
    const body={chatId:props.itemKey}
    axios.post(`${process.env.REACT_APP_BE_SERVER}/messages`,body,{headers})
        .then(res => {
            setMessages(res.data)
            console.log(res.data);
        })
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
                .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
    }
    
    props.sethide(true)
    useEffect(()=>{
        requestMessages()
    },[])

    return(
        <div className="cMessages">
            <img src="props.img" alt="UserProfile" />
            <div id="name">{props.member}</div>
            <NavLink onClick={()=>props.sethide(false)} to="/Chats">
                <IoIosCloseCircleOutline/></NavLink>
            <button className={" btn1"}>
                <FaUserFriends/></button>
            <form>
                <input type="text" placeholder="your text" value={content} 
                onChange={(e)=>setContent(e.target.value)}/>
                <button onClick={sendMessage} className="btn2">
                <MdOutlineEmail/></button>
            </form>
            {messages?(<div id="chats">
                {messages.map(item=>(
                    <div className={item.user==props.user?"right flex":"left flex"}>
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
        </div>
    )
}
