import axios from "axios"
import { useState, useEffect } from "react"


export default function Messages(props){
    const [allMsg, setAllMsg] = useState([])
    
function requestMessages(){
    const headers = { Authorization: `Bearer ${props.token}` }

    axios.get("http://localhost:9000/message/find", {headers})
        .then(res => setAllMsg(res.data))
        .catch(error => alert(error.response?.data?.error || "Unknown error"))
}
useEffect(() => {
    requestMessages()
}, [])
console.log(allMsg);

    return(
        <article>
            MESSAGES
            <section id="messages">
                {allMsg.map(item => (
                <div key={item._id}> 
                    <div> {item.author.userName}</div>
                    <div> {item.name}</div>
                    <div> {item.subject}</div>
                    <div> {item.content}</div>
                </div>
                ))} 
            </section>

        </article>
    )
}