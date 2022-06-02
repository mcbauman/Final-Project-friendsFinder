import {NavLink} from "react-router-dom"
import {MdLogout} from "react-icons/all";

export default function Header(){
   return(
       <header>
           <nav>
               <NavLink to="*">friendscircle.de</NavLink>
               <NavLink to="Search">Search</NavLink>
               <NavLink to="Messages">Messages</NavLink>
               <NavLink to="Profile">Profile</NavLink>
               <MdLogout/>
           </nav>
       </header>
   )
}