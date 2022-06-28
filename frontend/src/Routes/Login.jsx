import {useEffect, useState} from "react"
import axios from "axios"
import {NavLink} from "react-router-dom";
import {MdLogin} from "react-icons/md"
import {Context}from "../components/context"
import {useContext} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function Login(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const {lang,setLang}=useContext(Context)
    const {theme,setTheme}=useContext(Context)
    const notifySuccess = (name) => toast(`welcome back!${name}`);
    const notifyError = (text) => toast(text);

    function submitFunction(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/login`,{email,password})
        .then(resp=>{
            console.log(resp.data);
            props.setUser(resp.data._id)
            props.setToken(resp.data.token)
            props.setUserProfPic(resp.data.profilePicture)
            setLang(resp.data.lang)
            setTheme(resp.data.theme)
            localStorage.setItem("theme",JSON.stringify(resp.data.theme))
            localStorage.setItem("lang",JSON.stringify(resp.data.lang))
            notifySuccess(resp.data.userName)
        })
        .catch(err=>{
            console.log(err)
            notifyError(err?.response?.data?.error||"Something went wrong")
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
            <ToastContainer position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover/>
        </article>
    )
}
