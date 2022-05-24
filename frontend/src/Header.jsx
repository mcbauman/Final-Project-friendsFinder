import {NavLink} from "react-router-dom"

export default function Header(){
   return(
       <header>
           HEADER
           "nav"
           <nav>
                <NavLink to="Start">Start</NavLink>
                <NavLink to="cards">Cards</NavLink>
           </nav>
       </header>
   )
}