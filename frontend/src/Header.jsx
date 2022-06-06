import {NavLink} from "react-router-dom"
import {MdLogout,MdOutlineEmail,MdSearch} from "react-icons/md";
import{ImProfile}from"react-icons/im"
import {MdOutlineHome}from "react-icons/md"

export default function Header(props){
    function logout(){
        props.setUser(null)
        props.setToken(null)
    }
   return(
       <header>
           <nav>
               <NavLink to="*"><span className="bigScreen">friendscircle.de</span><MdOutlineHome className="smallScreen"/></NavLink>
               <NavLink to="Search"> <span className="bigScreen">Search</span><MdSearch className="smallScreen"/></NavLink>
               <NavLink to="Messages"> <span className="bigScreen">Messages</span><MdOutlineEmail className="smallScreen"/> </NavLink>
               <NavLink to="Profile"> <span className="bigScreen">Profile</span><ImProfile className="smallScreen"/> </NavLink>
               <MdLogout onClick={logout}/>
           </nav>
       </header>
   )
}