import axios from "axios"
import { useState, useEffect } from "react"
import React from "react";


export default function Messages(props){
    const [allMsg, setAllMsg] = useState([])
    const [vis,setVis]=useState(false)
    const [subject,setSubject]=useState("")
    const [content,setContent]=useState("")
    
    function requestMessages(){
        const headers = { Authorization: `Bearer ${props.token}` }
    
        axios.get("http://localhost:9000/message/find", {headers})
            .then(res => setAllMsg(res.data))
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    useEffect(() => {
        requestMessages()
    }, [])

    function writeMessage(id){
        setVis(vis?0:id)
        if(vis&&subject.length>1){
            const headers = { Authorization: `Bearer ${props.token}` }
            const data={subject,content,author:props.user,recipient:id}
            axios.post("http://localhost:9000/message/create",data, {headers})
                .then(res => {
                    setSubject("")
                    setContent("")
                })
                .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
    }

    return(
        <article>
            MESSAGES
            <section id="messages">
                {allMsg.map(item=>(
                    <div key={item._id} className="ProfileCard">
                        <div>{item.author}</div>
                        <div>{item.subject}</div>
                        <div>{item.content}</div>
                        <form className={vis===item._id?"show":"hide"}>
                            <input type="text" placeholder="subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                            <input type="text" placeholder="your text" value={content} onChange={(e)=>setContent(e.target.value)}/>
                        </form>
                        <button onClick={()=>writeMessage(item._id)}>send Message</button>
                    </div>
                ))}
            </section>
        </article>
    )
}