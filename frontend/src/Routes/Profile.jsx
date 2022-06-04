import { useState } from "react";
import Activities from "../ActivitiesArray";
import axios from "axios";

export default function Profile(props){
    const [file, setFile] = useState(null)

    function handleSelectedFile(e){
        setFile(e.target.files[0]) // we use [] because key is a number here.
        // console.log(e.target.files);
    }

    function saveFile(e){
        // const [picture, setPicture ] = useState(null)
        if(!file){
            return alert("Select a file first:)")
        } else {
            const formData = new FormData()
            formData.append("selectedFile", file)
        
            const config = {
                method: "POST",
                body: formData
            }
        
            fetch(`${process.env.REACT_APP_BE_SERVER}/user/createPicture`, config)
                .then(res => res.json())
                .then(res =>  res.send({}))
                .catch()
        }
    }

    return(
        <article>
            PROFILE
            <input type="file" onChange={handleSelectedFile} />
            <button onClick={saveFile}>Save Picture</button>

            <img src="http://localhost:9000/file/6298cca07b516dfa091e96a9" alt="Ups, no picture;)"/>
        </article>
    )
}