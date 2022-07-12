import { useState} from "react"
import axios from "axios"
import Select from "react-select";
import Activities from "../components/ActivitiesArray";
import {toast, ToastContainer} from "react-toastify";
import {MdOutlineSaveAlt} from "react-icons/md";
import "../components/Log.scss";
import { useContext } from "react";
import { Context } from "../components/context"
import trans from "../components/trans";

export default function Singin(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [userName, setUserName]=useState("")
    const [name,setName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [dateOfBirth,setDateOfBirth] = useState("")
    const [age,setAge]=useState(0)
    const [gender, setGender] = useState("⚧")
    const [interests,setInterests]=useState([])
    const [profileText,setProfileText]=useState("")
    const [street, setStreet]=useState("")
    const [number, setNumber]=useState()
    const [zipCode, setZipCode]=useState()
    const [city, setCity]=useState("")
    const [country, setCountry]=useState("DE")
    const [errors,setErrors]=useState([])
    const {lang, setLang}=useContext(Context)
    const options=Activities[lang]
    const notifySuccess = () => toast("Your profile is created");
    const notifyError = (text) => toast(text);

    function ageFunction(e){
        setDateOfBirth(e.target.value)
        setAge(Math.floor((Date.now()-new Date(e.target.value).getTime())/(31536000000)))
    }
    function submitFunction(e){
        e.preventDefault()
        const sendInterests=interests.map(item=>item.value)
        const data={age,email,password,userName,name,familyName,dateOfBirth,gender,interests:sendInterests,profileText, street, number, zipCode, city, country}
        axios.post(`${process.env.REACT_APP_BE_SERVER}/user/create`,data)
            .then(resp=>{
                console.log(resp);
                props.setUser(resp.data._id)
                props.setToken(resp.data.token)
                notifySuccess()
            })
            .catch(err=>{
                console.log(err); 
                if(err){
                    if(err.response){
                        if(err.response.data){
                            if(Array.isArray(err.response.data.error)){
                                setErrors([...err.response.data.error])
                                notifyError(err.response.data.error.join("")||"Something went wrong") 
                            }else{
                                setErrors(err.response.data.error)
                                notifyError(err.response.data.error)
                            }
                        }
                    }
                    else{notifyError(null||"Something went wrong")}    
                }
            })
    }

    return(
        <article id="signUp">
            <form className="signin" onSubmit={submitFunction}>
{/* PROFILEDATA */}
                <section>
                <input className={errors.includes("your real Name please!")?"error":""} type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
                <input className={errors.includes("your real Name please!")?"error":""} type="text" value={familyName} onChange={e=>setFamilyName(e.target.value)} placeholder={trans[lang].familyName}/>
                <input className={errors.includes("E11000")?"error":""} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="@"/>
                <input className={errors.includes("password is to weak!")?"error":""} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
                <input className={errors.includes("only Chars and Numbers as UserName please!")?"error":""} type="text" value={userName} onChange={e=>setUserName(e.target.value)} placeholder="User-name" />
                <input className={errors.includes("password")?"error":""} type="date" value={dateOfBirth} onChange={ageFunction} placeholder="Date of birth"/>
                <select className={errors.includes("choose your country!")?"error":""} onChange={e=>setCountry(e.target.value)}>
                    <option>DE</option>
                    <option>AUT</option>
                    <option>CH</option>
                    <option>DK</option>
                    <option>NL</option>
                    <option>KE</option>
                    <option>PH</option>
                </select>
                <select value={lang} onChange={(e)=>setLang(e.target.value)}>
                        <option value="de">🇩🇪</option>
                        <option value="en">🇬🇧</option>
                    </select>
                </section>
                <hr/>
{/* Adress */}
                <section>
                <input className={errors.includes("your real Street please!")?"error":""} type="text" value={street} onChange={e=>setStreet(e.target.value)} placeholder={trans[lang].street}/>
                <input className={errors.includes("only the Number please!")?"error":""} type="number" value={number} onChange={e=>setNumber(e.target.value)} placeholder={trans[lang].number}/>
                <input className={errors.includes("only ZIP-Code please!")?"error":""} type="number" value={zipCode} onChange={e=>setZipCode(e.target.value)} placeholder={trans[lang].zioCode}/>
                <input className={errors.includes("type in your city!")?"error":""} type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder={trans[lang].city}/>
                </section>
                <hr/>
{/* ABOUTTEXT */}
                <section className={errors.includes("Plese tell us a bit about you in Profile-Text")?"error":""} >
                 <textarea rows="5" value={profileText} 
                 onChange={e=>setProfileText(e.target.value)} 
                 placeholder={trans[lang].tellUs}/>
                </section>
                <hr/>
{/* ABOUTTEXT */}
                <section>
                <fieldset className={errors.includes("weak!")?"error":""} onChange={e=>setGender(e.target.id)}>
                    <input type="radio" name="gender" id="♂️"/><label htmlFor="♂️">♂️</label>
                    <input type="radio" name="gender" id="♀️"/><label htmlFor="♀️">♀️</label>
                    <input type="radio" name="gender" id="⚧"/><label htmlFor="⚧">⚧</label>
                </fieldset>
                <input type="file" placeholder="choose avatar" />
                <Select closeMenuOnSelect={false} isMulti options={options} onChange={setInterests} />
                <button type="submit"><MdOutlineSaveAlt/></button>
                </section>
            </form>
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