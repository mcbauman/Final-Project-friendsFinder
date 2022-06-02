import {NavLink} from "react-router-dom"

export default function Header(){
   return(
       <header>
           <nav>
               <NavLink to="Start">friendscircle.de</NavLink>
               <NavLink to="Search">Search</NavLink>
               <NavLink to="Messages">Messages</NavLink>
               <NavLink to="Profile">Profile</NavLink>
           </nav>
       </header>
   )
}