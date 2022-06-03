import { useState} from "react"
import axios from "axios"
import Select from "react-select";
import Activities from "../ActivitiesArray";


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
    const [profileText,setProfileText]=useState("")
    const options=Activities

    function ageFunction(e){
        setDateOfBirth(e.target.value)
        setAge(Math.floor((Date.now()-new Date(e.target.value).getTime())/(31536000000)))
    }
    function submitFunction(e){
        e.preventDefault()
        const sendInterests=interests.map(item=>item.value)
        const data={age,email,password,userName,name,familyName,dateOfBirth,gender,interests:sendInterests,profileText}
        axios.post("http://localhost:9000/user/create",data)
            .then(resp=>{
                console.log(interests)
                props.setUser(resp.data._id)
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
                <input type="date" value={dateOfBirth} onChange={ageFunction} placeholder="date of birth"/>
                <fieldset onChange={e=>setGender(e.target.id)}>
                    <input type="radio" name="gender" id="♂️"/><label htmlFor="♂️">♂️</label>
                    <input type="radio" name="gender" id="♀️"/><label htmlFor="♀️">♀️</label>
                    <input type="radio" name="gender" id="⚧"/><label htmlFor="⚧">⚧</label>
                </fieldset>
                <textarea value={profileText} onChange={e=>setProfileText(e.target.value)} placeholder="tell us a bit about yourself"/>
                <input type="file" placeholder="choose avatar" />
                <Select closeMenuOnSelect={false} isMulti options={options} onChange={setInterests} />
                <button type="submit">save user</button>
            </form>
        </article>
    )
}