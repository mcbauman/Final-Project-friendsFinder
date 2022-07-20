import {useState} from "react"
import axios from "axios"
import {NavLink} from "react-router-dom";
import {MdLogin} from "react-icons/md"
import {Context}from "../components/context"
import {useContext} from "react";
import {toast, ToastContainer} from "react-toastify";
import "../components/Log.scss";

export default function Login(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const {setLang}=useContext(Context)
    const {setTheme,setLatitude,setLongitude}=useContext(Context)
    const notifySuccess = (name) => toast(`welcome back ${name}`);
    const notifyError = (text) => toast(text);

    function submitFunction(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/login`,{email,password})
        .then(resp=>{
            props.setUser(resp.data._id)
            props.setToken(resp.data.token)
            props.setUserProfPic(resp.data.profilePicture)
            setLang(resp.data.lang)
            setTheme(resp.data.theme)
            setLatitude(resp.data.latitude)
            setLongitude(resp.data.longitude)
            localStorage.setItem("theme",JSON.stringify(resp.data.theme))
            localStorage.setItem("lang",JSON.stringify(resp.data.lang))
            localStorage.setItem("latitude",JSON.stringify(resp.data.latitude))
            localStorage.setItem("longitude",JSON.stringify(resp.data.longitude))
            notifySuccess(resp.data.userName)
        })
        .catch(err=>{
            console.log(err)
            notifyError(err?.response?.data?.error||"Something went wrong")
        })
    }
    return(
        <article id="logIn">
            <section>
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
            </section>
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
