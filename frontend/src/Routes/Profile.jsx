import {useEffect, useState} from "react";
import Activities from "../ActivitiesArray";
import axios from "axios";
import Select from "react-select";
import {MdOutlineDeleteForever,MdOutlineSaveAlt} from "react-icons/md";
import exmpl from "../exmpl.jpeg";
import React from "react";

export default function Profile(props){
    const [file, setFile] = useState(null)
    const [name,setName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [userName, setUserName]=useState("")
    const [interests,setInterests]=useState([])
    const [profileText,setProfileText]=useState("")

    const [usr,setUsr]=useState(null)
    
    function handleSelectedFile(e){
        setFile(e.target.files[0]) // we use [] because key is a number here.
    }
    function saveFile(e){
        if(!file){return alert("Select a file first:)")}
        const formData = new FormData()
        formData.append("selectedFile", file)
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.post(`${process.env.REACT_APP_BE_SERVER}/picture/createPicture`, formData, {headers} )
            .then(result =>  props.setUserProfPic(result.data._id))
            .catch(error => console.log(error))
    }
    function loadUser(){
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.get(`${process.env.REACT_APP_BE_SERVER}/user/updateProfile`,{headers})
            .then(result=> {
                result.data.interests=result.data.interests.map(item=>({"value":item,"label":item}))
                setUsr(result.data)
            })
            .catch(error => console.log(error))
    }
    useEffect(()=>loadUser(),[])
    usr?(console.log(usr.friends)):console.log(usr)
    
    function changeProfile(e){
        e.preventDefault()
        const sendInterests=interests?interests.map(item=>item.value):usr.interests;
        const body={
            name:name?name:usr.name,
            familyName:familyName?familyName:usr.familyName,
            email:email?email:usr.email,
//            password:password?password:null,
            userName:userName?userName:usr.userName,
            interests:sendInterests
        }
        console.log("BODY TO SEVER",body)
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.put(`${process.env.REACT_APP_BE_SERVER}/user/updateProfile`,body,{headers})
            .then(result=> {
                alert("changed User to",result.data)
            })
            .catch(error => console.log(error))
    }
    
    return(
        <article>
            PROFILE
            <select value={props.theme} onChange={(e)=>props.setTheme(e.target.value)}>
                <option>BW</option>
                <option>red</option>
                <option>blue</option>
                <option>green</option>
            </select>
            <input type="file" onChange={handleSelectedFile} />
            <button onClick={saveFile}>Save Picture</button>
            {props.userProfPic&&<img src={`${process.env.REACT_APP_BE_SERVER}/picture/${props.userProfPic}`} alt="Ups, no picture;)"/>}
            <hr/>
            {usr?(
                <form onSubmit={changeProfile}>
                    <input type="text" placeholder={usr.name} value={name}  onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder={usr.familyName} value={familyName}  onChange={(e)=>setFamilyName(e.target.value)}/>
                    <input type="email" placeholder={usr.email} value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                    <textarea placeholder={usr.profileText} value={profileText} onChange={(e)=>setProfileText(e.target.value)}/>
                    <hr/>
                    <Select onChange={setInterests} closeMenuOnSelect={false}  isMulti options={Activities} defaultValue={usr.interests}/>
                    <button type="submit"><MdOutlineSaveAlt/></button>
                    <hr/>
                    {usr.friends.map(item=>(
                        <div>
                            <img src={item.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.profilePicture}`:exmpl}/>
                            <div>{item.userName}</div>
                            <button><MdOutlineDeleteForever/></button>
                            <hr/>
                        </div>
                        ))}
                </form>
                ):<div>LOADING</div>
            }
        </article>
    )
}