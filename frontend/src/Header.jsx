import {NavLink} from "react-router-dom"

export default function Header(){
   return(
       <header>
           HEADER
           "nav"
           <nav>
               <NavLink to="Start">Start</NavLink>
               <NavLink to="Search">Search</NavLink>
               <NavLink to="Messages">Messages</NavLink>
               <NavLink to="Profile">Profile</NavLink>
           </nav>
       </header>
   )
}