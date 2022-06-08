import {useEffect, useState} from "react"
import axios from "axios"

export default function Login(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    function submitFunction(e){
        e.preventDefault()
        console.log({email,password})
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/login`,{email,password})
        .then(resp=>{
            console.log(resp)
            console.log("email",email);
            console.log(typeof email);
            props.setUser(resp.data._id)
            props.setToken(resp.data.token)
            props.setUserProfPic(resp.data.profilePicture)
            console.log(resp.data);
            console.log(resp.data.profilePicture);
        })
        .catch(err=>{
            console.log(err)
            alert(err?.response?.data?.error||"Something went wrong")
        })
    }
    return(
        <article>
            Login
            <form onSubmit={submitFunction}>
                <input type="email" placeholder="@" value={email} onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder="***" value={password} onChange={e=>setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
        </article>
    )
}
