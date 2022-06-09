import { useState } from "react";
import Activities from "../ActivitiesArray";
import axios from "axios";
import Select from "react-select";
import {MdOutlineDeleteForever} from "react-icons/md";

export default function Profile(props){
    const [file, setFile] = useState(null)
    console.log(props)
    function handleSelectedFile(e){
        setFile(e.target.files[0]) // we use [] because key is a number here.
        console.log(e.target.files);
        console.log(e.target.files[0]);
    }
    function saveFile(e){
        // const [picture, setPicture ] = useState(null)
        if(!file){
            return alert("Select a file first:)")
        }
        const formData = new FormData()
        formData.append("selectedFile", file)
        const headers = { Authorization: `Bearer ${props.token}`}
        const config = {headers}
        axios.post(`${process.env.REACT_APP_BE_SERVER}/picture/createPicture`, formData, config )
            .then(result =>  props.setUserProfPic(result.data._id))
            .catch(error => console.log(error))
    }

    console.log("USER PROFILE from PROFILE.JSX L 34",props.userProfPic)
//    console.log("USER PROFILE ID from PROFILE.JSX L 34",props.userProfPic.data._id)
    
    // {friends.map(item=><div>{item.picture}</div><div>{item.name}</div><button><MdOutlineDeleteForever/></button>)}
    
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
            <form>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="family name" />
                <input type="email" placeholder="@" />
                <input type="password" placeholder="password" />
                <input type="password" placeholder="password" />
                <textarea/>
                <hr/>
                <Select/>
            </form>
            <hr/>
           
        </article>
    )
}