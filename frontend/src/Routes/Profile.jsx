import {useEffect, useState} from "react";
import Activities from "../ActivitiesArray";
import axios from "axios";
import Select from "react-select";
import {MdOutlineDeleteForever} from "react-icons/md";
import exmpl from "../exmpl.jpeg";
import React from "react";

export default function Profile(props){
    const [file, setFile] = useState(null)
    const [usr,setUsr]=useState(null)
    const [interests,setInterests]=useState()
    
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
    
    //                    <textarea value={usr.profileText} onChange={(e)=>setUsr(prevState=>({
    //                         ...prevState,[e.target.name]:e.target.value
    //                     }))}/>
    
    function updateValue(e){
        console.log(e.target.value)
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
                <form>
                    <input type="text" placeholder="name" value={usr.name}  onChange={updateValue}/>
                    <input type="text" placeholder="family name" value={usr.familyName}  onChange={updateValue}/>
                    <input type="email" placeholder="@" value={usr.email}  onChange={updateValue}/>
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="password" />
                    <textarea value={usr.profileText} onChange={updateValue}/>
                    <hr/>
                    <Select onChange={setInterests} closeMenuOnSelect={false}  isMulti options={Activities} defaultValue={usr.interests}/>
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