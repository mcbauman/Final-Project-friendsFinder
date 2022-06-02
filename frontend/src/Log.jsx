import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Login from "./Routes/Login"
import Singin from "./Routes/Singin"

export default function Log(props){
    return(
        <>
            <header>
                <nav>
                    <NavLink to="*">Login</NavLink>
                    <NavLink to="Singin">Singin</NavLink>
                </nav>
            </header>
           <main>
               <Routes>
                   <Route path="*" element={<Login setUser={props.setUser} setToken={props.setToken}/>}/>
                   <Route path="Singin" element={<Singin setUser={props.setUser} setToken={props.setToken} />} />
               </Routes>
           </main>
        </>
    )
}