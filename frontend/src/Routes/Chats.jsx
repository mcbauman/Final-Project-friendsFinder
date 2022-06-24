import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";
import exmpl from "../components/exmpl.jpeg"
import {FaUserFriends} from "react-icons/fa"
import {MdCardMembership, MdOutlineEmail} from "react-icons/md";
import {isFriend,checkFriends,addFriend} from "../components/functions";
import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Chatview from "./Chatview";
import {Context}from "../components/context"
import {useContext} from "react";
import logo from "../components/COF.png";

export default function Messages(props){
    const [chats, setChats] = useState([])
    const [resDat,setResDat]=useState(false)
    const [friends,setFriends]=useState([])
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
            // console.log("ITEM:MEMBER",item.members)
            // console.log("ITEM.MEMBER[0]",item.members[0])
            // console.log("ITEM.MEMBER[1]",item.members[1])
            // console.log(item.members[0].id)
            console.log(item.members[0].id.userName)
            console.log(item.members[0].id._id)
            console.log(item.members[1].id.userName)
            console.log(item.members[1].id._id)
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
                :<img src={logo} id="henriksLoadingAnimation" />
            }
            </section>
        </article>
    )
}
//     function requestMessages(){
//         const headers = { Authorization: `Bearer ${props.token}` }
//         axios.get(`${process.env.REACT_APP_BE_SERVER}/chat/find/incoming`, {headers})
//             .then(res => {
//                 const data2=res.data.map(item=>item={...item,type:"incoming"})
//                 setInMsg(data2)
//             })
//             .catch(error => alert(error.response?.data?.error || "Unknown error"))
//         axios.get(`${process.env.REACT_APP_BE_SERVER}/chat/find/send`, {headers})
//             .then(res => {
//                 const data2=res.data.map(item=>item={...item,type:"outgoing"})
//                 setOutMsg(data2)
//                 setResDat(true)
//             })
//             .catch(error => alert(error.response?.data?.error || "Unknown error"))
//     }

//     useEffect(() => {
//         requestMessages()
//         checkFriends(props.token,setFriends)
//     }, [])
    
//     if(resDat){
//         setAllMsg(inMsg.concat(outMsg))
//         setResDat(false)
//     }
    
//     function writeMessage(id,author){
//         setVis(vis?0:id)
//         if(vis&&content.length>1){
//             const headers = { Authorization: `Bearer ${props.token}` }
//             const data={content,author:props.user,recipient:author}
//             axios.post(`${process.env.REACT_APP_BE_SERVER}/message/create`,data, {headers})
//                 .then(res => {
//                     setContent("")
//                     requestMessages()
//                 })
//                 .catch(error => alert(error.response?.data?.error || "Unknown error"))
//         }
//     }

//     console.log(allMsg)
//     return(
//         <article>
//             {allMsg&&allMsg.length?(
//                 <section id="messages">
//                     {allMsg.map(item=>(
//                         <div key={item._id} className="messages">
//                             <img className="img2" src={item.member.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.member.profilePicture}`:exmpl}/>
//                             <div className="author">{item.member.userName?item.member.userName:item.user.userName}</div>
//                             <button className={isFriend(item.member._id,friends)+" btn1"} onClick={()=>addFriend(item.member._id,props.token,setFriends)}><FaUserFriends/></button>
//                             <button className="btn2" onClick={()=>writeMessage(item._id,item.member._id)}><MdOutlineEmail/></button>
//                             <form className={vis===item._id?"show":"hide"}>
//                                 <input type="text" placeholder="your text" value={content} onChange={(e)=>setContent(e.target.value)}/>
//                             </form>
//                             <div className="profileText">{item.content}</div>
//                         </div>
//                     ))}
//                 </section>):<div>LOADING</div>}
//         </article>
//     )
// }