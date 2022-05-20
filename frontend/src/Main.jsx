import Fetch from "./Fetch"
import {Routes,Route} from "react-router-dom"

export default function Main(){
    return(
        <main>
            <Routes>
                <Route path="cards" element={<Fetch/>}/>
            </Routes>
        </main>
    )
}