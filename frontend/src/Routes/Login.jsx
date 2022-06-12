import {useEffect, useState} from "react"
import axios from "axios"
import {NavLink} from "react-router-dom";
import {MdLogin} from "react-icons/md"
import {Context}from "../components/context"
import {useContext} from "react";

export default function Login(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const {lang,setLang}=useContext(Context)
    const {theme,setTheme}=useContext(Context)

    function submitFunction(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/login`,{email,password})
        .then(resp=>{
            props.setUser(resp.data._id)
            props.setToken(resp.data.token)
            props.setUserProfPic(resp.data.profilePicture)
            setLang(resp.data.lang)
            setTheme(resp.data.theme)
            localStorage.setItem("theme",JSON.stringify(theme))
            localStorage.setItem("lang",JSON.stringify(lang))
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
                <button type="submit"><MdLogin/></button>
            </form>
            <nav>
                No account yet? press 
                <NavLink to="Singin"> Sign up </NavLink>
                to sign up your profile
            </nav>
        </article>
    )
}
