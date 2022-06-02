import React from 'react';
import Activities from "../ActivitiesArray";
import Select from 'react-select';
import {useState} from "react";
import axios from "axios";
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
    
    function submitFunction(e){
        e.preventDefault()
        const headers = { Authorization: `Bearer ${props.token}` }
        const body={interests,minAge,maxAge,srchdGender}
        body.interests=body.interests.map(item=>item.value)
        axios.post("http://localhost:9000/user/find", body,{headers})
            .then(res => {
                setListOfUser(res.data)
                console.log("SEARCH RES.DATA l24",res.data)
            })
            .catch(error => alert(error.response?.data?.error || "Unknown error"))
    }
    
    function writeMessage(id){
        setVis(vis?false:true)
        if(vis){
            const headers = { Authorization: `Bearer ${props.token}` }
            const data={subject,content,author:props.user,recipient:id}
            axios.post("http://localhost:9000/message/create",data, {headers})
                .then(res => console.log(res.data))
                .catch(error => alert(error.response?.data?.error || "Unknown error"))
        }
    }
    
    return(
        <article>
            SEARCH
            <form onSubmit={submitFunction}>
                <Select onChange={setInterests} closeMenuOnSelect={false} isMulti options={options}/>
                <input type="text" onChange={(e)=>setMinAge(e.target.value||0)} placeholder="minimum Age"/>
                <input type="text" onChange={(e)=>setMaxAge(e.target.value||150)} placeholder="maximum age"/>
                <select onChange={(e)=>setSrchdGender(e.target.value)}>
                    <option>any</option>
                    <option>male</option>
                    <option>female</option>
                    <option>diverse</option>
                </select>
                <button type="submit">search</button>
            </form>
            <section>
                {listOfUsers.map(item=>(
                        <div key={item._id} className="ProfileCard">
                            <div>{item.name}</div>
                            <div>{item.familyName}</div>
                            <div>{item.gender}</div>
                            <div>{item.age}</div>
                            <div>{item.userName}</div>
                            <form className={vis?"show":"hide"}>
                                <input type="text" placeholder="subject" onChange={(e)=>setSubject(e.target.value)}/>
                                <input type="text" placeholder="your text" onChange={(e)=>setContent(e.target.value)}/>
                            </form>
                            <button onClick={()=>writeMessage(item._id)}>send Message</button>
                        </div>
                ))}
            </section>

        </article>
    )
}