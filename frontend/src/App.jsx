import env from "react-dotenv"
import react from "react"

export default function App(){
    console.log(env);
    console.log(env.MARVEL_PUBLIC_KEY);
    console.log(window.env.MARVEL_PUBLIC_KEY);

    // fetch(process.env.MARVELAPI,{apikey:process.env.MARVEL_PUBLIC_KEY})
    return(
        <>
            Hello From App
        </>
    )
}