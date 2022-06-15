import React from "react"
import {useState} from "react"

export const Context=React.createContext(null)
export default function ContextProvider(props){


    const themeFromLS=localStorage.getItem("theme")
    const themeDefault=themeFromLS?JSON.parse(themeFromLS):"BW"

    const langFromLS=localStorage.getItem("lang")
    const langDefault=langFromLS?JSON.parse(langFromLS):"de"
    
    const [lang,setLang]=useState(langDefault)
    const [theme,setTheme]=useState(themeDefault)
    const contextValue={lang,setLang,theme,setTheme}
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}