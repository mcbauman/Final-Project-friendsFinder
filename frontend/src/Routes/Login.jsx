import {useEffect, useState} from "react"
import axios from "axios"
import {NavLink} from "react-router-dom";

export default function Login(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    function submitFunction(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/login`,{email,password})
        .then(resp=>{
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
            <form className="signin" onSubmit={submitFunction}>
                <input type="email" placeholder="@" value={email} onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder="***" value={password} onChange={e=>setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
            <nav>
                No account yet? press 
                <NavLink to="Singin"> Sign up </NavLink>
                to sign up your profile
            </nav>
        </article>
    )
}
