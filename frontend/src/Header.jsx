import {NavLink} from "react-router-dom"

export default function Header(){
   return(
       <header>
           HEADER
           "nav"
           <nav>
                <NavLink to="Start">Start</NavLink>
                <NavLink to="cards">Cards</NavLink>
                <NavLink to="Login">Login</NavLink>
                <NavLink to="Singin">Singin</NavLink>
           </nav>
       </header>
   )
}