import React from "react"
import {useState} from "react"

export const Context=React.createContext(null)
export default function ContextProvider(props){

    const themeFromLS=localStorage.getItem("theme")
    const themeDefault=themeFromLS?JSON.parse(themeFromLS):"BW"

    const langFromLS=localStorage.getItem("lang")
    const langDefault=langFromLS?JSON.parse(langFromLS):"de"

    const latitudeFromLS=localStorage.getItem("latitude")
    const latitudeDefault=latitudeFromLS?latitudeFromLS:null
    
    const longitudeFromLS=localStorage.getItem("longitude")
    const longitudeDefault=longitudeFromLS?longitudeFromLS:null

    const [hide, setHide]=useState(false)
    const [lang,setLang]=useState(langDefault)
    const [theme,setTheme]=useState(themeDefault)
    const [latitude,setLatitude]=useState(latitudeDefault)
    const [longitude, setLongitude]=useState(longitudeDefault)
    const [isNewMessageCame, setIsNewMessageCame] = useState(false)
    const [newMessageNotification, setNewMessageNotification] = useState([])
    const contextValue={lang,setLang,theme,setTheme,hide,setHide,latitude,setLatitude,longitude, setLongitude, isNewMessageCame, setIsNewMessageCame, newMessageNotification, setNewMessageNotification}
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}