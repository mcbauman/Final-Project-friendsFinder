import { useState } from "react"
import axios from "axios"
import Select from "react-select";
import Activities from "../ActivitiesArray";
import Log from "../Log";

export default function Singin(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [userName, setUserName]=useState("")
    const [name,setName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [dateOfBirth,setDateOfBirth] = useState("")
    const [gender, setGender] = useState("male")
    const [interests,setInterests]=useState([])
    const options=Activities

    function submitFunction(e){
        e.preventDefault()
        console.log({email,password,userName, name, familyName,dateOfBirth,gender,interests});
        axios.post("http://localhost:9000/user/create",{email,password,userName, name, familyName,dateOfBirth,gender,interests})
        .then(resp=>{
            console.log(interests)
            props.setUser(email)
            props.setToken(resp.data.token)
        })
        .catch(err=>{
            console.log(err)
            alert(err?.response?.data?.error||"Something went wrong")
        })
    }

    return(
        <article>
            Signin
            <form onSubmit={submitFunction}>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
                <input type="text" value={familyName} onChange={e=>setFamilyName(e.target.value)} placeholder="Family Name"/>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="@"/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>
                <input type="text" value={userName} onChange={e=>setUserName(e.target.value)} placeholder="user-name" />
                <input type="file" placeholder="choose avatar" />
                <input type="date" value={dateOfBirth} onChange={e=>setDateOfBirth(e.target.value)} placeholder="date of birth"/>
                <select value={gender} onChange={e=>setGender(e.target.value)}>
                    <option>male</option>
                    <option>female</option>
                    <option>diverse</option>
                </select>
                <Select closeMenuOnSelect={false} isMulti options={options} onChange={setInterests} />
                <button type="submit">save user</button>
            </form>
        </article>
    )
}