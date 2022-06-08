import {NavLink} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import Login from "./Routes/Login"
import Singin from "./Routes/Singin"

export default function Log(props){
    return(
        <>
            <header>
                <nav>
                    <NavLink to="*">Log in</NavLink>
                    <NavLink to="Singin">Sign up</NavLink>
                </nav>
            </header>
           <main>
               <Routes>
                   <Route path="*" element={<Login userProfPic={props.userProfPic} setUserProfPic={props.setUserProfPic}  setUser={props.setUser} setToken={props.setToken}/>}/>
                   <Route path="Singin" element={<Singin userProfPic={props.userProfPic}  setUser={props.setUser} setToken={props.setToken} />} />
               </Routes>
           </main>
        </>
    )
}