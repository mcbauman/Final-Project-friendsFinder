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
    const [age,setAge]=useState(0)
    const [gender, setGender] = useState("male")
    const [interests,setInterests]=useState([])
    const options=Activities

    function submitFunction(e){
        e.preventDefault()
        console.log(new Date(dateOfBirth).getTime())
        console.log(Date.now())
        setAge((Date.now()-new Date(dateOfBirth).getTime())/31536000000)
        console.log(age)
        console.log("SIGNING BODY l22",{email,password,userName, name, familyName,dateOfBirth,age,gender,interests});
        const sendInterests=interests.map(item=>item.value)
        axios.post("http://localhost:9000/user/create",{email,password,userName, name, familyName,dateOfBirth,age,gender,interests:sendInterests})
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
                <input type="date" value={dateOfBirth} onChange={e=>setDateOfBirth(e.target.value)} placeholder="date of birth"/>
                <fieldset onChange={e=>setGender(e.target.id)}>
                    <input type="radio" name="gender" id="male"/><labe for="male">male</labe>
                    <input type="radio" name="gender" id="female"/><labe for="female">female</labe>
                    <input type="radio" name="gender" id="diverse"/><labe for="diverse">diverse</labe>
                </fieldset>
                <input type="file" placeholder="choose avatar" />
                <Select closeMenuOnSelect={false} isMulti options={options} onChange={setInterests} />
                <button type="submit">save user</button>
            </form>
        </article>
    )
}