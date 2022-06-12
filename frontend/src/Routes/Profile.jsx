import {useEffect, useState} from "react";
import Activities from "../components/ActivitiesArray";
import axios from "axios";
import Select from "react-select";
import {MdOutlineDeleteForever,MdOutlineSaveAlt} from "react-icons/md";
import exmpl from "../components/exmpl.jpeg";
import React from "react";
import {Context}from "../components/context"
import trans from "../components/trans";
import {useContext} from "react";

export default function Profile(props){
    const [file, setFile] = useState(null)
    const [name,setName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [userName, setUserName]=useState("")
    const [interests,setInterests]=useState([])
    const [profileText,setProfileText]=useState("")
    const {lang,setLang}=useContext(Context)
    const {theme,setTheme}=useContext(Context)
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
    function changeProfile(e){
        e.preventDefault()
        const sendInterests=interests.length>1?interests.map(item=>item.value):usr.interests.map(item=>item.value);
        const body={
            name:name?name:usr.name,
            familyName:familyName?familyName:usr.familyName,
            email:email?email:usr.email,
//            password:password?password:null,
            userName:userName?userName:usr.userName,
            profileText:profileText?profileText:usr.profileText,
            interests:sendInterests
        }
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.put(`${process.env.REACT_APP_BE_SERVER}/user/updateProfile`,body,{headers})
            .then(result=> {
                alert("changed User to",result.data)
            })
            .catch(error => console.log(error))
    }
    function setDefaults(e){
        e.preventDefault()
        localStorage.setItem("theme",JSON.stringify(theme))
        localStorage.setItem("lang",JSON.stringify(lang))
        const body2={theme,lang,email:usr.email}
        const headers = { Authorization: `Bearer ${props.token}`}
        axios.put(`${process.env.REACT_APP_BE_SERVER}/user/updateProfile`,body2,{headers})
            .then(result=> {
                alert("changed User to",result.data)
            })
            .catch(error => console.log(error))
    }
    
    //Load Default of Theme and Lang into the Select
    //delete the props.theme
    
    return(
        <article>
            <section>
                <form onSubmit={setDefaults}>
                    {trans[lang].Theme}:
                    <select value={theme} onChange={(e)=>setTheme(e.target.value)}>
                        <option>BW</option>
                        <option>red</option>
                        <option>blue</option>
                        <option>green</option>
                    </select>
                    {trans[lang].language}:
                    <select value={lang} onChange={(e)=>setLang(e.target.value)}>
                        <option value="de">🇩🇪</option>
                        <option value="en">🇬🇧</option>
                    </select>
                    <button type="submit"><MdOutlineSaveAlt/></button>
                </form>
                <hr/>
                <form>
                    <input id="fileSelector" type="file" onChange={handleSelectedFile} />
                    <button onClick={saveFile}><MdOutlineSaveAlt/></button>
                    {props.userProfPic&&<img src={`${process.env.REACT_APP_BE_SERVER}/picture/${props.userProfPic}`} alt="Ups, no picture;)"/>}
                </form>
            </section>
            <hr/>
            <section>
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
                        {trans[lang].YoureFriends}:
                        {usr.friends.map(item=>(
                            <div className="friendsView" id={item.userName}>
                                <img src={item.profilePicture?`${process.env.REACT_APP_BE_SERVER}/picture/${item.profilePicture}`:exmpl}/>
                                <div>{item.userName}</div>
                                <button><MdOutlineDeleteForever/></button>
                                <hr/>
                            </div>
                        ))}
                    </form>
                ):<div>LOADING</div>}
            </section>
        </article>
    )
}