import {NavLink} from "react-router-dom"
import {MdLogout,MdOutlineEmail,MdSearch} from "react-icons/md";
import {MdOutlineHome}from "react-icons/md"
import{CgProfile}from "react-icons/cg"

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
               <NavLink to="Profile"> <span className="bigScreen">Profile</span><CgProfile className="smallScreen"/></NavLink>
               <MdLogout onClick={logout}/>
           </nav>
       </header>
   )
}