import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Login from "./Routes/Login"
import Singin from "./Routes/Singin"

export default function Log(props){
    return(
        <>
            <nav>
                <NavLink to="Login">Login</NavLink>
                <NavLink to="Singin">Singin</NavLink>
           </nav>
           <Routes>
                <Route path="Login" element={<Login setUser={props.setUser} setToken={props.setToken}/>}/>
                <Route path="Singin" element={<Singin/>} setUser={props.setUser} setToken={props.setToken}/>
            </Routes>
        </>
    )
}