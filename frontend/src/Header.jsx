import {NavLink} from "react-router-dom"

export default function Header(){
   return(
       <header>
           HEADER
           "nav"
           <nav>
                <NavLink to="cards">Cards</NavLink>
           </nav>
       </header>
   )
}