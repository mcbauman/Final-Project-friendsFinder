import Fetch from "./Routes/Fetch"
import Start from "./Routes/Start"
import Login from "./Routes/Login"
import Singin from "./Routes/Singin"
import {Routes,Route} from "react-router-dom"

export default function Main(){
    return(
        <main>
            <Routes>
                <Route path="cards" element={<Fetch/>}/>
                <Route path="Start" element={<Start/>}/>
                <Route path="Login" element={<Login/>}/>
                <Route path="Singin" element={<Singin/>}/>
            </Routes>
        </main>
    )
}