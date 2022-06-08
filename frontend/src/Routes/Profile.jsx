import { useState } from "react";
import Activities from "../ActivitiesArray";
import axios from "axios";

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

        const config = {
            // data: formData,
            headers
        }
        axios.post(`${process.env.REACT_APP_BE_SERVER}/picture/createPicture`, formData, config )
            .then(result =>  props.setUserProfPic(result))
            .catch(error => console.log(error))

    }

    return(
        <article>
            PROFILE
            <input type="file" onChange={handleSelectedFile} />
            <button onClick={saveFile}>Save Picture</button>
            {props.userProfPic.data&&<img src={`${process.env.REACT_APP_BE_SERVER}/picture/${props.userProfPic.data._id}`} alt="Ups, no picture;)"/>}
        </article>
    )
}