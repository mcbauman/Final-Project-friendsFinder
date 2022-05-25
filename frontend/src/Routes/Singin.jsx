import { useState } from "react"
import axios from "axios"

export default function Singin(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [userName, setUserName]=useState("")

    function submitFunction(e){
        e.preventDefault()
        console.log({email,password,name: userName});
        axios.post("http://localhost:9000/user/create",{email,password,userName})
        .then(resp=>{
            console.log(resp)
            console.log("email",email);
            console.log(typeof email);
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
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="@"/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>
                <input type="text" value={userName} onChange={e=>setUserName(e.target.value)} placeholder="user-name" />
                <input type="file" placeholder="choose avatar" />
                <button type="submit">save user</button>
            </form>
        </article>
    )
}