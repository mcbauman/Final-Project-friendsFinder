import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {checkFriends} from "../components/functions";
import { useState, useEffect } from 'react';

export default function Start(props){
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const notify = () => toast("Wow so easy!");
    const topicNotify = () => toast("Topic is saved!")
    const [forum, setForum] = useState([])

    function wakeUpServer(){
        axios.get(`${process.env.REACT_APP_BE_SERVER}/`)
            .then(res => {
                console.log("SEVER IS UP")
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    useEffect(() => {
        requestForum()
    }, [])
    
    function requestForum(){
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.get(`${process.env.REACT_APP_BE_SERVER}/forum`, {headers})
            .then(res => {
                console.log(res)
                setForum(res)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }

    function declareTopic(e){
        e.preventDefault()
        const data = {author:props.user, content, subject }
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.post(`${process.env.REACT_APP_BE_SERVER}/subject/create`,data, {headers})
        .then(res => topicNotify())
        .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    
    return(
        <article>
            Forum:
            <section id="forum">
                <form onSubmit={declareTopic}>
                    <input type="text" placeholder='subject' onChange={e => setSubject(e.target.value)}/>
                    <textarea type="text" placeholder='Input your ideas...' onChange={e => setContent(e.target.value)}/>
                    <button type='submit'>Submit</button>
                </form>
                <hr />
                <div className="forumList">
                    <div>{subject}</div>
                    <div>{content}</div>
                </div>
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