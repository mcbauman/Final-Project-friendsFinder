import {NavLink} from "react-router-dom"
import {MdLogout,MdOutlineEmail,MdSearch} from "react-icons/md";
import{ImProfile}from"react-icons/im"


export default function Header(props){
    function logout(){
        props.setUser(null)
        props.setToken(null)
    }
   return(
       <header>
           <nav>
               <NavLink to="*">friendscircle.de</NavLink>
               <NavLink to="Search"> <span className="bigScreen">Search</span><MdSearch class="smallScreen"/></NavLink>
               <NavLink to="Messages"> <span className="bigScreen">Messages</span><MdOutlineEmail class="smallScreen"/> </NavLink>
               <NavLink to="Profile"> <span className="bigScreen">Profile</span><ImProfile class="smallScreen"/> </NavLink>
               <MdLogout onClick={logout}/>
           </nav>
       </header>
   )
}