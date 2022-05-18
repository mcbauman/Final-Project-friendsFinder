import react, { useEffect, useState } from "react"

export default function Fetch(){
    const [fetchRes,setFetchRes]=useState()
useEffect(()=>{
    fetch(`${process.env.REACT_APP_MARVELAPI}${process.env.REACT_APP_ADRESS}?apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setFetchRes(data)
    });
},[])

return(
    <>
        <pre>{JSON.stringify(fetchRes,null,2)}</pre>
    </>
)
}