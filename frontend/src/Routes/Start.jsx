import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {checkFriends} from "../components/functions";
import { useState, useEffect } from 'react';
import {MdLogin} from "react-icons/md"
import exmpl from "../components/exmpl.jpeg"

export default function Forum(props){
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const notify = () => toast("Wow so easy!");
    const topicNotify = () => toast("Topic is saved!")
    const [forum, setForum] = useState(null)
    const [hidden, setHidden] = useState("hide")
    const [comment, setComment] = useState("")

    function wakeUpServer(){
        axios.get(`${process.env.REACT_APP_BE_SERVER}/`)
            .then(res => {
                console.log("SEVER IS UP")
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    useEffect(() => {
        wakeUpServer()
    }, [])
    
    useEffect(() => {
        getForum()
    },[])

    function getForum(){
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.get(`${process.env.REACT_APP_BE_SERVER}/forum`, {headers})
            .then(res => {
                const dt = res.createdAt
                const d = new Date();
                // date = d.getMonth()
                // date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
                console.log( d.toDateString());
                setForum(res.data)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
  
    function declareTopic(e){
        e.preventDefault()
        const data = { author:props.user, content, subject }
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.post(`${process.env.REACT_APP_BE_SERVER}/forum`,data, {headers})
        .then(res => {
            getForum()
            topicNotify()
        })
        .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }

    wakeUpServer()

    function handleComment(e){
        e.preventDefault()

        setHidden("hide")
    }
    
    return(
        <article>
            Forum:
            <section id="forum">
                <form onSubmit={declareTopic}>
                    <input type="text" placeholder='subject' onChange={e => setSubject(e.target.value)}/>
                    <textarea type="text" placeholder='Input your ideas...' onChange={e => setContent(e.target.value)}/>
                    <button type='submit'><MdLogin/></button>                  
                </form>
                <hr />
                    {forum&&forum.length?(forum.map(item => 
                        <div key={item._id} className="forum" onClick={() => setHidden("show")} >
                            <img src={item.author.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.author.profilePicture}`:exmpl}/>
                            <div><span>Created by: </span>{item.author.userName}</div>
                            <div><span>Created at: </span>{new Date(item.createdAt).toLocaleDateString()}</div>
                            <div className='subj'><span>Subject: </span>{item.subject}</div>
                            <div className='cont'>{item.content}</div>
                            <form onSubmit={handleComment}>
                                <input className={hidden} onChange={(e)=> setComment(e.target.value)} placeholder='Leave comment' />
                                <button className={hidden} type="submit" >Submit your comment</button>
                            </form>
                            <div> {comment} </div>
                            <br />
                        </div>
                    )):<div className="loadingio-spinner-ripple-jjyczsl43u"><div className="ldio-qydde5o934a"><div></div><div></div></div></div>}
            </section>
            
            <br />
            <button onClick={notify}>Notify!</button>
                <ToastContainer position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover/>


        </article>
    )
}