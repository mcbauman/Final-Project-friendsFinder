import Start from "./Routes/Start"
import Search from "./Routes/Search.jsx"
import Messages from "./Routes/Messages"
import Profile from "./Routes/Profile"
import {Routes,Route} from "react-router-dom"
import { useState } from "react"


export default function Main(props){
    // const [ file, setFile ] = useState(null)

    // function handleFileSelected(e){
    //     console.log(e.target.files)
    //     setFile(e.target.files[0])
    // }

    // function saveFile(){
    //     if(!file){
    //         return alert("Select a file first :)")
    //     }
    //     const formData = new formData()
    //     formData.append("test", "Just a check!")
    //     formData.append("selectedFile", file)

    //     const config = {
    //         method: "POST",
    //         body: formData
    //     }
    //     fetch("http://localhost:3001/file", config)
    //         .then(res => res.json())
    //         .then(console.log())
    //         .catch(error => {
    //             console.error(error);
    //             alert("Something went wrong!")
    //         })
    // }

    return(
        <main>
            <Routes>
                <Route path="Start" element={<Start user= {props.user} token= {props.token} /> }/>
                <Route path="Search" element={<Search user= {props.user} token= {props.token}/>}/>
                <Route path="Messages" element={<Messages user= {props.user} token= {props.token}/>}/>
                <Route path="Profile" element={<Profile user= {props.user} token= {props.token}/> }/>
            </Routes>
            
        {/* <div>
        <input type="file" onChange={handleFileSelected} />
        <button onClick={saveFile}>Save file</button>

        {
            file && (
                <ul>
                    <li>{file.name}</li>
                    <li>{file.type}</li>
                    <li>{(file.size / 1024).toFixed(1)} kB</li>
                </ul>
            )
        }

        </div> */}

        </main>
    )
}