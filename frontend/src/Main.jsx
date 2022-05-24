import Fetch from "./Routes/Fetch"
import Start from "./Routes/Start"
import {Routes,Route} from "react-router-dom"

export default function Main(){
    return(
        <main>
            <Routes>
                <Route path="cards" element={<Fetch/>}/>
                <Route path="Start" element={<Start/>}/>
            </Routes>
        </main>
    )
}