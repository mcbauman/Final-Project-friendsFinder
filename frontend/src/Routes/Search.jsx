import React, {useEffect} from 'react';
import Activities from "../ActivitiesArray";
import Select from 'react-select';
import {useState} from "react";
import axios from "axios";
import {FaUserFriends} from "react-icons/fa"
import {MdOutlineEmail,MdSearch} from "react-icons/md";
import exmpl from "../exmpl.jpeg"
import {isFriend,checkFriends,addFriend} from "../functions";
import Log from "../Log";

export default function Search(props){
    const [listOfUsers, setListOfUser]=useState([])
    const [interests,setInterests]=useState([])
    const [minAge,setMinAge]=useState(0)
    const [maxAge,setMaxAge]=useState(150)
    const [srchdGender,setSrchdGender]=useState("any")
    const options=Activities
    const [vis,setVis]=useState(false)
    const [subject,setSubject]=useState("")
    const [content,setContent]=useState("")
    const [friends,setFriends]=useState([])
    
    function requestServer(){
        const body={interests,minAge,maxAge,srchdGender}
        const headers = { Authorization: `Bearer ${props.token}` }
        body.interests=body.interests.map(item=>item.value)
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/find`, body,{headers})
            .then(res => {
                setListOfUser(res.data)
                console.log("SEARCH RES.DATA l24",res.data)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
        checkFriends(props.token,setFriends)
    }
    
    useEffect(()=>{
        requestServer()
    },[])
    
    function submitFunction(e){
        e.preventDefault()
        requestServer()
    }
    
    function writeMessage(id){
        setVis(vis?0:id)
        if(vis&&subject.length>1){
            const headers = { Authorization: `Bearer ${props.token}` }
            const data={subject,content,author:props.user,recipient:id}
            axios.post(`${process.env.REACT_APP_BE_SERVER}/message/create`,data, {headers})
                .then(res => {
                    setSubject("")
                    setContent("")
                })
                .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
    }
    
    return(
        <article>
            SEARCH
            <form onSubmit={submitFunction}>
                <Select onChange={setInterests} closeMenuOnSelect={false} isMulti options={options}/>
                <input type="text" onChange={(e)=>setMinAge(e.target.value||0)} placeholder="min age"/>
                <input type="text" onChange={(e)=>setMaxAge(e.target.value||150)} placeholder="max age"/>
                <select onChange={(e)=>setSrchdGender(e.target.value)}>
                    <option>any</option>
                    <option>♂️</option>
                    <option>♀️</option>
                    <option>⚧</option>
                </select>
                <button type="submit"><MdSearch/></button>
            </form>
            <section id="messages">
                {listOfUsers.map(item=>(
                        <div key={item._id} className="ProfileCard">
                            <div>
                                <div className="profileHeader">
                                    <img src={item.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.profilePicture}`:exmpl}/>
                                    <div className="searchDivUserName">{item.userName}</div>
                                    <div>{item.gender}</div>
                                    <div>{item.age}</div>
                                    <button className={isFriend(item._id,friends)} onClick={()=>addFriend(item._id,props.token,setFriends)}><FaUserFriends/></button>
                                    {console.log(item.profilePicture)}
                                    <button onClick={()=>writeMessage(item._id)}><MdOutlineEmail/></button>
                                </div>
                                <div className="profileText">{item.profileText}</div>
                            </div>
                            <form className={vis===item._id?"show":"hide"}>
                                <input type="text" placeholder="subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                                <input type="text" placeholder="your text" value={content} onChange={(e)=>setContent(e.target.value)}/>
                            </form>
                            
                        </div>
                ))}
            </section>
        </article>
    )
}