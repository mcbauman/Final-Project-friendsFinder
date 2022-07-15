import {NavLink} from "react-router-dom"
import {MdLogout,MdOutlineEmail,MdSearch} from "react-icons/md";
import {CgProfile}from "react-icons/cg"
import {Context}from "./components/context"
import trans from "./components/trans";
import {useContext} from "react";
import logo from "./components/COF.png";

export default function Header(props){
    const {lang,setLang,setHide,setTheme, isNewMessageCame, setIsNewMessageCame }=useContext(Context)
    function logout(){
        props.setUser(null)
        props.setToken(null)
        props.setUserProfPic(null)
        setTheme("BW")
        setLang("de")
        localStorage.removeItem("theme")
        localStorage.removeItem("lang")
        localStorage.removeItem("userProfPic")
        localStorage.removeItem("latitude")
        localStorage.removeItem("longitude")
    }
   return(
       <header>
           <nav>
               <NavLink to="*"><span className="bigScreen"><img src={logo} id="logo871" /> friendscircle.de</span>
               <img src={logo} id="logo871" className="smallScreen"/></NavLink>
               <NavLink to="Search"> <span className="bigScreen">{trans[lang].Search}</span><MdSearch className="smallScreen"/></NavLink>
               <NavLink onClick={()=>{setHide(false); setIsNewMessageCame(false)}}to="Chats"> <span id={isNewMessageCame?"newMessage":""}
               className="bigScreen">{trans[lang].Messages}</span><MdOutlineEmail className="smallScreen"/></NavLink>
               <NavLink to="Profile"> <span className="bigScreen">{trans[lang].Profile}</span><CgProfile className="smallScreen"/></NavLink>
               <MdLogout id="LogOutBTN" onClick={logout}/>
           </nav>
       </header>
   )
}